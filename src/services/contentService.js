import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'

import { defaultPortfolioData } from '../data/defaultContent'
import { db, isConfigured } from '../lib/firebase'
import { uploadAsset } from './storageHelpers'

const STORAGE_KEY = 'yw-nova-platform'

let cache = null

function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaultPortfolioData))
}

function getLocalData() {
  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    const seed = cloneDefaults()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return seed
  }

  return JSON.parse(raw)
}

function setLocalData(data) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  return data
}

function addLocalActivity(data, action, section) {
  if (!data.activityLogs) data.activityLogs = []

  data.activityLogs.unshift({
    id: `activity-${Date.now()}`,
    action,
    actor: 'Admin',
    section,
    createdAt: new Date().toISOString(),
  })
}

async function logActivity(action, section) {
  if (!isConfigured || !db) return

  await addDoc(collection(db, 'activityLogs'), {
    action,
    actor: 'Admin',
    section,
    createdAt: serverTimestamp(),
  })
}

async function readCollection(name) {
  const snapshot = await getDocs(query(collection(db, name)))

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) ?? []
}

async function readActivityLogs() {
  const snapshot = await getDocs(
    query(collection(db, 'activityLogs'), orderBy('createdAt', 'desc')),
  )

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
    createdAt:
      item.data().createdAt?.toDate?.()?.toISOString?.() ??
      new Date().toISOString(),
  })) ?? []
}

export async function fetchPortfolioData(force = false) {
  if (cache && !force) {
    ache = null
}

  if (!isConfigured || !db) {
    cache = getLocalData()
    return cache
  }

  const profileDoc = await getDoc(doc(db, 'profile', 'main'))
  const profileData = profileDoc.exists()
    ? profileDoc.data()
    : cloneDefaults().profile

  const settings = profileData.settings ?? cloneDefaults().settings

  cache = {
    profile: {
      ...cloneDefaults().profile,
      ...profileData,
    },
    settings,
    skills: (await readCollection('skills')) ?? [],
    services: (await readCollection('services')) ?? [],
    projects: (await readCollection('projects')) ?? [],
    activityLogs: (await readActivityLogs()) ?? [],
  }

  return cache
}

export async function updateProfile(payload) {
  if (!isConfigured || !db) {
    const data = getLocalData()

    data.profile = {
      ...data.profile,
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    addLocalActivity(data, 'Updated profile content', 'Profile')
    cache = setLocalData(data)
    return cache
  }

  await setDoc(
    doc(db, 'profile', 'main'),
    { ...payload, updatedAt: serverTimestamp() },
    { merge: true },
  )

  await logActivity('Updated profile content', 'Profile')
  return fetchPortfolioData(true)
}

export async function updateSettings(payload) {
  if (!isConfigured || !db) {
    const data = getLocalData()

    data.settings = {
      ...data.settings,
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    addLocalActivity(data, 'Changed website settings', 'Settings')
    cache = setLocalData(data)
    return cache
  }

  await setDoc(
    doc(db, 'profile', 'main'),
    {
      settings: {
        ...payload,
        updatedAt: new Date().toISOString(),
      },
    },
    { merge: true },
  )

  await logActivity('Changed website settings', 'Settings')
  return fetchPortfolioData(true)
}

export async function updateContact(payload) {
  return updateProfile({ contact: payload })
}

export async function updateCv(file) {
  const uploaded = await uploadAsset(file, 'cv')

  if (!uploaded) return fetchPortfolioData(true)

  return updateProfile({ cv: uploaded })
}

export async function saveCollectionItem(collectionName, payload) {
  if (!isConfigured || !db) {
    const data = getLocalData()

    const current = data[collectionName] || []

    const id = payload.id ?? `${collectionName}-${Date.now()}`

    const item = {
      ...payload,
      id,
      updatedAt: new Date().toISOString(),
    }

    const index = current.findIndex((entry) => entry.id === id)

    if (index >= 0) {
      current[index] = item
    } else {
      current.unshift(item)
    }

    addLocalActivity(
      data,
      `${index >= 0 ? 'Updated' : 'Created'} ${collectionName.slice(0, -1)}`,
      collectionName,
    )

    cache = setLocalData(data)
    return cache
  }

  const id = payload.id ?? `${collectionName}-${Date.now()}`

  await setDoc(
    doc(db, collectionName, id),
    { ...payload, id, updatedAt: new Date().toISOString() },
    { merge: true },
  )

  await logActivity(
    `${payload.id ? 'Updated' : 'Created'} ${collectionName.slice(0, -1)}`,
    collectionName,
  )

  return fetchPortfolioData(true)
}

export async function removeCollectionItem(collectionName, id) {
  if (!isConfigured || !db) {
    const data = getLocalData()

    data[collectionName] = (data[collectionName] || []).filter(
      (entry) => entry.id !== id,
    )

    addLocalActivity(data, `Deleted ${collectionName.slice(0, -1)}`, collectionName)

    cache = setLocalData(data)
    return cache
  }

  await deleteDoc(doc(db, collectionName, id))

  await logActivity(`Deleted ${collectionName.slice(0, -1)}`, collectionName)

  return fetchPortfolioData(true)
}

export async function saveProject(project, imageFile) {
  const uploadedImage = imageFile
    ? await uploadAsset(imageFile, 'projects')
    : null

  const payload = {
    ...project,
    imageUrl: uploadedImage?.url ?? project.imageUrl,
  }

  return saveCollectionItem('projects', payload)
}