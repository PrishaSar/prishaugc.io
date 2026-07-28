/**
 * Shared wrapper for brand showcase sections.
 * Yellow background, stats header, and brand name. Copy is click-to-edit by
 * admins via EditableText; anonymous visitors see a normal mailto link.
 */
import { Mail } from "lucide-react";
import EditableText from "./EditableText";
import { useAuth } from "@/lib/AuthContext";
import { usePortfolioContent } from "@/lib/PortfolioContentContext";

export default function BrandSection({
  stats = [],
  statsKey,
  brandName,
  brandNameKey,
  email,
  emailKey,
  children,
}) {
  const { user } = useAuth();
  const { getValue } = usePortfolioContent();
  const canEdit = user?.role === "admin";
  const liveEmail = getValue(emailKey, email);

  const pillClass =
    "inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-lg font-semibold text-[#1B1B1B] shadow-lg md:text-xl";

  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: "#f2d0f5" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          {stats.map((stat, i) => (
            <p key={i} className="text-lg font-medium text-[#1B1B1B] md:text-2xl">
              <EditableText contentKey={`${statsKey}.${i}`} fallback={stat} />
            </p>
          ))}
          <h2
            className="mt-2 font-heading text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
          >
            <EditableText contentKey={brandNameKey} fallback={brandName} />
          </h2>
        </div>
        {/* Content */}
        {children}
        {/* Email */}
        {email && (
          <div className="mt-12 flex justify-center">
            {canEdit ? (
              <span className={pillClass}>
                <Mail className="h-5 w-5" />
                <EditableText contentKey={emailKey} fallback={email} />
              </span>
            ) : (
              <a href={`mailto:${liveEmail}`} className={`${pillClass} transition hover:scale-105 hover:bg-white hover:ring-2 hover:ring-coral`}>
                <Mail className="h-5 w-5" />
                {liveEmail}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}