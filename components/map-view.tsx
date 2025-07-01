"use client"
import Image from "next/image"
import { Heart, Share, Wifi, Printer, Coffee, Users, X, MapPin } from "lucide-react"
import type { StudySpot, Event } from "@/data/dummy-data"
import { Button } from "@/components/ui/button"
import { GoogleMap } from "./google-map"
import Link from "next/link"
import { useEffect } from "react"

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
      {selectedItem && (
        <Link href={type === "spots" ? `/spot/${selectedItem.id}` : `/spot/${selectedItem.id}`} className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg z-20 max-w-sm mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="relative">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                <Heart className={`w-4 h-4`} />
              </Button>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-secondary">{selectedItem.name}</h3>
                  <p className="text-sm text-gray-600">{selectedItem.type}</p>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{selectedItem.capacity} lugares</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {selectedItem.hasWifi && <Wifi className="w-4 h-4 text-primary" />}
                {selectedItem.hasPrinter && <Printer className="w-4 h-4 text-primary" />}
                {selectedItem.hasCoffee && <Coffee className="w-4 h-4 text-primary" />}
                {selectedItem.amenities.includes("group_study") && <Users className="w-4 h-4 text-primary" />}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">{"★".repeat(Math.floor(selectedItem.rating))}</div>
                  <span className="text-sm text-gray-600 ml-1">{selectedItem.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}
