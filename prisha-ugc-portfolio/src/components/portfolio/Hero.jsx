import { MapPin, Sparkles } from "lucide-react";
import SocialLinks from "./SocialLinks";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import SquigglyUnderline from "./SquigglyUnderline";
import DandelionBurst from "./DandelionBurst";

const creatorData = {
  name: "Prisha Saraiya",
  location: "Philadelphia Based Creator 🇺🇸",
  niche: "Engineer by Degree, Storyteller by Obsession",
  tagline: "Tech, Food, & Fashion",
  headshot: "https://media.base44.com/images/public/6a65539fcdc7bff6e81edf58/87097f14e_Screenshot2026-07-25at94312PM.png",
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <DandelionBurst />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Headshot (4:5) */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/20 ring-1 ring-black/5">
            <EditableImage
              contentKey="hero.headshot"
              fallback={creatorData.headshot}
              alt={creatorData.name}
              className="h-full w-full object-cover"
              wrapperClass="h-full w-full"
            />
          </div>

          {/* Right — Name, location, niche, socials */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4 text-coral" />
              <EditableText contentKey="hero.tagline" fallback={creatorData.tagline} />
            </span>
            <h1 className="relative w-fit font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <EditableText contentKey="hero.name" fallback={creatorData.name} />
              <SquigglyUnderline className="mt-1 w-full max-w-[18ch]" />
            </h1>
            <div className="flex items-center gap-2 text-lg text-muted-foreground">
              <MapPin className="h-5 w-5 text-coral" />
              <EditableText contentKey="hero.location" fallback={creatorData.location} />
            </div>
            <p className="text-xl font-medium text-foreground/80">
              <EditableText contentKey="hero.niche" fallback={creatorData.niche} />
            </p>
            <div className="pt-2">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}