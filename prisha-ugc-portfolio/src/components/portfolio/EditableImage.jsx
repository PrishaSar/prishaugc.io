import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { usePortfolioContent } from "@/lib/PortfolioContentContext";
import { base44 } from "@/api/base44Client";
import { ImagePlus, Upload, Link as LinkIcon } from "lucide-react";

/**
 * Click-to-edit image for admins. Shows the picture for everyone; admins can
 * paste a new URL or upload a file. The value stored in SiteContent is the
 * final image URL (either pasted or returned by UploadFile).
 */
export default function EditableImage({
  contentKey,
  fallback,
  alt,
  className,
  wrapperClass = "",
}) {
  const { user } = useAuth();
  const { getValue, setValue } = usePortfolioContent();
  const canEdit = user?.role === "admin";
  const src = getValue(contentKey, fallback);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const startEdit = (e) => {
    if (!canEdit) return;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setDraft(src || "");
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    if (draft !== src) setValue(contentKey, draft);
  };

  const cancel = () => {
    setEditing(false);
    setDraft("");
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await base44.integrations.Core.UploadFile({ file });
      if (res?.file_url) setValue(contentKey, res.file_url);
      setEditing(false);
    } catch {
      // ignore
    } finally {
      setUploading(false);
    }
  };

  if (editing && canEdit) {
    return (
      <div className={`relative ${wrapperClass}`}>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/95 p-3">
          <div className="flex w-full max-w-xs items-center gap-2">
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
              placeholder="Paste image URL"
              className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Uploading…" : "Upload"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFile}
                disabled={uploading}
              />
            </label>
            <button
              onClick={commit}
              className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90"
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
        <img src={src} alt={alt} className={className} />
      </div>
    );
  }

  return (
    <div
      className={`group relative ${wrapperClass}`}
      onClick={canEdit ? startEdit : undefined}
      title={canEdit ? "Click to change image" : undefined}
    >
      <img src={src} alt={alt} className={className} />
      {canEdit && src && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground shadow">
            <ImagePlus className="h-3.5 w-3.5" /> Change image
          </span>
        </div>
      )}
    </div>
  );
}