import { useDeferredValue, useMemo, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  HiArrowPath,
  HiArrowTopRightOnSquare,
  HiBars3,
  HiBriefcase,
  HiChartBar,
  HiCog6Tooth,
  HiDocumentArrowUp,
  HiGlobeAlt,
  HiHomeModern,
  HiLanguage,
  HiPaintBrush,
  HiPower,
  HiRectangleGroup,
  HiSquares2X2,
  HiUserCircle,
  HiUsers,
  HiXMark,
} from 'react-icons/hi2'
import { LanguageSwitcher } from '../../components/shared/LanguageSwitcher'
import { StatCard } from '../../components/shared/StatCard'
import { ThemeToggle } from '../../components/shared/ThemeToggle'
import { useAuth } from '../../providers/AuthProvider'
import { usePortfolio } from '../../providers/PortfolioProvider'

const navigation = [
  { path: '', label: 'Dashboard Overview', icon: HiChartBar },
  { path: 'profile', label: 'Profile Management', icon: HiUserCircle },
  { path: 'skills', label: 'Skills Management', icon: HiSquares2X2 },
  { path: 'services', label: 'Services Management', icon: HiBriefcase },
  { path: 'projects', label: 'Projects Management', icon: HiRectangleGroup },
  { path: 'contact', label: 'Contact Management', icon: HiGlobeAlt },
  { path: 'cv', label: 'CV Management', icon: HiDocumentArrowUp },
  { path: 'theme', label: 'Theme Settings', icon: HiPaintBrush },
  { path: 'language', label: 'Language Settings', icon: HiLanguage },
  { path: 'account', label: 'Account Settings', icon: HiCog6Tooth },
]

