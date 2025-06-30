"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  type: "spots" | "events"
}

export function FilterModal({ isOpen, onClose, type }: FilterModalProps) {
  const [filters, setFilters] = useState({
    search: "",
    categories: [] as string[],
    location: "all",
    studyMates: false,
  })

  if (!isOpen) return null

  const spotCategories = ["bibliotecas", "silêncio", "baixa", "study"]
  const eventCategories = ["Social", "Academic", "Career", "Tech", "Creative"]
  const categories = type === "spots" ? spotCategories : eventCategories

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-md md:rounded-lg max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Pesquisa"
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="mt-1"
            />
          </div>

          {/* Categories */}
          <div>
            <Label className="text-base font-medium">{type === "spots" ? "Tipos" : "Categories"}</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    filters.categories.includes(category)
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <Label className="text-base font-medium">Localização</Label>
            <div className="flex gap-2 mt-2">
              {["baixa", "média", "alta"].map((location) => (
                <button
                  key={location}
                  onClick={() => setFilters((prev) => ({ ...prev, location }))}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    filters.location === location
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Study Mates Toggle */}
          {type === "spots" && (
            <div className="flex items-center justify-between">
              <Label htmlFor="study-mates" className="text-base font-medium">
                Study Mates
              </Label>
              <Switch
                id="study-mates"
                checked={filters.studyMates}
                onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, studyMates: checked }))}
              />
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
