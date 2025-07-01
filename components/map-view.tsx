"use client"
import Image from "next/image"
import { Heart, Share, Wifi, Printer, Coffee, Users, X } from "lucide-react"
import type { StudySpot, Event } from "@/data/dummy-data"
import { Button } from "@/components/ui/button"
import { GoogleMap } from "./google-map"

interface MapViewProps {
  items: (StudySpot | Event)[]
  type: "spots" | "events"
  onItemSelect: (item: any) => void
  selectedItem: any
}

export function MapView({ items, type, onItemSelect, selectedItem }: MapViewProps) {
  return (
    <div className="relative w-full h-full">
      {/* Google Map */}
      <GoogleMap items={items} type={type} onItemSelect={onItemSelect} selectedItem={selectedItem} />

      {/* Spody Logo */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
        <h1 className="text-xl font-bold text-secondary">Spody</h1>
      </div>

      {/* Selected Item Card */}
      {selectedItem && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg z-20 max-w-sm mx-auto">
          <div className="relative">
            <Image
              src={selectedItem.image || "/placeholder.svg"}
              alt={type === "spots" ? selectedItem.name : selectedItem.title}
              width={400}
              height={200}
              className="w-full h-32 object-cover rounded-t-xl"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white w-8 h-8"
              onClick={() => onItemSelect(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-4">
            {type === "spots" ? (
              <div>
                <h3 className="font-semibold text-lg text-secondary mb-1">{selectedItem.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedItem.type}</p>
                <p className="text-sm text-gray-600 mb-3">{selectedItem.capacity} lugares</p>
                <div className="flex items-center gap-2 mb-3">
                  {selectedItem.hasWifi && <Wifi className="w-4 h-4 text-primary" />}
                  {selectedItem.hasPrinter && <Printer className="w-4 h-4 text-primary" />}
                  {selectedItem.hasCoffee && <Coffee className="w-4 h-4 text-primary" />}
                  {selectedItem.amenities.includes("group_study") && <Users className="w-4 h-4 text-primary" />}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-lg text-secondary mb-1 line-clamp-2">{selectedItem.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{selectedItem.location.name}</p>
                <p className="text-sm text-gray-600 mb-1">{selectedItem.date}</p>
                <p className="text-sm text-gray-600">{selectedItem.time}</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
