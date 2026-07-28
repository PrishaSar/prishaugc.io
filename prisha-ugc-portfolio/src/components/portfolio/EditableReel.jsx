import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { usePortfolioContent } from "@/lib/PortfolioContentContext";
import { base44 } from "@/api/base44Client";
import { Link as LinkIcon, Play, Instagram, Music2, Loader2 } from "lucide-react";
import EditableText from "./EditableText";

function isInstagramUrl(url) {
  return /instagram\.com\/(reel|reels|p|tv)\//i.test(url || "");
}
function isTikTokUrl(url) {
  return /tiktok\.com/i.test(url || "") || /vm\.tiktok\.com/i.test(url || "");
}
function platformOf(url) {
  if (isInstagramUrl(url)) return "instagram";
  if (isTikTokUrl(url)) return "tiktok";
  return null;
}

/**
 * Editable reel/video tile. Supports Instagram and TikTok URLs. Admins click
 * to paste a new URL; everyone else sees the server-fetched thumbnail and links
 * out to the reel when clicked.
 */
export default function EditableReel({ contentKey, fallback, index = 0, viewsFallback, sharesFallback, showStats = true }) {
  const { user } = useAuth();
  const { getValue, setValue } = usePortfolioContent();
  const canEdit = user?.role === "admin";
  const reelUrl = getValue(contentKey, fallback);
  const platform = platformOf(reelUrl);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [thumb, setThumb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  useEffect(() => {
    let cancelled = false;
    if (!platform) {
      setThumb(null);
      setFailed(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setFailed(false);
    setThumb(null);
    base44.functions
      .invoke(platform === "tiktok" ? "tiktokThumbnail" : "igThumbnail", { url: reelUrl })
      .then((res) => {
        if (cancelled) return;
        const data = res?.data || {};
        if (data.thumbnail) setThumb(data.thumbnail);
        else setFailed(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reelUrl, platform]);

  const startEdit = (e) => {
    if (!canEdit) return;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setDraft(reelUrl || "");
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    if (draft !== reelUrl) setValue(contentKey, draft);
  };

  const cancel = () => setEditing(false);

  const link = platform ? reelUrl : "#";
  const placeholder = "Paste reel/video URL (Instagram or TikTok)";

  return (
    <div className="flex w-full flex-col gap-2">
    <div
      className="group relative h-full min-h-[400px] w-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:-rotate-1 hover:shadow-xl"
      onClick={canEdit && !editing ? startEdit : undefined}
      title={canEdit ? "Click to change URL" : undefined}
    >
      {editing && canEdit ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
          <div className="flex w-full items-center gap-2">
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
              placeholder={placeholder}
              className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={commit}
              className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background"
            >
              Save
            </button>
            <button
              onClick={cancel}
              className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : canEdit ? (
        <ThumbnailView loading={loading} thumb={thumb} failed={failed} reelUrl={link} platform={platform} />
      ) : (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
          <ThumbnailView loading={loading} thumb={thumb} failed={failed} reelUrl={link} platform={platform} />
        </a>
      )}

      {canEdit && !editing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground shadow">
            <LinkIcon className="h-3.5 w-3.5" /> Change
          </span>
        </div>
      )}
    </div>

      {showStats && (
        <div className="flex gap-2">
          <div className="flex-1 rounded-xl border border-black/10 bg-white px-2.5 py-1.5 text-center shadow-sm">
            <EditableText contentKey={`${contentKey}.views`} fallback={viewsFallback ?? ""} className="block min-h-[1.25rem] font-heading text-sm font-semibold text-foreground" />
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Views</span>
          </div>
          <div className="flex-1 rounded-xl border border-black/10 bg-white px-2.5 py-1.5 text-center shadow-sm">
            <EditableText contentKey={`${contentKey}.shares`} fallback={sharesFallback ?? ""} className="block min-h-[1.25rem] font-heading text-sm font-semibold text-foreground" />
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Shares</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ThumbnailView({ loading, thumb, failed, reelUrl, platform }) {
  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (thumb) {
    return (
      <div className="relative h-full w-full">
        <img src={thumb} alt="video thumbnail" className="h-full w-full object-cover" loading="lazy" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/85 text-foreground shadow-lg">
            <Play className="h-5 w-5 translate-x-[1px] fill-current" />
          </span>
        </div>
      </div>
    );
  }
  // failed / no thumbnail — still link out
  const Icon = platform === "tiktok" ? Music2 : Instagram;
  const label = platform === "tiktok" ? "View this video on TikTok" : "View this reel on Instagram";
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/5 to-primary/10 p-6 text-center">
      <Icon className="h-8 w-8 text-primary" />
      <span className="text-sm font-medium text-foreground/70">{label}</span>
    </div>
  );
}