import { Eye } from "lucide-react";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";

// ── EDITABLE PLACEHOLDER DATA ──
const bioData = {
  name: "Nickolai",
  photo: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/248db2f7a_generated_image.png",
  bio: "I'm a Vancouver-based, Gen Z content creator and growth strategist. I've generated 50 million+ organic views and 50k+ followers on organic accounts. With partnerships varying from bootstrapped startups, high-profile UGC programs, and billion dollar companies — my primary goal is to creatively apply virality, customer conversions, and retention to your brand and product.",
  stat: {
    value: "50M+",
    label: "Organic Views Generated",
  },
};
// ──────────────────────────────────

export default function StatsBio() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Cutout photo floating on the section background */}
          <div className="flex justify-center lg:justify-start">
            <EditableImage contentKey="statsbio.photo" fallback={bioData.photo} alt="Creator at work" className="h-auto w-full max-w-sm object-contain" wrapperClass="w-full max-w-sm" />
          </div>

          {/* Right — Header, bio, stat card */}
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
              Hi, I'm <EditableText contentKey="statsbio.name" fallback={bioData.name} />!
            </h2>
            <p className="text-lg leading-relaxed text-foreground/75"><EditableText contentKey="statsbio.bio" fallback={bioData.bio} multiline /></p>
            <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground shadow-xl shadow-primary/30">
              <Eye className="mb-3 h-8 w-8 opacity-80" />
              <p className="font-heading text-5xl font-bold"><EditableText contentKey="statsbio.statValue" fallback={bioData.stat.value} /></p>
              <p className="mt-1 text-lg opacity-90"><EditableText contentKey="statsbio.statLabel" fallback={bioData.stat.label} /></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}