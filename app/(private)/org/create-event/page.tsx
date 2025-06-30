"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Users, ImageIcon, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function CreateEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    locationName: "",
    locationAddress: "",
    maxAttendees: "",
    isPublic: true,
    requiresRegistration: false,
    image: null as File | null,
  })

  const categories = [
    "Academic",
    "Social",
    "Career",
    "Tech",
    "Creative",
    "Sports",
    "Cultural",
    "Wellness",
    "Business",
    "Study",
  ]

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Event data:", formData)
    // Simulate success and redirect
    router.push("/org/events")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("image", file)
    }
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/org/events">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary">Create Event</h1>
            <p className="text-gray-600">Create a new event for students to discover and join</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter event title"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your event..."
                  rows={4}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Date & Time
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="locationName">Venue Name *</Label>
                <Input
                  id="locationName"
                  value={formData.locationName}
                  onChange={(e) => handleInputChange("locationName", e.target.value)}
                  placeholder="e.g., Altice Arena, IST Alameda"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="locationAddress">Address *</Label>
                <Input
                  id="locationAddress"
                  value={formData.locationAddress}
                  onChange={(e) => handleInputChange("locationAddress", e.target.value)}
                  placeholder="Full address"
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Event Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Event Settings
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
                  placeholder="Leave empty for unlimited"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isPublic">Public Event</Label>
                  <p className="text-sm text-gray-600">Anyone can see and join this event</p>
                </div>
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requiresRegistration">Requires Registration</Label>
                  <p className="text-sm text-gray-600">Students must register to attend</p>
                </div>
                <Switch
                  id="requiresRegistration"
                  checked={formData.requiresRegistration}
                  onCheckedChange={(checked) => handleInputChange("requiresRegistration", checked)}
                />
              </div>
            </div>
          </div>

          {/* Event Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Event Image
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload event image</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </label>
              {formData.image && <p className="text-sm text-primary mt-2">Image selected: {formData.image.name}</p>}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8">
              Create Event
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
