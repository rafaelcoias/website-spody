"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Wifi, Printer, Coffee, Volume2, Clock, ArrowLeft, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function CreateSpotPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    capacity: "",
    openingHours: {
      monday: { open: "", close: "", closed: false },
      tuesday: { open: "", close: "", closed: false },
      wednesday: { open: "", close: "", closed: false },
      thursday: { open: "", close: "", closed: false },
      friday: { open: "", close: "", closed: false },
      saturday: { open: "", close: "", closed: false },
      sunday: { open: "", close: "", closed: false },
    },
    amenities: [] as string[],
    isQuiet: false,
    allowsFood: false,
    hasWifi: false,
    hasPrinter: false,
    hasCoffee: false,
    hasParking: false,
    isAccessible: false,
    requiresBooking: false,
    isPublic: true,
    image: null as File | null,
  })

  const spotTypes = [
    "Biblioteca",
    "Sala de estudo",
    "Café",
    "Coworking",
    "Espaço exterior",
    "Laboratório",
    "Auditório",
    "Sala de reuniões",
  ]

  const amenityOptions = [
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "printer", label: "Printer", icon: Printer },
    { id: "coffee", label: "Coffee/Drinks", icon: Coffee },
    { id: "quiet", label: "Quiet Zone", icon: Volume2 },
    { id: "group", label: "Group Study", icon: Users },
    { id: "24h", label: "24/7 Access", icon: Clock },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked ? [...prev.amenities, amenityId] : prev.amenities.filter((id) => id !== amenityId),
    }))
  }

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Spot data:", formData)
    router.push("/org/spots")
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
          <Link href="/org/spots">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary">Create Study Spot</h1>
            <p className="text-gray-600">Add a new study location for students to discover</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Spot Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Biblioteca Central, Café Estudante"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="type">Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select spot type" />
                  </SelectTrigger>
                  <SelectContent>
                    {spotTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the study spot..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Full address"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange("capacity", e.target.value)}
                  placeholder="Number of seats/people"
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Opening Hours
            </h2>

            <div className="space-y-3">
              {Object.entries(formData.openingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium capitalize">{day}</div>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                      disabled={hours.closed}
                      className="w-32"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                      disabled={hours.closed}
                      className="w-32"
                    />
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${day}-closed`}
                        checked={hours.closed}
                        onCheckedChange={(checked) => handleHoursChange(day, "closed", checked)}
                      />
                      <Label htmlFor={`${day}-closed`} className="text-sm">
                        Closed
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4">Amenities</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {amenityOptions.map((amenity) => {
                const Icon = amenity.icon
                return (
                  <div key={amenity.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={amenity.id}
                      checked={formData.amenities.includes(amenity.id)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                    />
                    <Label htmlFor={amenity.id} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="w-4 h-4" />
                      {amenity.label}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4">Features</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isQuiet">Quiet Environment</Label>
                  <p className="text-sm text-gray-600">Silent or low-noise area</p>
                </div>
                <Switch
                  id="isQuiet"
                  checked={formData.isQuiet}
                  onCheckedChange={(checked) => handleInputChange("isQuiet", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowsFood">Food & Drinks Allowed</Label>
                  <p className="text-sm text-gray-600">Students can bring food and drinks</p>
                </div>
                <Switch
                  id="allowsFood"
                  checked={formData.allowsFood}
                  onCheckedChange={(checked) => handleInputChange("allowsFood", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isAccessible">Wheelchair Accessible</Label>
                  <p className="text-sm text-gray-600">Accessible for people with disabilities</p>
                </div>
                <Switch
                  id="isAccessible"
                  checked={formData.isAccessible}
                  onCheckedChange={(checked) => handleInputChange("isAccessible", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requiresBooking">Requires Booking</Label>
                  <p className="text-sm text-gray-600">Students need to book in advance</p>
                </div>
                <Switch
                  id="requiresBooking"
                  checked={formData.requiresBooking}
                  onCheckedChange={(checked) => handleInputChange("requiresBooking", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isPublic">Public Listing</Label>
                  <p className="text-sm text-gray-600">Visible to all students</p>
                </div>
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                />
              </div>
            </div>
          </div>

          {/* Spot Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Spot Image
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload spot image</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </label>
              {formData.image && <p className="text-sm text-primary mt-2">Image selected: {formData.image.name}</p>}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8">
              Create Study Spot
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
