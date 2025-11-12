// components/LanguageSwitcher.tsx
'use client'; // Wajib untuk interaksi di browser

import { useRouter, usePathname } from 'next/navigation';
import { i18n, Locale } from '@/i18n.config';

// Impor tipe kamus Anda (opsional tapi bagus untuk 'type safety')
import type dictionaryId from '@/dictionaries/id'; 
type Dict = typeof dictionaryId;

// Definisikan props yang akan diterima komponen
type Props = {
  locale: Locale;
  // Kita hanya butuh bagian 'language_switcher' dari kamus
  dict: Dict['language_switcher']; 
};

// Ini adalah komponen yang Anda minta.
// Saya menggunakan <select> dan <option> HTML standar.
// Anda bisa dengan mudah menggantinya kembali ke <NativeSelect>
// dan <NativeSelectOption> karena props-nya (value, onChange) sama.
export default function LanguageSwitcher({ locale, dict }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // Fungsi yang berjalan saat nilai <select> diganti
  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;

    // Cek path saat ini, misal: /en/about
    // Kita pecah menjadi ['', 'en', 'about']
    const segments = pathname.split('/');
    
    // Ganti segmen locale (index ke-1) dengan yang baru
    segments[1] = newLocale;
    
    // Gabungkan kembali menjadi /id/about
    const newPath = segments.join('/');

    // Ganti URL tanpa menambah tumpukan history browser
    router.replace(newPath);
  };

  return (
    <div>
      {/* Label untuk aksesibilitas */}
      <label htmlFor="language-select" style={{ marginRight: '8px' }}>
        {dict.label}:
      </label>
      
      {/* Ganti <select> dan <option> di bawah ini 
        dengan <NativeSelect> dan <NativeSelectOption> jika Anda mau 
      */}
      <select
        id="language-select"
        value={locale} // Nilai default-nya adalah locale yang aktif
        onChange={handleLocaleChange} // Fungsi yang dijalankan saat ganti
      >
        {/* Hapus "apple" dan ganti dengan loop dinamis */}
        {i18n.locales.map((loc) => (
          <option key={loc} value={loc}>
            {/* Mengambil label dari kamus, misal dict['id'] -> "Indonesia" */}
            {dict[loc as keyof typeof dict]}
          </option>
        ))}
      </select>
    </div>
  );
}