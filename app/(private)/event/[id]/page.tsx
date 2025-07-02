"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Heart, Share, ExternalLink, User, Tag, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { events } from "@/data/dummy-data"
import Link from "next/link"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isRegistered, setIsRegistered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const event = events.find((e) => e.id === params.id)

  if (!event) {
    return (
      <div className="md:ml-64 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const handleRegister = () => {
    setIsRegistered(!isRegistered)
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <div className="relative">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />

          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 bg-white/80 hover:bg-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" onClick={handleFavorite}>
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" onClick={handleShare}>
              <Share className="w-5 h-5" />
            </Button>
          </div>

          {/* Hot Badge */}
          {event.isHot && <Badge className="absolute bottom-4 left-4 bg-blue-600 text-white">HOT</Badge>}
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 -mt-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Info Card */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2">
                      {event.category}
                    </Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">{event.title}</h1>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                  </div>

                  <div className="flex flex-col gap-2 md:min-w-[200px]">
                    <Button
                      className={`${isRegistered ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"} text-white`}
                      onClick={handleRegister}
                    >
                      {isRegistered ? "Registered ✓" : "Register for Event"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${event.location.coordinates.lat},${event.location.coordinates.lng}`,
                        "_blank"
                      )
                    }>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Event Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">{event.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{event.location.name}</p>
                        <p className="text-sm text-gray-500">{event.location.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Organizer</p>
                        <p className="text-gray-600">{event.organizer}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Category</p>
                        <p className="text-gray-600">{event.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Expected Attendance</p>
                        <p className="text-gray-600">50-100 people</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* About This Event */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    About This Event
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      This event is perfect for students looking to expand their knowledge and network with like-minded
                      individuals.
                    </p>
                    <div>
                      <h4 className="font-medium mb-2">What to expect:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Interactive presentations</li>
                        <li>• Networking opportunities</li>
                        <li>• Q&A sessions</li>
                        <li>• Light refreshments</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">What to bring:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Student ID</li>
                        <li>• Notebook and pen</li>
                        <li>• Business cards (optional)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">{event.location.name}</h4>
                      <p className="text-gray-600">{event.location.address}</p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-2">Getting There:</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>🚇 Metro: Blue Line - Oriente Station</p>
                        <p>🚌 Bus: Lines 5, 25, 44, 708, 750, 759</p>
                        <p>🚗 Parking: Available on-site</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent" onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${event.location.coordinates.lat},${event.location.coordinates.lng}`,
                        "_blank"
                      )
                    }>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Maps
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Similar Events */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Similar Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {events
                    .filter((e) => e.id !== event.id && e.category === event.category)
                    .slice(0, 3)
                    .map((similarEvent) => (
                      <Link
                        href={`/event/${similarEvent.id}`}
                        key={similarEvent.id}
                        className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <img
                          src={similarEvent.image || "/placeholder.svg"}
                          alt={similarEvent.title}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{similarEvent.title}</h4>
                        <p className="text-xs text-gray-600">{similarEvent.date}</p>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
