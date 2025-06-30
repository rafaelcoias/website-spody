"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { studySpots, events } from "@/data/dummy-data"
import { FilterModal } from "@/components/filter-modal"
import { SpotCard } from "@/components/spot-card"
import { EventCard } from "@/components/event-card"

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<"spots" | "events">("spots")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredSpots = studySpots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Explore</h1>
          <p className="text-gray-600">Find the perfect study spot and discover amazing campus events</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-200 rounded-lg p-1 mb-6 max-w-xs">
          <button
            onClick={() => setActiveTab("spots")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "spots" ? "bg-primary text-white" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Study Spots
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "events" ? "bg-primary text-white" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Events
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={`Search ${activeTab === "spots" ? "study spots" : "events"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(true)}
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeTab === "spots"
            ? filteredSpots.map((spot) => <SpotCard key={spot.id} spot={spot} />)
            : filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}
        </div>

        {/* Filter Modal */}
        <FilterModal isOpen={showFilters} onClose={() => setShowFilters(false)} type={activeTab} />
      </div>
    </div>
  )
}
