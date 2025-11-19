// Karya (Works) Translations
// This file contains manual translations for published works
// Add translations for each work by slug

const karyaTranslations = {
  // Karya 1: Terjemah Bahjatu atthulab
  'terjemah-bahjatu-atthulab': {
    id: {
      title: 'Terjemah Bahjatu Atthulab',
      excerpt: 'Terjemahan kitab Bahjatu Atthulab (بهجة الطلاب) karya Syaikh Al-Albani rahimahullah.',
      description: `
        <h2>Terjemah Bahjatu Atthulab</h2>

        <p>Terjemahan kitab <strong>Bahjatu Atthulab (بهجة الطلاب)</strong> karya Syaikh Muhammad Nashiruddin Al-Albani rahimahullah.</p>

        <p>Kitab ini merupakan salah satu karya penting dalam bidang hadits dan ilmu Islam yang membahas tentang kegembiraan para penuntut ilmu.</p>

        <p><strong>Penerjemah:</strong> Ilham Aryo Prasetyo</p>
      `,
      category: 'Terjemahan',
      year: '2024',
      pdfFile: 'assets/KegiatanKarya/Terjemah Bahjatu atthulab.pdf',
      author: 'Ilham Aryo Prasetyo',
      tags: ['Terjemahan', 'Hadits', 'Ilmu Islam']
    },
    en: {
      title: 'Translation of Bahjatu Atthulab',
      excerpt: 'Translation of the book Bahjatu Atthulab (بهجة الطلاب) by Shaykh Al-Albani rahimahullah.',
      description: `
        <h2>Translation of Bahjatu Atthulab</h2>

        <p>Translation of the book <strong>Bahjatu Atthulab (بهجة الطلاب)</strong> by Shaykh Muhammad Nashiruddin Al-Albani, may Allah have mercy on him.</p>

        <p>This book is one of the important works in the field of hadith and Islamic sciences that discusses the joy of seekers of knowledge.</p>

        <p><strong>Translator:</strong> Ilham Aryo Prasetyo</p>
      `,
      category: 'Translation',
      year: '2024',
      pdfFile: 'assets/KegiatanKarya/Terjemah Bahjatu atthulab.pdf',
      author: 'Ilham Aryo Prasetyo',
      tags: ['Translation', 'Hadith', 'Islamic Sciences']
    }
  },

  // Karya 2: الآداب العشرة
  'al-adab-al-asyarah': {
    id: {
      title: 'الآداب العشرة (Al-Adab Al-Asyarah)',
      excerpt: 'Sepuluh Adab bagi Penuntut Ilmu - Panduan penting dalam menuntut ilmu syar\'i.',
      description: `
        <h2>الآداب العشرة (Al-Adab Al-Asyarah)</h2>

        <p><strong>Sepuluh Adab bagi Penuntut Ilmu</strong></p>

        <p>Karya ini membahas tentang sepuluh adab penting yang harus dimiliki oleh setiap penuntut ilmu syar'i. Adab-adab ini merupakan fondasi penting dalam perjalanan menuntut ilmu agama Islam.</p>

        <p>Memahami dan mengamalkan adab-adab ini akan membantu penuntut ilmu untuk mendapatkan keberkahan dalam ilmunya dan menjadikan ilmu tersebut bermanfaat.</p>

        <p><strong>Penulis:</strong> Ilham Aryo Prasetyo</p>
      `,
      category: 'Karya Tulis',
      year: '2024',
      pdfFile: 'assets/KegiatanKarya/الآداب العشرة.pdf',
      author: 'Ilham Aryo Prasetyo',
      tags: ['Adab', 'Ilmu', 'Akhlaq']
    },
    en: {
      title: 'الآداب العشرة (Al-Adab Al-Asyarah)',
      excerpt: 'Ten Etiquettes for Students of Knowledge - An important guide in seeking Islamic knowledge.',
      description: `
        <h2>الآداب العشرة (Al-Adab Al-Asyarah)</h2>

        <p><strong>Ten Etiquettes for Students of Knowledge</strong></p>

        <p>This work discusses the ten important etiquettes that every student of Islamic knowledge must possess. These etiquettes are an important foundation in the journey of seeking Islamic religious knowledge.</p>

        <p>Understanding and practicing these etiquettes will help students of knowledge to gain blessings in their knowledge and make that knowledge beneficial.</p>

        <p><strong>Author:</strong> Ilham Aryo Prasetyo</p>
      `,
      category: 'Written Work',
      year: '2024',
      pdfFile: 'assets/KegiatanKarya/الآداب العشرة.pdf',
      author: 'Ilham Aryo Prasetyo',
      tags: ['Etiquette', 'Knowledge', 'Character']
    }
  }

  // Add more works translations below following the same structure
};

// Function to get translated work
function getTranslatedKarya(slug, language) {
  if (karyaTranslations[slug] && karyaTranslations[slug][language]) {
    return karyaTranslations[slug][language];
  }
  return null;
}

// Function to check if translation exists for work
function hasKaryaTranslation(slug, language) {
  return karyaTranslations[slug] && karyaTranslations[slug][language];
}

// Function to get all works
function getAllKarya(language) {
  const works = [];
  for (const slug in karyaTranslations) {
    if (karyaTranslations[slug][language]) {
      works.push({
        slug: slug,
        ...karyaTranslations[slug][language]
      });
    }
  }
  return works;
}
