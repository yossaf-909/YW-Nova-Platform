import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiLockClosed, HiSparkles } from 'react-icons/hi2'
import { LanguageSwitcher } from '../../components/shared/LanguageSwitcher'
import { ThemeToggle } from '../../components/shared/ThemeToggle'
import { useAuth } from '../../providers/AuthProvider'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, demoCredentials } = useAuth()
  const [form, setForm] = useState({
    email: demoCredentials.email,
    password: demoCredentials.password,
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await login(form.email, form.password)
      navigate(location.state?.from?.pathname ?? '/admin', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="section-shell flex min-h-screen items-center py-10">
      <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="panel overflow-hidden p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                <HiLockClosed className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-skin-soft">Secure Access</p>
                <h1 className="text-2xl font-bold">YW Nova Admin</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <input
                type="email"
                className="field"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Password</span>
              <input
                type="password"
                className="field"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </label>

            {error ? <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-red-300">{error}</p> : null}

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
              {submitting ? 'Signing in...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>

        <div className="panel relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm text-secondary">
              <HiSparkles />
              Premium admin experience
            </div>
            <h2 className="mt-6 text-4xl font-bold tracking-tight">Control your entire portfolio platform without editing code.</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-skin-soft">
              Manage multilingual content, projects, contact links, resume uploads, settings, and activity history from one SaaS-style control center.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['Profile CMS', 'Edit hero copy, roles, brand, and about text.'],
                ['Project Ops', 'Upload images and publish commercial-grade case studies.'],
                ['Theme Settings', 'Switch default mode and global visual preferences.'],
                ['Activity Logs', 'Track recent edits across the whole platform.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-border bg-white/5 p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-skin-soft">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/10 p-5">
              <p className="text-sm font-medium text-primary">Demo mode credentials</p>
              <p className="mt-2 text-sm text-skin-soft">Use these when Firebase Auth is not configured yet.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-950/60 px-4 py-3 text-sm">
                  <span className="block text-skin-soft">Email</span>
                  <span className="mt-1 block font-semibold">{demoCredentials.email}</span>
                </div>
                <div className="rounded-2xl bg-slate-950/60 px-4 py-3 text-sm">
                  <span className="block text-skin-soft">Password</span>
                  <span className="mt-1 block font-semibold">{demoCredentials.password}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
