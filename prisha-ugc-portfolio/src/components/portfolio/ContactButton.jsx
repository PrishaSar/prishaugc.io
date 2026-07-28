import { Mail } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { usePortfolioContent } from "@/lib/PortfolioContentContext";
import EditableText from "./EditableText";

/**
 * Centered email contact pill. Admins see inline-editable text (no link);
 * visitors see a mailto link with a coral hover ring.
 */
export default function ContactButton({ fallback = "me@nickol.ai", className = "" }) {
  const { user } = useAuth();
  const { getValue } = usePortfolioContent();
  const canEdit = user?.role === "admin";
  const liveEmail = getValue("creator.email", fallback);

  const pillClass =
    "inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-lg font-semibold text-[#1B1B1B] shadow-lg transition hover:scale-105 hover:bg-white hover:ring-2 hover:ring-coral md:text-xl";

  return (
    <div className={`mt-12 flex justify-center md:mt-16 ${className}`}>
      {canEdit ? (
        <span className={pillClass}>
          <Mail className="h-5 w-5" />
          <EditableText contentKey="creator.email" fallback={fallback} />
        </span>
      ) : (
        <a href={`mailto:${liveEmail}`} className={pillClass}>
          <Mail className="h-5 w-5" />
          {liveEmail}
        </a>
      )}
    </div>
  );
}