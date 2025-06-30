"use client"

import { Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const user = {
    name: "João Silva",
    email: "joao.silva@student.ul.pt",
    university: "Universidade de Lisboa",
    degree: "Computer Science",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-primary text-white text-xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-secondary mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-1">{user.email}</p>
              <p className="text-gray-600">{user.university}</p>
              {user.degree && <p className="text-sm text-gray-500 mt-1">{user.degree}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start h-14 text-left border-2 hover:border-primary hover:text-primary"
          >
            <Info className="w-5 h-5 mr-3" />
            <div>
              <div className="font-medium">Personal Information</div>
              <div className="text-sm text-gray-500">Update your profile details and preferences</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-14 text-left border-2 hover:border-primary hover:text-primary"
          >
            <Settings className="w-5 h-5 mr-3" />
            <div>
              <div className="font-medium">Account Settings</div>
              <div className="text-sm text-gray-500">Manage your account security and notifications</div>
            </div>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-gray-600">Favorite Spots</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-gray-600">Events Attended</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">45</div>
            <div className="text-sm text-gray-600">Study Hours</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-sm text-gray-600">Study Buddies</div>
          </div>
        </div>
      </div>
    </div>
  )
}
