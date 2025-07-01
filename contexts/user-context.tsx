"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export type UserRole = "student" | "organization"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  university?: string
  degree?: string
  organizationName?: string
  organizationType?: string
  avatar?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isOrganization: boolean
  isStudent: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Student Association Lisboa",
    email: "admin@studentassociation.pt",
    role: "student",
    organizationName: "Student Association Lisboa",
    organizationType: "University Association",
  })

  const isOrganization = user?.role === "organization"
  const isStudent = user?.role === "student"

  return <UserContext.Provider value={{ user, setUser, isOrganization, isStudent }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
