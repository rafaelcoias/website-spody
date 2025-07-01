"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { studySpots, events } from "@/data/dummy-data"
import { FilterModal } from "@/components/filter-modal"
import { MapView } from "@/components/map-view"
import { MapSearch } from "@/components/map-search"

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<"spots" | "events">("spots")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  return (
    <div className="md:ml-64 h-screen bg-gray-50 flex flex-col">
      <div className="p-4 md:p-6 bg-white border-b">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Map</h1>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-200 rounded-lg p-1 mb-4 max-w-xs">
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
        <div className="flex gap-3">
          <div className="flex-1">
            <MapSearch
              placeholder="Search locations in Lisbon..."
              onPlaceSelect={(place) => {
                console.log("Selected place:", place)
                // You can add logic here to center the map on the selected place
              }}
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
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapView
          items={activeTab === "spots" ? studySpots : events}
          type={activeTab}
          onItemSelect={setSelectedItem}
          selectedItem={selectedItem}
        />
      </div>

      {/* Filter Modal */}
      <FilterModal isOpen={showFilters} onClose={() => setShowFilters(false)} type={activeTab} />
    </div>
  )
}
