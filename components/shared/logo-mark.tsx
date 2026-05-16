// Diamond mark — 4 white circles at N/E/S/W, same geometry as the PWA icon.
// Drop inside any sized dark container; SVG scales via viewBox.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className ?? "w-full h-full"} aria-hidden>
      <circle cx="90" cy="50" r="20" fill="white" />
      <circle cx="130" cy="90" r="20" fill="white" />
      <circle cx="90" cy="130" r="20" fill="white" />
      <circle cx="50" cy="90" r="20" fill="white" />
    </svg>
  );
}
