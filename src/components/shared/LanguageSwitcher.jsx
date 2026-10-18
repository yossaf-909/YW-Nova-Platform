import { useAppSettings } from '../../providers/AppSettingsProvider'

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppSettings()

  return (
    <div className="inline-flex rounded-2xl border border-border bg-white/5 p-1">
      {['en', 'ar'].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
            language === item ? 'bg-white text-slate-900' : 'text-skin-soft'
          }`}
        >
          {item === 'en' ? 'EN' : 'AR'}
        </button>
      ))}
    </div>
  )
}
