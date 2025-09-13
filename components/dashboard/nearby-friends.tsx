"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const nearbyUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    distance: "0.2 km",
    carbonScore: 820,
    goal: "Reduce AC usage",
    status: "online",
  },
  {
    id: 2,
    name: "Raj Patel",
    distance: "0.5 km",
    carbonScore: 695,
    goal: "Solar energy adoption",
    status: "offline",
  },
  {
    id: 3,
    name: "Anita Singh",
    distance: "0.8 km",
    carbonScore: 780,
    goal: "Reduce AC usage",
    status: "online",
  },
]

export function NearbyFriends() {
  const [hasLocation, setHasLocation] = useState(false)

  useEffect(() => {
    const location = localStorage.getItem("userLocation")
    setHasLocation(!!location)
  }, [])

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          localStorage.setItem("userLocation", JSON.stringify(location))
          setHasLocation(true)
        },
        (error) => {
          console.log("Location access denied:", error)
        },
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Nearby Eco-Friends</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasLocation ? (
          <div className="text-center space-y-4">
            <div className="text-muted-foreground text-sm">
              Enable location access to find nearby users with similar energy-saving goals
            </div>
            <Button onClick={requestLocation} className="w-full">
              Enable Location Access
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {nearbyUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium text-sm">{user.name}</div>
                    <Badge variant={user.status === "online" ? "default" : "secondary"} className="text-xs">
                      {user.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{user.distance} away</div>
                  <div className="text-xs text-primary">Goal: {user.goal}</div>
                  <div className="text-xs text-accent">{user.carbonScore} carbon credits</div>
                </div>
                <Button size="sm" variant="outline">
                  Connect
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              Find More Friends
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
