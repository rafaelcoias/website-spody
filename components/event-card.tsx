import Image from "next/image"
import { Heart, Share, MapPin, Calendar, Clock } from "lucide-react"
import type { Event } from "@/data/dummy-data"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {event.isHot && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            HOT
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white w-8 h-8">
            <Share className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white w-8 h-8">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-secondary mb-2 line-clamp-2">{event.title}</h3>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{event.location.name}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{event.date}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{event.time}</span>
        </div>
      </div>
    </div>
  )
}
