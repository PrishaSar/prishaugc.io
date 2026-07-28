import BrandSection from "./BrandSection";
import EditableImage from "./EditableImage";
import EditableReel from "./EditableReel";

// ── EDITABLE PLACEHOLDER DATA ──
const data = {
  stats: ["8,000,000+ Views", "100,000+ Interactions"],
  brandName: "Jobright.ai",
  email: "me@nickol.ai",
  // Food account profile card screenshot — Prisha
  profileCard: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/9dd9cbbb0_Screenshot2026-07-27at45304PM.png",
  followers: "132",
  reels: [
    { url: "https://www.instagram.com/reel/DXUghiThIX7/", views: "", shares: "" },
    { url: "https://www.instagram.com/reel/DWxjID8kWgp/", views: "", shares: "" },
    { url: "https://www.instagram.com/reel/DYcX3rehzI8/", views: "", shares: "" },
  ],
};
// ──────────────────────────────────

export default function BrandSectionJobright() {
  return (
    <BrandSection stats={data.stats} statsKey="brand.jobright.stats" brandName={data.brandName} brandNameKey="brand.jobright.name">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-12">
        {/* Profile card */}
        <div className="overflow-hidden rounded-[2rem] border border-black/10 shadow-xl">
          <EditableImage contentKey="brand.jobright.profileCard" fallback={data.profileCard} alt={`Prisha | Philly + Chicago food — ${data.followers} followers`} className="w-full object-contain" wrapperClass="w-full" />
        </div>
        {/* Instagram reel embeds */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {data.reels.map((reel, i) => (
            <EditableReel key={i} contentKey={`brand.jobright.reel.${i}`} fallback={reel.url} viewsFallback={reel.views} sharesFallback={reel.shares} index={i} />
          ))}
        </div>
      </div>
    </BrandSection>
  );
}