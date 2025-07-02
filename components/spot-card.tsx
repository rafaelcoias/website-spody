import Image from "next/image"
import { Heart, Wifi, Printer, Coffee, Users, MapPin } from "lucide-react"
import type { StudySpot } from "@/data/dummy-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

interface SpotCardProps {
  spot: StudySpot
}

export function SpotCard({ spot }: SpotCardProps) {
  const [favorite, setFavorite] = useState(false)
  return (
    <Link href={`/spot/${spot.id}`}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative">
          <Image
            src={spot.image || "/placeholder.svg"}
            alt={spot.name || "Study Spot Image"}
            width={300}
            height={200}
            className="w-full h-32 object-cover"
          />
          <Button size="icon" variant="ghost" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFavorite(!favorite) }} className="absolute top-3 right-3 bg-white/80 hover:bg-white">
            <Heart className={`w-4 h-4 ${favorite ? "fill-red-500" : ""}`} />
          </Button>
        </div>

        <div className="p-4">
          <div className="w-full flex justify-between items-start">
            <div className="w-full">
              <h3 className="font-semibold text-lg text-secondary">{spot.name}</h3>
              <div className="flex justify-between items-center w-full">
                <p className="text-sm text-gray-600">{spot.type}</p>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{spot.capacity} lugares</span>
                </div>
              </div>
            </div>
          </div>


          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              {spot.hasWifi && <Wifi className="w-4 h-4 text-primary" />}
              {spot.hasPrinter && <Printer className="w-4 h-4 text-primary" />}
              {spot.hasCoffee && <Coffee className="w-4 h-4 text-primary" />}
              {spot?.amenities?.includes("group_study") && <Users className="w-4 h-4 text-primary" />}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex text-yellow-400">{"★".repeat(Math.floor(spot.rating))}</div>
                <span className="text-sm text-gray-600 ml-1">{spot.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
