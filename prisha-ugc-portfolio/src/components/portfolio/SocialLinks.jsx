import { useState, useRef, useEffect } from "react";
import { Instagram, Youtube, Mail, Link as LinkIcon } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { usePortfolioContent } from "@/lib/PortfolioContentContext";

const socials = [
  { name: "Instagram", href: "https://instagram.com/nickolaiwww", Icon: Instagram, key: "social.instagram" },
  { name: "TikTok", href: "https://tiktok.com/@nickolaiwww", Icon: TikTokIcon, key: "social.tiktok" },
  { name: "YouTube", href: "https://youtube.com/@nickolaiwww", Icon: Youtube, key: "social.youtube" },
  { name: "Email", href: "mailto:me@nickol.ai", Icon: Mail, key: "social.email" },
];

function TikTokIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.12z" />
    </svg>
  );
}

export default function SocialLinks({ dark = false }) {
  const { user } = useAuth();
  const { getValue, setValue } = usePortfolioContent();
  const canEdit = user?.role === "admin";
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const tone = dark
    ? "border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40"
    : "border-border text-foreground/60 hover:text-primary hover:bg-primary/10 hover:border-primary/30";

  const startEdit = (e, s) => {
    if (!canEdit) return;
    e.preventDefault();
    e.stopPropagation();
    setDraft(getValue(s.key, s.href));
    setEditing(s.key);
  };

  const commit = () => {
    if (editing) setValue(editing, draft);
    setEditing(null);
  };

  const cancel = () => setEditing(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {socials.map((s) => {
        const href = getValue(s.key, s.href);
        if (editing === s.key && canEdit) {
          return (
            <div
              key={s.key}
              className="flex items-center gap-2 rounded-full border border-primary bg-card px-3 py-2"
            >
              <LinkIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commit();
                  }
                  if (e.key === "Escape") {
                    e.preventDefault();
                    cancel();
                  }
                }}
                placeholder={s.href}
                className="w-56 rounded-md bg-background px-2 py-1 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit();
                }}
                className="text-xs font-medium text-primary"
              >
                Save
              </button>
            </div>
          );
        }
        return (
          <a
            key={s.name}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.name}
            onClick={canEdit ? (e) => startEdit(e, s) : undefined}
            title={canEdit ? `Click to edit ${s.name} link` : s.name}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${tone} ${canEdit ? "cursor-text hover:outline-dashed hover:outline-1 hover:outline-primary/40" : ""}`}
          >
            <s.Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}