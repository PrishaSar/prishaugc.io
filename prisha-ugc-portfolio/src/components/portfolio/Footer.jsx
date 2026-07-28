import SocialLinks from "./SocialLinks";
import EditableText from "./EditableText";
import { useAuth } from "@/lib/AuthContext";
import { usePortfolioContent } from "@/lib/PortfolioContentContext";

const footerData = {
  name: "Nickolai Junussov",
  headline: "Tech + Lifestyle Creator",
  email: "me@nickol.ai",
};

export default function Footer() {
  const { user } = useAuth();
  const { getValue } = usePortfolioContent();
  const canEdit = user?.role === "admin";
  const liveEmail = getValue("creator.email", footerData.email);
  const liveName = getValue("footer.name", footerData.name);

  return (
    <footer className="bg-foreground py-20 text-background md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center lg:px-8">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">
          <EditableText contentKey="footer.name" fallback={footerData.name} />
        </h2>
        <p className="text-lg opacity-80">
          <EditableText contentKey="footer.headline" fallback={footerData.headline} />
        </p>
        {canEdit ? (
          <EditableText
            contentKey="creator.email"
            fallback={footerData.email}
            className="text-lg text-white/90 underline decoration-primary/60 underline-offset-4"
          />
        ) : (
          <a
            href={`mailto:${liveEmail}`}
            className="text-lg text-white/90 underline decoration-primary/60 underline-offset-4 transition-colors hover:text-white hover:decoration-primary"
          >
            {liveEmail}
          </a>
        )}
        <div className="pt-2">
          <SocialLinks dark />
        </div>
        <p className="mt-4 text-sm opacity-50">
          © {new Date().getFullYear()} {liveName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}