"use client"

import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

declare global {
  interface Window {
    google: any
  }
}

interface MapSearchProps {
  onPlaceSelect: (place: any) => void
  placeholder?: string
}

export function MapSearch({ onPlaceSelect, placeholder = "Search locations..." }: MapSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setIsLoaded(true)
      return
    }

    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true)
      } else {
        setTimeout(checkGoogleMaps, 100)
      }
    }

    checkGoogleMaps()
  }, [])

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return

    // Initialize autocomplete
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      bounds: new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(38.6, -9.3), // Southwest bounds of Lisbon area
        new window.google.maps.LatLng(38.8, -9.0), // Northeast bounds of Lisbon area
      ),
      componentRestrictions: { country: "pt" },
      fields: ["place_id", "geometry", "name", "formatted_address"],
    })

    // Add place changed listener
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace()
      if (place.geometry) {
        onPlaceSelect(place)
      }
    })
  }, [isLoaded, onPlaceSelect])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
      <Input ref={inputRef} placeholder={placeholder} className="pl-10 pr-4" disabled={!isLoaded} />
      {!isLoaded && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  )
}
