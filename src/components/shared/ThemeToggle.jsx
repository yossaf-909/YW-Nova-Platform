import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useAppSettings } from '../../providers/AppSettingsProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useAppSettings()

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="btn-secondary gap-2 px-4 py-2"
    >
      {theme === 'dark' ? <HiOutlineSun className="text-base" /> : <HiOutlineMoon className="text-base" />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}
