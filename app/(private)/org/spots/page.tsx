"use client"

import { useState } from "react"
import { Plus, Search, MapPin, Users, Wifi, Printer, Coffee, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function OrganizationSpotsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const spots = [
    {
      id: "1",
      name: "Biblioteca Central",
      type: "Biblioteca",
      capacity: 300,
      address: "Campo Grande 016, 1749-016 Lisboa",
      amenities: ["wifi", "quiet", "books", "printer"],
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      views: 234,
      favorites: 45,
      isActive: true,
    },
    {
      id: "2",
      name: "Café Estudante",
      type: "Café",
      capacity: 50,
      address: "Rua da Escola Politécnica 58, 1250-102 Lisboa",
      amenities: ["wifi", "coffee", "food", "social"],
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.0,
      views: 189,
      favorites: 32,
      isActive: true,
    },
    {
      id: "3",
      name: "Sala Silenciosa IST",
      type: "Sala de estudo",
      capacity: 80,
      address: "Av. Rovisco Pais 1, 1049-001 Lisboa",
      amenities: ["wifi", "quiet", "individual"],
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      views: 156,
      favorites: 28,
      isActive: true,
    },
    {
      id: "4",
      name: "Coworking Príncipe Real",
      type: "Coworking",
      capacity: 120,
      address: "Praça do Príncipe Real 26, 1250-184 Lisboa",
      amenities: ["wifi", "coffee", "printer", "meeting_rooms"],
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.3,
      views: 98,
      favorites: 19,
      isActive: false,
    },
  ]

  const filteredSpots = spots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "printer":
        return <Printer className="w-4 h-4" />
      case "coffee":
        return <Coffee className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Study Spots</h1>
            <p className="text-gray-600">Manage your organization's study locations</p>
          </div>
          <Link href="/org/create-spot">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Study Spot
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search study spots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Spots Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSpots.map((spot) => (
            <Card key={spot.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={spot.image || "/placeholder.svg"} alt={spot.name} className="w-full h-48 object-cover" />
                <Badge
                  className={`absolute top-3 left-3 ${
                    spot.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {spot.isActive ? "Active" : "Inactive"}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Spot
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Spot
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {spot.type}
                  </Badge>
                </div>

                <h3 className="font-semibold text-lg text-secondary mb-2">{spot.name}</h3>

                <div className="space-y-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{spot.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{spot.capacity} lugares</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {spot.amenities.slice(0, 3).map((amenity) => (
                    <div key={amenity} className="text-primary">
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                  {spot.amenities.length > 3 && (
                    <span className="text-xs text-gray-500">+{spot.amenities.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">{spot.views} views</span>
                    <span className="text-gray-600">{spot.favorites} favorites</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-600">{spot.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSpots.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No study spots found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Try adjusting your search" : "Get started by adding your first study spot"}
            </p>
            {!searchQuery && (
              <Link href="/org/create-spot">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Study Spot
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