function DashboardLayout({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const { refresh, saving, error } = usePortfolio()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-skin-base">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 z-50 w-[290px] border-e border-border bg-skin-card/95 p-5 backdrop-blur-xl transition-transform lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-bold text-white">
                YN
              </div>
              <div>
                <p className="text-sm text-skin-soft">YW Nova</p>
                <p className="font-semibold">Admin Workspace</p>
              </div>
            </div>
            <button type="button" className="btn-secondary p-3 lg:hidden" onClick={() => setSidebarOpen(false)}>
              <HiXMark />
            </button>
          </div>

          <div className="mt-8 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === `/admin/${item.path}` || (item.path === '' && location.pathname === '/admin')

              return (
                <NavLink
                  key={item.label}
                  to={item.path ? `/admin/${item.path}` : '/admin'}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'text-skin-soft hover:bg-white/5 hover:text-skin-text'
                  }`}
                >
                  <Icon className="text-lg" />
                  {item.label}
                </NavLink>
              )
            })}
          </div>

          <button
            type="button"
            onClick={async () => {
              await logout()
              navigate('/admin/login', { replace: true })
            }}
            className="btn-secondary mt-8 w-full justify-start gap-3"
          >
            <HiPower />
            Logout
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border bg-skin-base/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button type="button" className="btn-secondary p-3 lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <HiBars3 />
                </button>
                <div>
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <p className="text-sm text-skin-soft">{subtitle}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <LanguageSwitcher />
                <ThemeToggle />
                <button type="button" onClick={refresh} className="btn-secondary gap-2" disabled={saving}>
                  <HiArrowPath />
                  {saving ? 'Syncing...' : 'Refresh'}
                </button>
                <a href="/" target="_blank" rel="noreferrer" className="btn-secondary gap-2">
                  <HiArrowTopRightOnSquare />
                  View Site
                </a>
              </div>
            </div>
            {error ? <p className="mt-4 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-red-300">{error}</p> : null}
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}

function SectionCard({ title, description, children }) {
  return (
    <div className="panel p-5 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-skin-soft">{description}</p>
      </div>
      {children}
    </div>
  )
}

function OverviewPage() {
  const { data } = usePortfolio()
  const recent = data.activityLogs.slice(0, 5)
  const lastUpdated = data.profile.updatedAt ? new Date(data.profile.updatedAt).toLocaleString() : 'Just now'

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Projects" value={data.projects.length} hint="Published portfolio case studies" />
        <StatCard label="Total Skills" value={data.skills.length} hint="Editable tech capabilities" />
        <StatCard label="Total Services" value={data.services.length} hint="Active commercial offerings" />
        <StatCard label="Last Updated" value={lastUpdated} hint="Latest profile sync" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard
          title="Platform Snapshot"
          description="A SaaS-style overview of your content operations and publishing readiness."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Responsive system', '5 screen ranges supported across public site and admin workspace.'],
              ['Localization', 'Arabic and English content with full RTL switching.'],
              ['Admin control', 'Projects, services, skills, CV, theme, and contact are editable.'],
              ['Persistence layer', 'Firebase ready with local demo storage for development.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-border bg-white/5 p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-skin-soft">{text}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Activity" description="Track the latest admin actions and content changes.">
          <div className="space-y-4">
            {recent.map((item) => (
              <div key={item.id} className="rounded-3xl border border-border bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{item.action}</p>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item.section}</span>
                </div>
                <p className="mt-2 text-sm text-skin-soft">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Quick Actions" description="Jump into the most common publishing and operational tasks.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ['/admin/projects', 'Add Project', HiRectangleGroup],
            ['/admin/profile', 'Update Hero', HiHomeModern],
            ['/admin/cv', 'Upload CV', HiDocumentArrowUp],
            ['/admin/theme', 'Adjust Theme', HiPaintBrush],
          ].map(([href, label, Icon]) => (
            <NavLink key={label} to={href} className="panel flex items-center gap-4 p-5 transition hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                <Icon className="text-xl" />
              </div>
              <div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-skin-soft">Open management panel</p>
              </div>
            </NavLink>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function ProfilePage() {
  const { data, updateProfile, saving } = usePortfolio()
  const [form, setForm] = useState({
    name: data.profile.name,
    brand: data.profile.brand,
    roles: data.profile.roles.join(', '),
    heroTextEn: data.profile.heroText.en,
    heroTextAr: data.profile.heroText.ar,
    aboutEnglish: data.profile.aboutEnglish,
    aboutArabic: data.profile.aboutArabic,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    await updateProfile({
      name: form.name,
      brand: form.brand,
      roles: form.roles.split(',').map((item) => item.trim()).filter(Boolean),
      heroText: { en: form.heroTextEn, ar: form.heroTextAr },
      aboutEnglish: form.aboutEnglish,
      aboutArabic: form.aboutArabic,
    })
  }

  return (
    <SectionCard title="Profile Management" description="Manage your personal identity, hero copy, and bilingual about content.">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 xl:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium">Name</span>
            <input className="field" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">Brand</span>
            <input className="field" value={form.brand} onChange={(event) => setForm((current) => ({ ...current, brand: event.target.value }))} />
          </label>
        </div>
        <label>
          <span className="mb-2 block text-sm font-medium">Roles</span>
          <input className="field" value={form.roles} onChange={(event) => setForm((current) => ({ ...current, roles: event.target.value }))} />
        </label>
        <div className="grid gap-5 xl:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium">Hero Text (EN)</span>
            <textarea className="field min-h-28" value={form.heroTextEn} onChange={(event) => setForm((current) => ({ ...current, heroTextEn: event.target.value }))} />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">Hero Text (AR)</span>
            <textarea className="field min-h-28" value={form.heroTextAr} onChange={(event) => setForm((current) => ({ ...current, heroTextAr: event.target.value }))} />
          </label>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium">About (EN)</span>
            <textarea className="field min-h-40" value={form.aboutEnglish} onChange={(event) => setForm((current) => ({ ...current, aboutEnglish: event.target.value }))} />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">About (AR)</span>
            <textarea className="field min-h-40" value={form.aboutArabic} onChange={(event) => setForm((current) => ({ ...current, aboutArabic: event.target.value }))} />
          </label>
        </div>
        <button type="submit" className="btn-primary w-full sm:w-fit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </SectionCard>
  )
}

function SkillsPage() {
  const { data, saveSkill, deleteSkill, saving } = usePortfolio()
  const [form, setForm] = useState({ id: '', name: '', level: '', category: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await saveSkill(form)
    if (success) {
      setForm({ id: '', name: '', level: '', category: '' })
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Add or Edit Skill" description="Keep the public skills grid current without touching code.">
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            ['name', 'Skill Name'],
            ['level', 'Level'],
            ['category', 'Category'],
          ].map(([key, label]) => (
            <label key={key}>
              <span className="mb-2 block text-sm font-medium">{label}</span>
              <input className="field" value={form[key]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} required />
            </label>
          ))}
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {form.id ? 'Update Skill' : 'Create Skill'}
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Skills Inventory" description="Responsive content table for production-ready skills management.">
        <div className="grid gap-4">
          {data.skills.map((skill) => (
            <div key={skill.id} className="rounded-3xl border border-border bg-white/5 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{skill.name}</p>
                  <p className="mt-1 text-sm text-skin-soft">{skill.category} • {skill.level}</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" className="btn-secondary px-4 py-2" onClick={() => setForm(skill)}>
                    Edit
                  </button>
                  <button type="button" className="btn-secondary px-4 py-2 text-red-300" onClick={() => deleteSkill(skill.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function ServicesPage() {
  const { data, saveService, deleteService, saving } = usePortfolio()
  const [form, setForm] = useState({
    id: '',
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await saveService(form)
    if (success) {
      setForm({ id: '', title: { en: '', ar: '' }, description: { en: '', ar: '' } })
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <SectionCard title="Service Editor" description="Manage bilingual service cards for the public portfolio.">
        <form onSubmit={handleSubmit} className="space-y-5">
          <label>
            <span className="mb-2 block text-sm font-medium">Title (EN)</span>
            <input className="field" value={form.title.en} onChange={(event) => setForm((current) => ({ ...current, title: { ...current.title, en: event.target.value } }))} required />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">Title (AR)</span>
            <input className="field" value={form.title.ar} onChange={(event) => setForm((current) => ({ ...current, title: { ...current.title, ar: event.target.value } }))} required />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">Description (EN)</span>
            <textarea className="field min-h-28" value={form.description.en} onChange={(event) => setForm((current) => ({ ...current, description: { ...current.description, en: event.target.value } }))} required />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">Description (AR)</span>
            <textarea className="field min-h-28" value={form.description.ar} onChange={(event) => setForm((current) => ({ ...current, description: { ...current.description, ar: event.target.value } }))} required />
          </label>
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {form.id ? 'Update Service' : 'Create Service'}
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Service Library" description="Professional service cards with Arabic and English support.">
        <div className="grid gap-4">
          {data.services.map((service) => (
            <div key={service.id} className="rounded-3xl border border-border bg-white/5 p-4">
              <p className="font-semibold">{service.title.en}</p>
              <p className="mt-1 text-sm text-skin-soft">{service.title.ar}</p>
              <p className="mt-4 text-sm leading-7 text-skin-soft">{service.description.en}</p>
              <div className="mt-4 flex gap-3">
                <button type="button" className="btn-secondary px-4 py-2" onClick={() => setForm(service)}>
                  Edit
                </button>
                <button type="button" className="btn-secondary px-4 py-2 text-red-300" onClick={() => deleteService(service.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function ProjectsPage() {
  const { data, saveProject, deleteProject, saving } = usePortfolio()
  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    imageUrl: '',
  })
  const [file, setFile] = useState(null)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredProjects = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase()
    if (!term) {
      return data.projects
    }

    return data.projects.filter((project) => project.title.toLowerCase().includes(term))
  }, [data.projects, deferredQuery])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await saveProject(
      {
        ...form,
        technologies: form.technologies.split(',').map((item) => item.trim()).filter(Boolean),
      },
      file,
    )

    if (success) {
      setForm({
        id: '',
        title: '',
        description: '',
        technologies: '',
        liveUrl: '',
        githubUrl: '',
        imageUrl: '',
      })
      setFile(null)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="Project Editor" description="Create polished project cards with images, links, and technology stacks.">
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              ['title', 'Project Title'],
              ['liveUrl', 'Live Demo URL'],
              ['githubUrl', 'GitHub URL'],
              ['imageUrl', 'Image URL (optional fallback)'],
            ].map(([key, label]) => (
              <label key={key}>
                <span className="mb-2 block text-sm font-medium">{label}</span>
                <input className="field" value={form[key]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} />
              </label>
            ))}
            <label>
              <span className="mb-2 block text-sm font-medium">Technologies</span>
              <input className="field" value={form.technologies} onChange={(event) => setForm((current) => ({ ...current, technologies: event.target.value }))} placeholder="React, Tailwind, Firebase" />
            </label>
            <label>
              <span className="mb-2 block text-sm font-medium">Description</span>
              <textarea className="field min-h-32" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
            </label>
            <label>
              <span className="mb-2 block text-sm font-medium">Upload Image</span>
              <input type="file" className="field" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
            </label>
            <button type="submit" className="btn-primary w-full" disabled={saving}>
              {form.id ? 'Update Project' : 'Create Project'}
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Projects Table" description="Searchable project inventory designed for mobile and desktop.">
          <input className="field mb-5" placeholder="Search projects..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <div className="grid gap-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="overflow-hidden rounded-3xl border border-border bg-white/5">
                <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                  <img src={project.imageUrl} alt={project.title} className="h-48 w-full object-cover md:h-full" />
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">{project.title}</p>
                        <p className="mt-3 text-sm leading-7 text-skin-soft">{project.description}</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="btn-secondary px-4 py-2"
                          onClick={() =>
                            setForm({
                              ...project,
                              technologies: project.technologies.join(', '),
                            })
                          }
                        >
                          Edit
                        </button>
                        <button type="button" className="btn-secondary px-4 py-2 text-red-300" onClick={() => deleteProject(project.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-border px-3 py-1 text-xs text-skin-soft">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function ContactPage() {
  const { data, updateContact, saving } = usePortfolio()
  const [form, setForm] = useState(data.profile.contact)

  const handleSubmit = async (event) => {
    event.preventDefault()
    await updateContact(form)
  }

  return (
    <SectionCard title="Contact Management" description="Update the public email address and WhatsApp link.">
      <form onSubmit={handleSubmit} className="grid gap-5 xl:max-w-2xl">
        <label>
          <span className="mb-2 block text-sm font-medium">Email</span>
          <input className="field" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium">WhatsApp URL</span>
          <input className="field" value={form.whatsapp} onChange={(event) => setForm((current) => ({ ...current, whatsapp: event.target.value }))} />
        </label>
        <button type="submit" className="btn-primary w-full sm:w-fit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Contact'}
        </button>
      </form>
    </SectionCard>
  )
}

function CvPage() {
  const { data, updateCv, saving } = usePortfolio()
  const [file, setFile] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (file) {
      await updateCv(file)
      setFile(null)
    }
  }

  return (
    <SectionCard title="CV Management" description="Upload, replace, or refresh the public CV asset.">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <label>
            <span className="mb-2 block text-sm font-medium">Current File</span>
            <div className="field flex items-center justify-between">
              <span>{data.profile.cv.fileName}</span>
              <a href={data.profile.cv.url} target="_blank" rel="noreferrer" className="text-primary">
                Open
              </a>
            </div>
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">Upload New CV</span>
            <input type="file" className="field" accept=".pdf,.doc,.docx" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
          </label>
          <button type="submit" className="btn-primary w-full sm:w-fit" disabled={!file || saving}>
            {saving ? 'Uploading...' : 'Replace CV'}
          </button>
        </form>

        <div className="rounded-3xl border border-border bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Publishing Notes</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-skin-soft">
            <li>Use Firebase Storage in production for stable public file hosting.</li>
            <li>The public website automatically reads the latest uploaded CV link.</li>
            <li>Local development stores the uploaded file inline so the CMS flow still works before Firebase is configured.</li>
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

function ThemePage() {
  const { data, updateSettings, saving } = usePortfolio()
  const [form, setForm] = useState({
    theme: data.settings.theme,
    accentColor: data.settings.accentColor,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    await updateSettings({
      ...data.settings,
      theme: form.theme,
      accentColor: form.accentColor,
    })
  }

  return (
    <SectionCard title="Theme Settings" description="Set the default experience and design direction for the public site.">
      <form onSubmit={handleSubmit} className="grid gap-5 xl:max-w-2xl">
        <label>
          <span className="mb-2 block text-sm font-medium">Default Mode</span>
          <select className="field" value={form.theme} onChange={(event) => setForm((current) => ({ ...current, theme: event.target.value }))}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium">Accent Color</span>
          <input className="field" type="color" value={form.accentColor} onChange={(event) => setForm((current) => ({ ...current, accentColor: event.target.value }))} />
        </label>
        <button type="submit" className="btn-primary w-full sm:w-fit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Theme Settings'}
        </button>
      </form>
    </SectionCard>
  )
}

function LanguagePage() {
  const { data, updateSettings, saving } = usePortfolio()
  const [language, setLanguage] = useState(data.settings.language)

  return (
    <SectionCard title="Language Settings" description="Choose the default language while keeping both translation fields editable.">
      <div className="grid gap-5 xl:max-w-2xl">
        <label>
          <span className="mb-2 block text-sm font-medium">Default Language</span>
          <select className="field" value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </label>
        <button
          type="button"
          className="btn-primary w-full sm:w-fit"
          disabled={saving}
          onClick={() => updateSettings({ ...data.settings, language })}
        >
          {saving ? 'Saving...' : 'Save Language Settings'}
        </button>
      </div>
    </SectionCard>
  )
}

function AccountPage() {
  const { user } = useAuth()

  return (
    <SectionCard title="Account Settings" description="Protected workspace access and environment status.">
      <div className="grid gap-4 xl:max-w-2xl">
        <div className="rounded-3xl border border-border bg-white/5 p-5">
          <p className="text-sm text-skin-soft">Signed in as</p>
          <p className="mt-2 text-lg font-semibold">{user?.email ?? 'Unknown user'}</p>
        </div>
        <div className="rounded-3xl border border-border bg-white/5 p-5">
          <p className="text-sm text-skin-soft">Environment</p>
          <p className="mt-2 text-lg font-semibold">Firebase-ready with local fallback mode</p>
        </div>
      </div>
    </SectionCard>
  )
}

export function AdminDashboardPage() {
  const { data, loading } = usePortfolio()

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="panel p-8 text-center">
          <p className="text-lg font-semibold">Preparing dashboard</p>
          <p className="mt-2 text-sm text-skin-soft">Loading content management modules and analytics.</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout title="Dashboard Overview" subtitle="High-level analytics, recent activity, and content operations.">
            <OverviewPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DashboardLayout title="Profile Management" subtitle="Edit your brand identity, hero, and bilingual content.">
            <ProfilePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/skills"
        element={
          <DashboardLayout title="Skills Management" subtitle="Manage dynamic skills displayed across the public website.">
            <SkillsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/services"
        element={
          <DashboardLayout title="Services Management" subtitle="Publish and maintain bilingual commercial services.">
            <ServicesPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/projects"
        element={
          <DashboardLayout title="Projects Management" subtitle="Manage project cards, assets, links, and supporting technologies.">
            <ProjectsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <DashboardLayout title="Contact Management" subtitle="Update public communication channels and call-to-action links.">
            <ContactPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/cv"
        element={
          <DashboardLayout title="CV Management" subtitle="Upload and replace downloadable resume assets.">
            <CvPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/theme"
        element={
          <DashboardLayout title="Theme Settings" subtitle="Set default visual behavior and brand presentation.">
            <ThemePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/language"
        element={
          <DashboardLayout title="Language Settings" subtitle="Control the default language and multilingual experience.">
            <LanguagePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/account"
        element={
          <DashboardLayout title="Account Settings" subtitle="Review session status and environment readiness.">
            <AccountPage />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
