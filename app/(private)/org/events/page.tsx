"use client"

import { useState } from "react"
import { Plus, Search, Calendar, Users, MapPin, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function OrganizationEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const events = [
    {
      id: "1",
      title: "Tech Talk: AI in Education",
      description: "Discover how artificial intelligence is transforming education.",
      date: "25 Oct 2022",
      time: "18:00 - 20:30",
      location: "IST Alameda",
      attendees: 45,
      maxAttendees: 100,
      status: "upcoming",
      category: "Academic",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Career Fair 2022",
      description: "Meet top employers and discover internship opportunities.",
      date: "28 Oct 2022",
      time: "09:00 - 17:00",
      location: "Pavilhão Carlos Lopes",
      attendees: 120,
      maxAttendees: 200,
      status: "upcoming",
      category: "Career",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Study Group: Mathematics",
      description: "Weekly mathematics study group for engineering students.",
      date: "26 Oct 2022",
      time: "14:00 - 16:00",
      location: "Biblioteca IST",
      attendees: 15,
      maxAttendees: 25,
      status: "ongoing",
      category: "Study",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Portuguese Language Exchange",
      description: "Practice Portuguese with native speakers.",
      date: "20 Oct 2022",
      time: "19:00 - 21:00",
      location: "Café Central",
      attendees: 32,
      maxAttendees: 40,
      status: "completed",
      category: "Social",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || event.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Events</h1>
            <p className="text-gray-600">Manage your organization's events</p>
          </div>
          <Link href="/org/create-event">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "upcoming", "ongoing", "completed"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? "bg-primary hover:bg-primary/90" : ""}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                <Badge className={`absolute top-3 left-3 ${getStatusColor(event.status)}`}>{event.status}</Badge>
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
                      Edit Event
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {event.category}
                  </Badge>
                </div>

                <h3 className="font-semibold text-lg text-secondary mb-2 line-clamp-2">{event.title}</h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {Math.round((event.attendees / event.maxAttendees) * 100)}% full
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first event"}
            </p>
            {!searchQuery && filterStatus === "all" && (
              <Link href="/org/create-event">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
