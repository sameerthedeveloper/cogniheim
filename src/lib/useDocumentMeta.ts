import { useEffect } from "react";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Keeps <title>/<meta description>/OG/Twitter tags in sync with editable content, for browsers and JS-executing crawlers (raw-HTML bots read the static tags in index.html instead). */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
}

/** Marks the current route as non-indexable (e.g. the admin dashboard) while mounted. */
export function useNoIndex() {
  useEffect(() => {
    let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !el;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "robots");
      document.head.appendChild(el);
    }
    const prev = el.getAttribute("content");
    el.setAttribute("content", "noindex, nofollow");
    return () => {
      if (created) el?.remove();
      else if (prev) el?.setAttribute("content", prev);
    };
  }, []);
}
