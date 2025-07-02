"use client"
import Image from "next/image"
import { Heart, Share, Wifi, Printer, Coffee, Users, X, MapPin } from "lucide-react"
import type { StudySpot, Event } from "@/data/dummy-data"
import { Button } from "@/components/ui/button"
import { GoogleMap } from "./google-map"
import Link from "next/link"
import { useEffect } from "react"
import { SpotCard } from "./spot-card"
import { EventCard } from "./event-card"

interface MapViewProps {
  items: (StudySpot | Event)[]
  type: "spots" | "events"
  onItemSelect: (item: any) => void
  selectedItem: any
}

export function MapView({ items, type, onItemSelect, selectedItem }: MapViewProps) {

  useEffect(() => {
    window.scrollTo(100000, 10000)
  }, [selectedItem]);

  return (
    <div className="relative w-full h-full">
      {/* Google Map */}
      <GoogleMap items={items} type={type} onItemSelect={onItemSelect} selectedItem={selectedItem} />

      {/* Selected Item Card */}
      {selectedItem &&
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg z-20 max-w-sm mx-auto">
          <div className="absolute top-1 left-14 z-[99]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={(e) => {e.preventDefault(); onItemSelect(null)}}
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
          {
            type === "spots" ?
              <SpotCard spot={selectedItem} />
              :
              <EventCard event={selectedItem} />
          }
        </div>
      }
    </div>
  )
}
