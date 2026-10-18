import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AppSettingsContext = createContext(null)

export function AppSettingsProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.lang = language
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language, theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
      direction: language === 'ar' ? 'rtl' : 'ltr',
      isArabic: language === 'ar',
    }),
    [language, theme],
  )

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext)

  if (!context) {
    throw new Error('useAppSettings must be used inside AppSettingsProvider')
  }

  return context
}
