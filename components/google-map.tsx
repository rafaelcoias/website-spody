"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { MapControls } from "./map-controls"
import type { StudySpot, Event } from "@/data/dummy-data"

declare global {
  interface Window {
    google: any
  }
}

interface GoogleMapProps {
  items: (StudySpot | Event)[]
  type: "spots" | "events"
  onItemSelect: (item: any) => void
  selectedItem: any
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ items, type, onItemSelect, selectedItem }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // API key - you can move this to environment variables later
  const API_KEY = "AIzaSyCeLuD8_iCdgt_zePMxrlqiVDpwkCsE-RQ"

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true)
        initMap()
        return
      }

      if (document.getElementById("google-maps-script")) {
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.id = "google-maps-script"
      document.head.appendChild(script)

      script.onload = () => {
        setIsLoaded(true)
        initMap()
      }

      script.onerror = () => {
        console.error("Failed to load Google Maps script")
      }
    }

    const initMap = () => {
      if (mapRef.current && !mapInstanceRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 38.7223, lng: -9.1393 }, // Lisbon center
          zoom: 13,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        })

        mapInstanceRef.current = map
        createMarkers()
      }
    }

    loadGoogleMapsScript()
  }, [])

  // Create markers when items change
  useEffect(() => {
    if (isLoaded && mapInstanceRef.current) {
      createMarkers()
    }
  }, [items, type, isLoaded])

  const createMarkers = () => {
    if (!mapInstanceRef.current || !window.google) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // Create new markers
    items.forEach((item, index) => {
      const position = {
        lat: item.location.coordinates.lat,
        lng: item.location.coordinates.lng,
      }

      const marker = new window.google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#fea46b", // Primary color
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
        title: type === "spots"
          ? (item as StudySpot).name
          : (item as Event).title,
        animation: window.google.maps.Animation.DROP,
      })

      // Add click listener
      marker.addListener("click", () => {
        onItemSelect(item)

        // Animate marker
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => {
          marker.setAnimation(null)
        }, 1400)

        // Center map on marker
        mapInstanceRef.current.panTo(position)
      })

      markersRef.current.push(marker)
    })
  }

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom() || 13
      mapInstanceRef.current.setZoom(currentZoom + 1)
    }
  }

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom() || 13
      mapInstanceRef.current.setZoom(Math.max(currentZoom - 1, 1))
    }
  }

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat: 38.7223, lng: -9.1393 })
      mapInstanceRef.current.setZoom(13)
      onItemSelect(null)
    }
  }

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(userLocation)
            mapInstanceRef.current.setZoom(15)

            // Add user location marker
            new window.google.maps.Marker({
              position: userLocation,
              map: mapInstanceRef.current,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#4285f4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
              title: "Your Location",
            })
          }
        },
        (error) => {
          console.error("Error getting user location:", error)
          alert("Unable to get your location. Please check your browser settings.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {isLoaded && (
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
          onLocateUser={handleLocateUser}
        />
      )}
    </div>
  )
}
