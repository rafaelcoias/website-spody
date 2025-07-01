"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ArrowLeft,
  MapPin,
  Users,
  Heart,
  Share,
  Wifi,
  Printer,
  Coffee,
  Volume2,
  Clock,
  Star,
  Info,
  Navigation,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { studySpots } from "@/data/dummy-data"

export default function SpotDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const spot = studySpots.find((s) => s.id === params.id)

  if (!spot) {
    return (
      <div className="md:ml-64 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-2">Study Spot Not Found</h1>
          <p className="text-gray-600 mb-4">The study spot you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: spot.name,
        text: `Check out this study spot: ${spot.name}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="w-5 h-5" />
      case "printer":
        return <Printer className="w-5 h-5" />
      case "coffee":
        return <Coffee className="w-5 h-5" />
      case "quiet":
        return <Volume2 className="w-5 h-5" />
      case "24h":
        return <Clock className="w-5 h-5" />
      default:
        return <Users className="w-5 h-5" />
    }
  }

  const getAmenityLabel = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return "Wi-Fi"
      case "printer":
        return "Printer"
      case "coffee":
        return "Coffee/Drinks"
      case "quiet":
        return "Quiet Zone"
      case "24h":
        return "24/7 Access"
      case "group_study":
        return "Group Study"
      default:
        return amenity
    }
  }

  // Mock occupancy data
  const currentOccupancy = Math.floor(Math.random() * spot.capacity)
  const occupancyPercentage = (currentOccupancy / spot.capacity) * 100

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <div className="relative">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80">
          <Image src={spot.image || "/placeholder.svg"} alt={spot.name} fill className="object-cover" />
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

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{spot.rating}</span>
            </div>
          </div>
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
                      {spot.type}
                    </Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">{spot.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{spot.location.address}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:min-w-[200px]">
                    <Button
                      className={`${isBookmarked ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"} text-white`}
                      onClick={handleBookmark}
                    >
                      {isBookmarked ? "Bookmarked ✓" : "Bookmark Spot"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Occupancy Status */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Current Occupancy</h3>
                    <span className="text-sm text-gray-600">
                      {currentOccupancy}/{spot.capacity} seats
                    </span>
                  </div>
                  <Progress value={occupancyPercentage} className="h-2 mb-2" />
                  <p className="text-sm text-gray-600">
                    {occupancyPercentage < 50
                      ? "🟢 Low occupancy - Great time to study!"
                      : occupancyPercentage < 80
                        ? "🟡 Moderate occupancy - Some seats available"
                        : "🔴 High occupancy - Limited seats available"}
                  </p>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {spot.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <div className="text-primary">{getAmenityIcon(amenity)}</div>
                        <span className="text-sm">{getAmenityLabel(amenity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm font-medium">{spot.capacity}</p>
                    <p className="text-xs text-gray-600">Total Seats</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm font-medium">{spot.rating}</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Volume2 className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm font-medium">{spot.isQuiet ? "Quiet" : "Social"}</p>
                    <p className="text-xs text-gray-600">Environment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Opening Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Opening Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { day: "Monday", hours: "08:00 - 22:00" },
                      { day: "Tuesday", hours: "08:00 - 22:00" },
                      { day: "Wednesday", hours: "08:00 - 22:00" },
                      { day: "Thursday", hours: "08:00 - 22:00" },
                      { day: "Friday", hours: "08:00 - 20:00" },
                      { day: "Saturday", hours: "09:00 - 18:00" },
                      { day: "Sunday", hours: "10:00 - 18:00" },
                    ].map((schedule) => (
                      <div key={schedule.day} className="flex justify-between text-sm">
                        <span className="font-medium">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* About This Spot */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    About This Spot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      {spot.isQuiet
                        ? "A quiet study environment perfect for focused individual work and exam preparation."
                        : "A collaborative space ideal for group projects and social studying."}
                    </p>
                    <div>
                      <h4 className="font-medium mb-2">Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {spot.hasWifi ? "High-speed Wi-Fi" : "No Wi-Fi available"}</li>
                        <li>• {spot.hasPrinter ? "Printing services" : "No printing services"}</li>
                        <li>• {spot.hasCoffee ? "Coffee and snacks available" : "No food/drinks"}</li>
                        <li>• {spot.isQuiet ? "Silent study environment" : "Group discussions allowed"}</li>
                      </ul>
                    </div>
                    {spot.university && (
                      <div>
                        <h4 className="font-medium mb-1">University:</h4>
                        <p className="text-sm text-gray-600">{spot.university}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Similar Spots */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Similar Study Spots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {studySpots
                    .filter((s) => s.id !== spot.id && s.type === spot.type)
                    .slice(0, 3)
                    .map((similarSpot) => (
                      <div
                        key={similarSpot.id}
                        className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <img
                          src={similarSpot.image || "/placeholder.svg"}
                          alt={similarSpot.name}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{similarSpot.name}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{similarSpot.capacity} seats</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{similarSpot.rating}</span>
                          </div>
                        </div>
                      </div>
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
