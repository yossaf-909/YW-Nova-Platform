import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  fetchPortfolioData,
  removeCollectionItem,
  saveCollectionItem,
  saveProject,
  updateContact,
  updateCv,
  updateProfile,
  updateSettings,
} from '../services/contentService'
import { useAppSettings } from './AppSettingsProvider'

const PortfolioContext = createContext(null)

function hexToRgbChannels(hex) {
  if (!hex?.startsWith('#')) {
    return '124 58 237'
  }

  const value = hex.replace('#', '')
  const normalized = value.length === 3 ? value.split('').map((part) => `${part}${part}`).join('') : value
  const channel = Number.parseInt(normalized, 16)

  if (Number.isNaN(channel)) {
    return '124 58 237'
  }

  const red = (channel >> 16) & 255
  const green = (channel >> 8) & 255
  const blue = channel & 255
  return `${red} ${green} ${blue}`
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const { setLanguage, setTheme } = useAppSettings()

  const syncSettings = (nextData) => {
    if (nextData?.settings?.language) {
      setLanguage(nextData.settings.language)
    }

    if (nextData?.settings?.theme) {
      setTheme(nextData.settings.theme)
    }

    document.documentElement.style.setProperty(
      '--primary',
      hexToRgbChannels(nextData?.settings?.accentColor),
    )
  }

  useEffect(() => {
    async function load() {
      try {
        const response = await fetchPortfolioData()
        setData(response)
        syncSettings(response)
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

const withSave = async (action) => {
  setSaving(true)
  setError('')

  try {
    await action()

    const updated = await fetchPortfolioData()
    setData(updated)
    syncSettings(updated)

    return true
  } catch (saveError) {
    setError(saveError.message)
    return false
  } finally {
    setSaving(false)
  }
}

  const value = useMemo(
    () => ({
      data,
      loading,
      saving,
      error,
      updateProfile: (payload) => withSave(() => updateProfile(payload)),
      updateContact: (payload) => withSave(() => updateContact(payload)),
      updateSettings: (payload) => withSave(() => updateSettings(payload)),
      updateCv: (file) => withSave(() => updateCv(file)),
      saveSkill: (payload) => withSave(() => saveCollectionItem('skills', payload)),
      deleteSkill: (id) => withSave(() => removeCollectionItem('skills', id)),
      saveService: (payload) => withSave(() => saveCollectionItem('services', payload)),
      deleteService: (id) => withSave(() => removeCollectionItem('services', id)),
      saveProject: (payload, file) => withSave(() => saveProject(payload, file)),
      deleteProject: (id) => withSave(() => removeCollectionItem('projects', id)),
      refresh: () => withSave(() => fetchPortfolioData()),
    }),
    [data, error, loading, saving],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)

  if (!context) {
    throw new Error('usePortfolio must be used inside PortfolioProvider')
  }

  return context
}
