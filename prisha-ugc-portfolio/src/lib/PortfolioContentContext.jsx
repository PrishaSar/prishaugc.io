import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "prisha_ugc_portfolio_content";

function loadContentFromStorage() {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn("Failed to load saved portfolio content", error);
    return {};
  }
}

function saveContentToStorage(content) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (error) {
    console.warn("Failed to save portfolio content", error);
  }
}

const PortfolioContentContext = createContext(null);

export function PortfolioContentProvider({ children }) {
  const [content, setContent] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setContent(loadContentFromStorage());
    setLoaded(true);
  }, []);

  const getValue = useCallback(
    (key, fallback) => {
      const v = content[key];
      return v === undefined || v === null ? fallback : v;
    },
    [content]
  );

  const setValue = useCallback((key, value) => {
    const trimmed = String(value ?? "");
    setContent((prev) => {
      const next = { ...prev, [key]: trimmed };
      saveContentToStorage(next);
      return next;
    });
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