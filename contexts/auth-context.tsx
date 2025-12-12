"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: "select_account",
    })
    await signInWithPopup(auth, provider)
  }

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider()
    provider.setCustomParameters({
      allow_signup: "true",
    })
    await signInWithPopup(auth, provider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
