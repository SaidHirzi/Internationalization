// app/[locale]/page.tsx
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import LanguageSwitcher from "@/components/switcher/languengeSwitcher";

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
      <div>
        <LanguageSwitcher locale={locale} dict={dict.language_switcher} />
      </div>
      <div>
        <h1>{dict.homepage.title}</h1>
        <p>{dict.homepage.description}</p>
      </div>
    </main>
  );
}
