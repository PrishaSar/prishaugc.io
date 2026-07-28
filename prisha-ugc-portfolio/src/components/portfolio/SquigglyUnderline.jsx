/**
 * Hand-drawn squiggly underline rendered as an SVG. Sits beneath a headline
 * word/name to add a subtle "whimsical but premium" accent in coral.
 */
export default function SquigglyUnderline({ className = "" }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 240 14"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 9 C 30 2, 55 2, 82 7 C 110 12, 135 12, 162 6 C 190 2, 215 4, 237 8"
        stroke="hsl(var(--coral))"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}