import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { usePortfolioContent } from "@/lib/PortfolioContentContext";

/**
 * Inline editable text. Renders the value for everyone; only admins get the
 * click-to-edit affordance (gated both in the UI and by SiteContent RLS),
 * while anonymous visitors keep seeing exactly what's stored.
 */
export default function EditableText({
  contentKey,
  fallback,
  multiline = false,
  className = "",
}) {
  const { user } = useAuth();
  const { getValue, setValue } = usePortfolioContent();
  const canEdit = user?.role === "admin";

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef(null);
  const display = getValue(contentKey, fallback ?? "");

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select?.();
    }
  }, [editing]);

  const startEdit = (e) => {
    if (!canEdit) return;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setDraft(String(display ?? ""));
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    if (draft !== display) {
      setValue(contentKey, draft);
    }
  };

  const cancel = () => {
    setEditing(false);
    setDraft(String(display ?? ""));
  };

  if (editing && canEdit) {
    const baseClass =
      "w-full rounded-sm bg-white px-1 -mx-1 text-foreground outline-none ring-2 ring-primary";
    const sharedStyle = { font: "inherit", color: "inherit" };
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              cancel();
            }
          }}
          rows={Math.max(3, draft.split("\n").length + 1)}
          className={`${baseClass} ${className}`}
          style={sharedStyle}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
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
        className={`${baseClass} ${className}`}
        style={sharedStyle}
      />
    );
  }

  return (
    <span
      onClick={canEdit ? startEdit : undefined}
      title={canEdit ? "Click to edit" : undefined}
      className={`${className} ${canEdit ? "cursor-text rounded-sm -mx-0.5 px-0.5 transition hover:bg-primary/5 hover:outline-dashed hover:outline-1 hover:outline-primary/40" : ""}`}
    >
      {display ?? fallback ?? ""}
    </span>
  );
}