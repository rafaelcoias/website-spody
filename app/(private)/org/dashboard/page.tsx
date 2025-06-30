"use client"

import { Calendar, MapPin, Users, Eye, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrganizationDashboard() {
  const stats = [
    {
      title: "Total Events",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Study Spots",
      value: "8",
      change: "+3",
      trend: "up",
      icon: MapPin,
      color: "text-green-600",
    },
    {
      title: "Total Views",
      value: "2,847",
      change: "+18%",
      trend: "up",
      icon: Eye,
      color: "text-purple-600",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-primary",
    },
  ]

  const recentEvents = [
    {
      id: "1",
      title: "Tech Talk: AI in Education",
      date: "25 Oct 2022",
      attendees: 45,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Career Fair 2022",
      date: "28 Oct 2022",
      attendees: 120,
      status: "upcoming",
    },
    {
      id: "3",
      title: "Study Group: Mathematics",
      date: "26 Oct 2022",
      attendees: 15,
      status: "ongoing",
    },
  ]

  const topSpots = [
    {
      id: "1",
      name: "Biblioteca Central",
      views: 234,
      favorites: 45,
      rating: 4.7,
    },
    {
      id: "2",
      name: "Café Estudante",
      views: 189,
      favorites: 32,
      rating: 4.2,
    },
    {
      id: "3",
      name: "Sala Silenciosa IST",
      views: 156,
      favorites: 28,
      rating: 4.8,
    },
  ]

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your organization.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                      <p className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Events</CardTitle>
              <Link href="/org/events">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-secondary">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <p className="text-sm text-gray-600">{event.attendees} attendees</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : event.status === "ongoing"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Study Spots */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Top Study Spots</CardTitle>
              <Link href="/org/spots">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSpots.map((spot, index) => (
                  <div key={spot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary">{spot.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {spot.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {spot.favorites}
                          </span>
                          <span>★ {spot.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-secondary mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/org/create-event">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary">Create New Event</h3>
                      <p className="text-sm text-gray-600">Add a new event for students to discover</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/org/create-spot">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary">Add Study Spot</h3>
                      <p className="text-sm text-gray-600">Register a new study location</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
