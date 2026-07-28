import { useState } from "react";
import { Plus } from "lucide-react";
import EditableText from "./EditableText";
import ContactButton from "./ContactButton";

// ── EDITABLE PLACEHOLDER DATA ──
// logo: a URL string (brand logo) shown contained in the tile; null falls back
// to a styled text tile. Logos are fetched via Clearbit's logo service and
// automatically fall back to the brand name text if they fail to load.
const brands = [
  { name: "Eggcellent Cafe", logo: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/e13ed755d_image.png" },
  { name: "Masala Kitchen", logo: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/d42809645_image.png" },
  { name: "Adagio Teas", logo: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/1fea4f6f7_image.png" },
  { name: "Mr. Wish", logo: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/af32baa92_image.png" },
  { name: "Creative Chem. Co", logo: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/978f64a8e_image.png" },
];
// ──────────────────────────────────

function BrandTile({ brand, index }) {
  const [broken, setBroken] = useState(false);
  const showLogo = brand.logo && !broken;
  return (
    <div className="aspect-square overflow-hidden rounded-[2rem] border border-border bg-card transition-shadow hover:shadow-lg">
      {showLogo ? (
        <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
          <img
            src={brand.logo}
            alt={brand.name}
            onError={() => setBroken(true)}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
          <span className="px-2 text-center font-heading text-lg font-semibold text-foreground/60">
            <EditableText contentKey={`partnerships.brand.${index}`} fallback={brand.name} />
          </span>
        </div>
      )}
    </div>
  );
}

export default function PartnershipsRail() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="mb-12 text-center font-heading text-3xl font-semibold text-foreground md:text-4xl md:mb-16">
          <EditableText contentKey="partnerships.heading" fallback="Notable Partnerships" />
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {brands.map((brand, i) => (
            <BrandTile key={brand.name} brand={brand} index={i} />
          ))}

          {/* Invite card — pulsing border */}
          <div className="flex aspect-square animate-pulse-border flex-col items-center justify-center gap-2 rounded-[2rem] border-2 border-dashed border-primary/50 p-4">
            <Plus className="h-6 w-6 text-primary" />
            <span className="text-center font-heading text-sm font-medium text-primary">
              <EditableText contentKey="partnerships.invite" fallback="Your Brand Here next ;)" />
            </span>
          </div>
        </div>
        <ContactButton />
      </div>
    </section>
  );
}