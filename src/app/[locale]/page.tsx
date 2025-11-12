// app/[locale]/page.tsx
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // ✅ Unwrap promise-nya dulu
  const { locale } = await params;

  // Ambil data kamus berdasarkan locale
  const dict = await getDictionary(locale);

  return (
    <main>
      <h1>{dict.homepage.title}</h1>
      <p>{dict.homepage.description}</p>

      <h2>{dict.navigation.home}</h2>

      <nav>
        {/* Contoh link (kita akan bahas language switcher nanti) */}
        <a href={`/${locale}/about`}>{dict.navigation.about}</a>
      </nav>
    </main>
  );
}
