import { motion } from 'framer-motion'
import { HiArrowDownTray, HiArrowTopRightOnSquare, HiBars3BottomRight, HiEnvelope, HiXMark } from 'react-icons/hi2'
import { useState } from 'react'
import { LanguageSwitcher } from '../components/shared/LanguageSwitcher'
import { SectionIntro } from '../components/shared/SectionIntro'
import { ThemeToggle } from '../components/shared/ThemeToggle'
import { useAppSettings } from '../providers/AppSettingsProvider'
import { usePortfolio } from '../providers/PortfolioProvider'
import { pickText, translations } from '../utils/copy'

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export function PublicPortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data, loading } = usePortfolio()
  const { language, isArabic } = useAppSettings()

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="panel max-w-md p-8 text-center">
          <p className="text-lg font-semibold">Preparing YW Nova</p>
          <p className="mt-2 text-sm text-skin-soft">Loading your portfolio content and dashboard settings.</p>
        </div>
      </div>
    )
  }

  const { profile, skills, services, projects } = data

  return (
    <div className="overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-border bg-skin-base/80 backdrop-blur-xl">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white">
              YN
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm text-skin-soft">{profile.name}</p>
              <p className="truncate font-semibold">{profile.brand}</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {translations.nav[language].map((label, index) => {
              const targets = ['about', 'skills', 'services', 'projects', 'contact']
              return (
                <a key={targets[index]} href={`#${targets[index]}`} className="text-sm text-skin-soft transition hover:text-skin-text">
                  {label}
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <button
            type="button"
            className="btn-secondary p-3 lg:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label="Open navigation"
          >
            {mobileMenuOpen ? <HiXMark className="text-xl" /> : <HiBars3BottomRight className="text-xl" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="section-shell pb-5 lg:hidden">
            <div className="panel space-y-4 p-4">
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <div className="grid gap-2">
                {translations.nav[language].map((label, index) => {
                  const targets = ['about', 'skills', 'services', 'projects', 'contact']
                  return (
                    <a
                      key={targets[index]}
                      href={`#${targets[index]}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-2xl px-3 py-2 text-sm text-skin-soft transition hover:bg-white/5 hover:text-skin-text"
                    >
                      {label}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="section-shell py-10 sm:py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <span className="inline-flex rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
                {profile.brand}
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.roles.map((role) => (
                  <span key={role} className="rounded-full border border-border bg-white/5 px-4 py-2 text-sm text-skin-soft">
                    {role}
                  </span>
                ))}
              </div>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-skin-soft sm:text-xl">
                {pickText(profile.heroText, language)}
              </p>
              <div className="mt-8 flex flex-col gap-4 xs:flex-row sm:flex-row">
                <a href="#projects" className="btn-primary">
                  {translations.heroButtons[language].work}
                </a>
                <a href="#contact" className="btn-secondary">
                  {translations.heroButtons[language].contact}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="panel relative overflow-hidden p-5 sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
              <div className="relative grid gap-5">
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-sm text-skin-soft">{isArabic ? 'التركيز' : 'Focus'}</p>
                  <p className="mt-3 text-2xl font-bold">{isArabic ? 'تجارب رقمية قابلة للتوسع' : 'Scalable digital experiences'}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-white/5 p-5">
                    <p className="text-sm text-skin-soft">{isArabic ? 'مبني بـ' : 'Built with'}</p>
                    <p className="mt-3 font-semibold">React, Tailwind, Firebase</p>
                  </div>
                  <div className="rounded-3xl border border-border bg-white/5 p-5">
                    <p className="text-sm text-skin-soft">{isArabic ? 'التجربة' : 'Experience'}</p>
                    <p className="mt-3 font-semibold">{isArabic ? 'لوحات تحكم ومنصات منتجات' : 'Dashboards & product platforms'}</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['05+', isArabic ? 'شاشات مدعومة' : 'Screen classes'],
                    ['100%', isArabic ? 'تحكم عبر لوحة الإدارة' : 'Admin-managed'],
                    ['RTL', isArabic ? 'جاهز للعربية' : 'Arabic ready'],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-3xl border border-border bg-white/5 p-4 text-center">
                      <p className="text-2xl font-bold">{value}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-skin-soft">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section-shell py-10 sm:py-14 lg:py-20">
          <SectionIntro
            eyebrow={pickText(translations.publicLabels.aboutEyebrow, language)}
            title={isArabic ? 'واجهة احترافية مع أساس تقني قوي' : 'Premium frontend craft backed by product thinking'}
            description={language === 'ar' ? profile.aboutArabic : profile.aboutEnglish}
          />
        </section>

        <section id="skills" className="section-shell py-10 sm:py-14 lg:py-20">
          <SectionIntro
            eyebrow={pickText(translations.publicLabels.skillsEyebrow, language)}
            title={isArabic ? 'مهارات قابلة للتطوير والإنتاج' : 'Production-ready skills that scale'}
            description={
              isArabic
                ? 'كل المهارات يتم إدارتها من لوحة التحكم ويمكن تحديثها دون تعديل الكود.'
                : 'Every skill is managed from the admin dashboard so the content can evolve without touching code.'
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skills.map((skill) => (
              <div key={skill.id} className="panel p-5">
                <p className="text-sm text-secondary">{skill.category}</p>
                <h3 className="mt-3 text-xl font-semibold">{skill.name}</h3>
                <p className="mt-3 text-sm text-skin-soft">{skill.level}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section-shell py-10 sm:py-14 lg:py-20">
          <SectionIntro
            eyebrow={pickText(translations.publicLabels.servicesEyebrow, language)}
            title={isArabic ? 'خدمات رقمية بمستوى منتجات SaaS' : 'Product-minded services with SaaS polish'}
            description={
              isArabic
                ? 'تعكس هذه الخدمات الخبرة في بناء أنظمة واجهات ولوحات تحكم ومشاريع قابلة للنمو.'
                : 'These offerings reflect real experience building frontend systems, dashboards, and scalable product experiences.'
            }
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="panel group p-6 transition hover:-translate-y-1 hover:border-primary/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  0{services.indexOf(service) + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{pickText(service.title, language)}</h3>
                <p className="mt-4 text-sm leading-7 text-skin-soft">{pickText(service.description, language)}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell py-10 sm:py-14 lg:py-20">
          <SectionIntro
            eyebrow={pickText(translations.publicLabels.projectsEyebrow, language)}
            title={isArabic ? 'مشاريع حديثة بإدارة محتوى كاملة' : 'Modern portfolio projects powered by real CMS workflows'}
            description={
              isArabic
                ? 'يمكن تحديث المشاريع والصور والروابط والتقنيات المستخدمة من لوحة الإدارة مباشرة.'
                : 'Projects, images, links, and technology stacks can all be updated directly from the admin dashboard.'
            }
          />
          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.id}
                whileHover={{ y: -6 }}
                className="panel overflow-hidden"
              >
                <img src={project.imageUrl} alt={project.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-skin-soft">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-border px-3 py-1 text-xs text-skin-soft">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary px-4 py-2">
                      <HiArrowTopRightOnSquare />
                      <span className="ms-2">{isArabic ? 'عرض المشروع' : 'Live Demo'}</span>
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2">
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell py-10 sm:py-14 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="panel p-6 sm:p-8">
              <SectionIntro
                eyebrow={pickText(translations.publicLabels.contactEyebrow, language)}
                title={isArabic ? 'لنصنع تجربة رقمية قوية' : 'Let’s build a stronger digital experience'}
                description={
                  isArabic
                    ? 'جميع بيانات التواصل قابلة للتعديل من لوحة التحكم وتشمل البريد والواتساب.'
                    : 'All contact details are editable from the dashboard, including email and WhatsApp.'
                }
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <a href={`mailto:${profile.contact.email}`} className="panel p-6 transition hover:-translate-y-1">
                <HiEnvelope className="text-2xl text-secondary" />
                <p className="mt-5 text-sm text-skin-soft">{isArabic ? 'البريد الإلكتروني' : 'Email'}</p>
                <p className="mt-2 text-lg font-semibold">{profile.contact.email}</p>
              </a>
              <a href={profile.contact.whatsapp} target="_blank" rel="noreferrer" className="panel p-6 transition hover:-translate-y-1">
                <p className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-lg font-bold text-emerald-400">
                  WA
                </p>
                <p className="mt-5 text-sm text-skin-soft">WhatsApp</p>
                <p className="mt-2 text-lg font-semibold">{isArabic ? 'ابدأ المحادثة' : 'Start a conversation'}</p>
              </a>
            </div>
          </div>
        </section>

        <section className="section-shell pb-16 sm:pb-20 lg:pb-28">
          <div className="panel overflow-hidden p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  {pickText(translations.publicLabels.cvEyebrow, language)}
                </span>
                <h3 className="mt-5 text-2xl font-bold">{isArabic ? 'تحميل السيرة الذاتية' : 'Download Resume'}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-skin-soft">
                  {isArabic
                    ? 'يمكن للإدارة رفع نسخة جديدة من السيرة الذاتية واستبدال الرابط مباشرة من لوحة التحكم.'
                    : 'The admin can upload a fresh CV version and replace the public link directly from the dashboard.'}
                </p>
              </div>

              <a href={profile.cv.url} target="_blank" rel="noreferrer" className="btn-primary">
                <HiArrowDownTray />
                <span className="ms-2">{profile.cv.fileName || (isArabic ? 'تحميل الملف' : 'Download CV')}</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
