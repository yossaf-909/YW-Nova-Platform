export const translations = {
  nav: {
    en: ['About', 'Skills', 'Services', 'Projects', 'Contact'],
    ar: ['نبذة', 'المهارات', 'الخدمات', 'المشاريع', 'تواصل'],
  },
  heroButtons: {
    en: { work: 'View Work', contact: 'Contact Me' },
    ar: { work: 'عرض الأعمال', contact: 'تواصل معي' },
  },
  publicLabels: {
    aboutEyebrow: { en: 'About', ar: 'نبذة' },
    skillsEyebrow: { en: 'Capabilities', ar: 'القدرات' },
    servicesEyebrow: { en: 'Services', ar: 'الخدمات' },
    projectsEyebrow: { en: 'Featured Work', ar: 'أعمال مختارة' },
    contactEyebrow: { en: 'Contact', ar: 'تواصل' },
    cvEyebrow: { en: 'Resume', ar: 'السيرة الذاتية' },
  },
}

export function pickText(value, language) {
  if (typeof value === 'string') {
    return value
  }

  return value?.[language] ?? value?.en ?? ''
}
