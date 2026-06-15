# Stripe setup & handoff

Stripe and all licensing now live in the **`jorapress-backend`** service (a
Node/Express + SQLite app), not in this Next.js site. The marketing site only
calls the backend. See `jorapress-backend/README.md` for the full service docs.

```
Browser ── /pricing → Get Pro ──▶ Next.js CheckoutButton
                                      │  POST {BACKEND}/api/checkout
                                      ▼
                              jorapress-backend  ── Stripe Checkout (hosted)
                                      ▲                     │ pays
            Stripe webhook ──────────┘                     ▼
   checkout.session.completed → issue license key → email it (SMTP)
                                      ▲
   WordPress plugin ── activate / validate / update ┘
```

---

## 1. What's already built

- **Backend** (`jorapress-backend/`): checkout session creation, Stripe webhook
  fulfillment (issues + emails a license key), license activate/validate/
  deactivate with per-tier site limits (Pro = 1, Agency = 25), and a licensed
  update server.
- **Frontend** (this app): the `/checkout` page's **CheckoutButton** calls
  `${NEXT_PUBLIC_BACKEND_URL}/api/checkout` and redirects to Stripe; the
  `/checkout/success` page shows the issued **license key** (the session lookup
  fulfils on demand, so the key appears even before the webhook lands).
- **Customer account** (`/account`): passwordless magic-link sign-in → license
  key, linked sites, days left, licensed re-download, and **Manage billing**
  (Stripe Customer Portal).
- **Admin** (`/admin`): password-gated dashboard — customers, subscriptions,
  MRR/ARR, search & per-license detail.
- **Plugin** (`aiwp/`): a real license client + tier gating + auto-updater.

So the full chain — pay → get a key → activate → unlock Pro features → receive
updates — is implemented. What remains is **configuration** (below).

---

## 2. Stripe Dashboard (the Stripe dev's job)

> **No Products or Prices to create in Stripe.** Plans + pricing live in our
> backend (`jorapress-backend/src/config.ts` → `PLANS`). Checkout sends Stripe
> an inline price, so Stripe is used purely to collect the payment.

1. **Activate the account** (business details, bank account for payouts).
2. **API keys** (Developers → API keys): copy Secret (`sk_…`) and Publishable
   (`pk_…`). Use **test** keys first.
3. **Webhook** (Developers → Webhooks → Add endpoint):
   - URL: `https://<BACKEND-HOST>/api/stripe/webhook`
   - Events: `checkout.session.completed`, `invoice.paid`,
     `customer.subscription.deleted`
   - Copy the signing secret (`whsec_…`).
4. **Customer portal** (Settings → Billing): enable so customers can cancel /
   update cards.
5. **Tax**: decide on Stripe Tax vs a Merchant-of-Record for VAT/GST.

To change a price or add a plan, edit `PLANS` in the backend config — not Stripe.

---

## 3. Environment variables

**Backend** (`jorapress-backend/.env`) — all the secrets live here:

```
MONGODB_URI=mongodb+srv://…/jorapress  # MongoDB Atlas — note the /jorapress db name
STRIPE_SECRET_KEY=sk_test_…
STRIPE_WEBHOOK_SECRET=whsec_…
CHECKOUT_SUCCESS_URL=https://www.jorapress.com/checkout/success
CHECKOUT_CANCEL_URL=https://www.jorapress.com/checkout
APP_URL=https://www.jorapress.com     # used for magic-link + account emails
ALLOWED_ORIGINS=https://www.jorapress.com,https://jorapress.com
PUBLIC_URL=https://<BACKEND-HOST>
AUTH_SECRET=<64+ random hex chars>    # signs customer sign-in tokens
ADMIN_PASSWORD=<your admin password>  # unlocks /admin
# SMTP_* already set (Zoho) for license-key + sign-in emails
```

> ⚠️ These are **server env vars** — set them in your backend host (Vercel/
> Railway/etc.), not in a committed file. `??` fallbacks don't apply to empty
> strings, so a blank `CHECKOUT_SUCCESS_URL` causes Stripe's "Not a valid URL".

No `STRIPE_PRICE_*` — pricing is in `src/config.ts`.

**Frontend** (this app, hosting env): just the backend location —

```
NEXT_PUBLIC_BACKEND_URL=https://<BACKEND-HOST>
```

**Plugin**: point it at the backend by defining in `wp-config.php`
`define('JORAPRESS_API_BASE', 'https://<BACKEND-HOST>');`
(defaults to `https://api.jorapress.com`).

---

## 4. Test mode

1. Backend: fill test keys + test price IDs in `.env`, `npm run dev`.
2. Forward webhooks locally:
   `stripe listen --forward-to localhost:4000/api/stripe/webhook`
   → use the printed `whsec_…`.
3. Frontend: `NEXT_PUBLIC_BACKEND_URL=http://localhost:4000`, `npm run dev`.
4. `/pricing` → **Get Pro** → **Pay** with card `4242 4242 4242 4242`.
5. Confirm: redirect to `/checkout/success`, backend logs `✅ Issued pro
   license …`, and the license email arrives.
6. In WordPress → **JoraPress → Settings → License**, paste the key → the Pro
   fixers unlock.

---

## 5. Go-live checklist

- [ ] Backend deployed; `MONGODB_URI` points at the production database and the
      `releases/jorapress.zip` build is present on the host.
- [ ] Live Stripe keys in the backend env (no price IDs needed).
- [ ] Live-mode webhook endpoint pointing at the deployed backend.
- [ ] `NEXT_PUBLIC_BACKEND_URL` and the plugin's `JORAPRESS_API_BASE` point at
      the deployed backend.
- [ ] Tax handling configured; refund policy matches the 14-day promise.
- [ ] MongoDB backups enabled (Atlas does this automatically).
