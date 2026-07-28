import BrandSection from "./BrandSection";
import EditableReel from "./EditableReel";

// ── EDITABLE PLACEHOLDER DATA ──
// UGC content — 6 TikTok reels. Paste real TikTok URLs in the editor (admin).
const data = {
  stats: ["10,000,000+ Views", "80,000+ Interactions"],
  brandName: "CLUELY (AI Note-Taker)",
  email: "me@nickol.ai",
  reels: Array.from({ length: 6 }, (_, i) => ({ url: "" })),
};
// ──────────────────────────────────

export default function BrandSectionCluely() {
  return (
    <BrandSection
      stats={data.stats}
      statsKey="brand.cluely.stats"
      brandName={data.brandName}
      brandNameKey="brand.cluely.name"
    >
      <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3">
        {data.reels.map((reel, i) => (
          <EditableReel
            key={i}
            contentKey={`brand.cluely.reel.${i}`}
            fallback={reel.url}
            index={i}
            showStats={false}
          />
        ))}
      </div>
    </BrandSection>
  );
}