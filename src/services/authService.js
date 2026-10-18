import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, isConfigured } from '../lib/firebase'

const DEMO_USER = {
  uid: 'demo-admin',
  email: 'admin@ywnova.dev',
  displayName: 'YW Nova Admin',
}

const DEMO_PASSWORD = 'NovaAdmin123!'
const AUTH_STORAGE_KEY = 'yw-nova-auth'

export async function loginWithEmail(email, password) {
  if (!isConfigured || !auth) {
    if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_USER))
      return DEMO_USER
    }

    throw new Error('Invalid email or password.')
  }

  await setPersistence(auth, browserLocalPersistence)
  const credentials = await signInWithEmailAndPassword(auth, email, password)
  return credentials.user
}

export function subscribeToAuth(callback) {
  if (!isConfigured || !auth) {
    const rawUser = window.localStorage.getItem(AUTH_STORAGE_KEY)
    callback(rawUser ? JSON.parse(rawUser) : null)
    return () => {}
  }

  return onAuthStateChanged(auth, callback)
}

export async function logoutUser() {
  if (!isConfigured || !auth) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return
  }

  await signOut(auth)
}

export const demoCredentials = {
  email: DEMO_USER.email,
  password: DEMO_PASSWORD,
}
