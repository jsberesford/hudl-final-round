import { useEffect, useState } from "react";

const KEY = "deck.reducedMotion";

function read(): boolean | null {
  try {
    const v = localStorage.getItem(KEY);
    return v == null ? null : v === "1";
  } catch {
    return null;
  }
}

/** Reduced motion: explicit toggle wins, otherwise follow the OS setting. */
export function usePrefs() {
  const [mq] = useState(() => (typeof matchMedia === "undefined" ? null : matchMedia("(prefers-reduced-motion: reduce)")));
  const [os, setOs] = useState(() => mq?.matches ?? false);
  const [choice, setChoice] = useState<boolean | null>(read);

  useEffect(() => {
    if (!mq) return;
    const on = () => setOs(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [mq]);

  const setReduced = (v: boolean) => {
    setChoice(v);
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
    } catch {
      /* storage unavailable: keep the in-memory choice */
    }
  };

  return { reduced: choice ?? os, setReduced };
}
