import BrandSection from "./BrandSection";
import EditableImage from "./EditableImage";
import EditableReel from "./EditableReel";

// ── EDITABLE PLACEHOLDER DATA ──
const data = {
  stats: ["30,000,000+ Views"],
  brandName: "PERSONAL BRAND",
  email: "me@nickol.ai",
  profileCard: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/295e50d5e_Screenshot2026-07-27at34505PM.png",
  followers: "1,536",
  reels: [
    { url: "https://www.instagram.com/reel/DVrSX7pEnyZ/", views: "427K", shares: "12.4K" },
    { url: "https://www.instagram.com/reel/DTRdEYkjjwc/", views: "1.2M", shares: "38.9K" },
    { url: "https://www.instagram.com/reel/DVrHTQgtjV2/", views: "886K", shares: "21.2K" },
  ],
};
// ──────────────────────────────────

export default function BrandSectionPersonal() {
  return (
    <BrandSection
      stats={data.stats}
      statsKey="brand.personal.stats"
      brandName={data.brandName}
      brandNameKey="brand.personal.name"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-12">
        {/* Profile card */}
        <div className="overflow-hidden rounded-[2rem] border border-black/10 shadow-xl">
          <EditableImage
            contentKey="brand.personal.profileCard"
            fallback={data.profileCard}
            alt="prishtheoptimist profile — 1,536 followers"
            className="w-full object-contain"
            wrapperClass="w-full"
          />
        </div>
        {/* Instagram reel embeds */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {data.reels.map((reel, i) => (
            <EditableReel
              key={i}
              contentKey={`brand.personal.reel.${i}`}
              fallback={reel.url}
              viewsFallback={reel.views}
              sharesFallback={reel.shares}
              index={i}
            />
          ))}
        </div>
      </div>
    </BrandSection>
  );
}