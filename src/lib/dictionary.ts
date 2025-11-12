// lib/dictionary.ts
import "server-only"; // Memastikan ini hanya berjalan di server
import type { Locale } from "@/i18n.config";

// Kita gunakan dynamic import untuk memuat file yang sesuai
const dictionaries = {
  en: () => import("@/dictionaries/en").then((module) => module.default),
  id: () => import("@/dictionaries/id").then((module) => module.default),
};

// Fungsi async untuk mengambil kamus
export const getDictionary = async (locale: Locale) => {
  // Jika locale tidak ada, gunakan default (id)
  // atau tangani error jika perlu
  const getModule = dictionaries[locale] || dictionaries.id;
  return getModule();
};
