"use client"
import Image from "next/image"
import { MapPin, Heart, Share, Wifi, Printer, Coffee, Users, X } from "lucide-react"
import type { StudySpot, Event } from "@/data/dummy-data"
import { Button } from "@/components/ui/button"

interface MapViewProps {
  items: (StudySpot | Event)[]
  type: "spots" | "events"
  onItemSelect: (item: any) => void
  selectedItem: any
}

export function MapView({ items, type, onItemSelect, selectedItem }: MapViewProps) {
  // Simulate map pins with absolute positioning
  const mapPins = [
    { id: "1", x: "20%", y: "30%", color: "bg-primary" },
    { id: "2", x: "60%", y: "20%", color: "bg-primary" },
    { id: "3", x: "40%", y: "50%", color: "bg-primary" },
    { id: "4", x: "70%", y: "60%", color: "bg-primary" },
    { id: "5", x: "30%", y: "70%", color: "bg-primary" },
    { id: "6", x: "80%", y: "40%", color: "bg-primary" },
  ]

  return (
    <div className="relative w-full h-full bg-gray-200">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,20 Q25,10 50,20 T100,15 L100,100 L0,100 Z" fill="#e5e7eb" />
            <path d="M0,40 Q30,30 60,40 T100,35 L100,100 L0,100 Z" fill="#d1d5db" />
          </svg>
        </div>
      </div>

      {/* Map Pins */}
      {mapPins.slice(0, items.length).map((pin, index) => (
        <button
          key={pin.id}
          className={`absolute w-8 h-8 ${pin.color} rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform z-10`}
          style={{ left: pin.x, top: pin.y }}
          onClick={() => onItemSelect(items[index])}
        >
          <MapPin className="w-5 h-5 text-white mx-auto" />
        </button>
      ))}

      {/* Spody Logo */}
      <div className="absolute top-4 left-4 z-20">
        <h1 className="text-2xl font-bold text-secondary">Spody</h1>
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
