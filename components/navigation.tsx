"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Map, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-context"
import { OrganizationNavigation } from "./organization-navigation"
import Image from "next/image"

const navItems = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/map", label: "Map", icon: Map },
  { href: "/profile", label: "Profile", icon: User },
]

export function Navigation() {
  const pathname = usePathname()
  const { user, isOrganization } = useUser()

  // Don't show navigation on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return null
  }

  // Show organization navigation for organization users
  if (isOrganization) {
    return <OrganizationNavigation />
  }

  return (
    <>
      {/* Desktop Navigation - Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex-col p-6">
        <div className="mb-8">
          <Link href="/"><Image src="/logo.png" alt="Spody Logo" width={2000} height={2000} className="h-12 w-auto" /></Link>
          <p className="text-sm text-gray-600 mt-1">Your student companion</p>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-[999]">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "text-primary" : "text-gray-500",
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
