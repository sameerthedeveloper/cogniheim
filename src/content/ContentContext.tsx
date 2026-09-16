import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { DEFAULT_CONTENT, type SiteContent } from "./defaultContent";

const CONTENT_DOC = doc(db, "site", "content");

type ContentContextValue = {
  content: SiteContent;
  setContent: (next: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  loading: boolean;
  /** Set when the live Firestore listener fails (e.g. offline, denied). Falls back to defaults/last-known content. */
  error: string | null;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      CONTENT_DOC,
      (snap) => {
        setError(null);
        setLoading(false);
        if (snap.exists()) {
          // shallow-merge per top-level section so fields added later still have defaults
          setContentState((prev) => ({ ...DEFAULT_CONTENT, ...prev, ...(snap.data() as Partial<SiteContent>) }));
        }
      },
      (err) => {
        console.error("Firestore content listener failed:", err);
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  const setContent = useCallback(async (next: SiteContent) => {
    await setDoc(CONTENT_DOC, next);
  }, []);

  const resetContent = useCallback(async () => {
    await setDoc(CONTENT_DOC, DEFAULT_CONTENT);
  }, []);

  return (
    <ContentContext.Provider value={{ content, setContent, resetContent, loading, error }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
