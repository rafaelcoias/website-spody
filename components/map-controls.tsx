"use client"

import { RotateCcw, Plus, Minus, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
  onLocateUser: () => void
}

export function MapControls({ onZoomIn, onZoomOut, onResetView, onLocateUser }: MapControlsProps) {
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-2">
      <Button
        size="icon"
        variant="outline"
        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        onClick={onZoomIn}
        title="Zoom In"
      >
        <Plus className="w-4 h-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        onClick={onZoomOut}
        title="Zoom Out"
      >
        <Minus className="w-4 h-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        onClick={onResetView}
        title="Reset View"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        onClick={onLocateUser}
        title="My Location"
      >
        <Navigation className="w-4 h-4" />
      </Button>
    </div>
  )
}
