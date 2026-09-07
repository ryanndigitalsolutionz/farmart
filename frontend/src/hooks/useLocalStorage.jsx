import { useState } from "react";

const STORAGE_PREFIX = "farmart_";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
}

export const storage = {
  get: (key, fallback) => read(key, fallback),
  set: (key, value) => write(key, value),
  remove: (key) => localStorage.removeItem(STORAGE_PREFIX + key),
  clear: () => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};

export function useStorage(key, fallback) {
  const [value, setValue] = useState(() => read(key, fallback));

  const set = (next) => {
    const resolved = typeof next === "function" ? next(value) : next;
    setValue(resolved);
    write(key, resolved);
  };

  const reset = () => {
    setValue(fallback);
    localStorage.removeItem(STORAGE_PREFIX + key);
  };

  return [value, set, reset];
}
