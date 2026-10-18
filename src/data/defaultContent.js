const now = new Date().toISOString();

export const DATA_VERSION = "1.0.0";

export const defaultPortfolioData = {
  profile: {
    name: 'يُوسُف',
    brand: 'YW Nova',
    roles: ['Frontend Developer', 'React Developer'],
    heroText: {
      en: 'I build modern, fast and scalable web experiences.',
      ar: 'أبني تجارب ويب حديثة وسريعة وقابلة للتوسع.',
    },
    aboutEnglish:
      'I am a Frontend and React Developer specialized in building modern, fast, and responsive web applications. I focus on performance, clean code, and user experience.',
    aboutArabic:
      'أنا مطور Frontend و React متخصص في بناء مواقع حديثة وسريعة ومتجاوبة مع التركيز على الأداء وتجربة المستخدم وجودة الكود.',
    contact: {
      email: 'yossafwahpa73@gmail.com',
      whatsapp: 'https://wa.me/201115371102',
    },
    cv: {
      url: '/Youssef-CV.pdf',
      fileName: 'Youssef-CV.pdf',
    },
    updatedAt: now,
  },

  settings: {
    theme: 'dark',
    language: 'en',
    accentColor: '#7C3AED',
    glassmorphism: true,
    updatedAt: now,
  },

  skills: [
    { id: 'skill-1', name: 'React', level: 'Advanced', category: 'Frontend' },
    { id: 'skill-2', name: 'Tailwind CSS', level: 'Advanced', category: 'UI' },
    { id: 'skill-3', name: 'Firebase', level: 'Intermediate', category: 'Backend' },
    { id: 'skill-4', name: 'TypeScript', level: 'Intermediate', category: 'Language' },
  ],

  services: [
    {
      id: 'service-1',
      title: { en: 'Frontend Engineering', ar: 'تطوير واجهات أمامية' },
      description: {
        en: 'High-performance interfaces built with scalable React architecture.',
        ar: 'واجهات عالية الأداء مبنية بهيكلية React قابلة للتوسع.',
      },
    },
    {
      id: 'service-2',
      title: { en: 'UI System Design', ar: 'تصميم أنظمة الواجهة' },
      description: {
        en: 'Design systems, dashboards, and reusable component libraries.',
        ar: 'أنظمة تصميم ولوحات تحكم ومكتبات مكونات قابلة لإعادة الاستخدام.',
      },
    },
    {
      id: 'service-3',
      title: { en: 'Firebase Integration', ar: 'تكامل Firebase' },
      description: {
        en: 'Authentication, Firestore, Storage, and operational dashboard flows.',
        ar: 'المصادقة و Firestore و Storage وتدفقات لوحة التحكم التشغيلية.',
      },
    },
  ],

  projects: [
    {
      id: 'project-1',
      title: 'Nova Commerce Dashboard',
      description:
        'A SaaS analytics dashboard with role-aware widgets, rich charts, and fast admin workflows.',
      technologies: ['React', 'Tailwind', 'Firebase', 'Framer Motion'],
      liveUrl: 'https://taskflowmanager0.netlify.app/',
      githubUrl: 'https://github.com/example/commerce',
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      updatedAt: now,
    },
    {
      id: 'project-2',
      title: 'Founder Landing System',
      description:
        'A premium e-commerce marketplace inspired by Amazon and Jumia, featuring advanced search, filtering, product comparison, wishlist, shopping cart, and a fully responsive modern user experience.',
      technologies: [
        'React',
        'Vite',
        'JavaScript',
        'React Router',
        'Context API',
        'CSS3',
        'Local Storage'
      ],
      liveUrl: 'https://novacart-marketplace.netlify.app',
      githubUrl: 'https://github.com/example/founder',
      imageUrl:
        'https://i.pinimg.com/736x/a9/83/6f/a9836f84b80bec18bca46fcb69bd8164.jpg',
      updatedAt: now,
    },
  ],

  activityLogs: [
    {
      id: 'activity-1',
      action: 'Initial workspace created',
      actor: 'System',
      section: 'Setup',
      createdAt: now,
    },
  ],
};