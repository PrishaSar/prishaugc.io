import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { appParams } from "@/lib/app-params";

const PortfolioContentContext = createContext(null);

export function PortfolioContentProvider({ children }) {
  const [content, setContent] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!appParams.appId) {
      setLoaded(true);
      return;
    }

    let mounted = true;
    base44.entities.SiteContent.list()
      .then((records) => {
        if (!mounted) return;
        const map = {};
        for (const r of records) {
          const k = r.key ?? r.data?.key;
          const v = r.value ?? r.data?.value;
          if (k != null) map[k] = v;
        }
        setContent(map);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => {
      mounted = false;
    };
  }, []);

  const getValue = useCallback(
    (key, fallback) => {
      const v = content[key];
      return v === undefined || v === null ? fallback : v;
    },
    [content]
  );

  const setValue = useCallback(async (key, value) => {
    const trimmed = String(value ?? "");
    setContent((prev) => ({ ...prev, [key]: trimmed }));
    try {
      const existing = await base44.entities.SiteContent.filter({ key });
      if (existing && existing.length > 0) {
        await base44.entities.SiteContent.update(existing[0].id, { value: trimmed });
      } else {
        await base44.entities.SiteContent.create({ key, value: trimmed });
      }
    } catch (e) {
      // Silent: next reload reverts to last saved value
    }
  }, []);

  return (
    <PortfolioContentContext.Provider value={{ getValue, setValue, loaded }}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  const ctx = useContext(PortfolioContentContext);
  if (!ctx) {
    throw new Error("usePortfolioContent must be used within a PortfolioContentProvider");
  }
  return ctx;
}