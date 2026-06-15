export function Terminal() {
  return (
    <div className="card overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-fg-dim">claude-code › jorapress-mcp</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium text-lime-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-glow animate-pulse-dot" /> connected
        </span>
      </div>
      <div className="thin-scroll overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <Line prompt>build a hero + features + CTA in Elementor on the Home page</Line>
        <Line tool>→ wp_rest · list active plugins</Line>
        <Line tool>→ execute_php · create Elementor section (hero)</Line>
        <Line muted>  ✓ snapshot saved · audit #4821</Line>
        <Line tool>→ execute_php · features grid + CTA</Line>
        <Line ok>  ✓ Home page updated — 3 sections, 0 errors</Line>
        <div className="my-3 h-px bg-line" />
        <Line prompt>now scan the site and fix anything critical</Line>
        <Line tool>→ perf_scan · seo_scan · error_scan</Line>
        <Line warn>  ! autoload 2.3 MB · 4 missing meta · 1 deprecated call</Line>
        <Line tool>→ perf_fix · trim_autoload (dry-run → apply)</Line>
        <Line ok>  ✓ health score 72 → 94 · all changes reversible</Line>
        <div className="mt-2 flex items-center gap-1.5 text-fg-muted">
          <span className="text-cyan-glow">›</span>
          <span className="inline-block h-4 w-2 animate-pulse-dot bg-cyan-glow" />
        </div>
      </div>
    </div>
  );
}

function Line({
  children,
  prompt,
  tool,
  ok,
  warn,
  muted,
}: {
  children: React.ReactNode;
  prompt?: boolean;
  tool?: boolean;
  ok?: boolean;
  warn?: boolean;
  muted?: boolean;
}) {
  if (prompt)
    return (
      <p className="text-fg">
        <span className="mr-2 text-cyan-glow">›</span>
        {children}
      </p>
    );
  let cls = "text-fg-muted";
  if (tool) cls = "text-cyan-soft";
  if (ok) cls = "text-lime-glow";
  if (warn) cls = "text-[#febc2e]";
  if (muted) cls = "text-fg-dim";
  return <p className={cls}>{children}</p>;
}
