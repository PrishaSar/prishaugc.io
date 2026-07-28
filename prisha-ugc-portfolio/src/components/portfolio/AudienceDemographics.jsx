import BrandSection from "./BrandSection";
import EditableImage from "./EditableImage";

// ── EDITABLE PLACEHOLDER DATA ──
const data = {
  stats: [],
  brandName: "AUDIENCE DEMOGRAPHICS",
  email: "me@nickol.ai",
  images: [
    {
      src: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/dc6e63856_IMG_1554.jpg",
      alt: "Gender and age range demographics",
    },
    {
      src: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/79d5fc73c_IMG_1555.jpg",
      alt: "Top locations demographics",
    },
  ],
};
// ──────────────────────────────────

export default function AudienceDemographics() {
  return (
    <BrandSection stats={data.stats} brandName={data.brandName} brandNameKey="audience.brandName" email={data.email} emailKey="creator.email">
      <div className="grid gap-6 md:grid-cols-2">
        {data.images.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-[2rem] border border-black/10 shadow-xl">
            <EditableImage
              contentKey={`audience.image.${i}`}
              fallback={img.src}
              alt={img.alt}
              className="w-full object-contain"
              wrapperClass="w-full"
            />
          </div>
        ))}
      </div>
    </BrandSection>
  );
}