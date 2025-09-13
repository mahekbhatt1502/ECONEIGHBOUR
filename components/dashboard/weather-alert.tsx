"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function WeatherAlert() {
  const [weather, setWeather] = useState({
    temperature: 32,
    condition: "Hot",
    prediction: "High AC usage expected today",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.4 4.4 0 003 15z"
            />
          </svg>
          <span>Weather-Based Energy Prediction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{weather.temperature}°C</span>
            <span className="text-muted-foreground">{weather.condition}</span>
          </div>
          <Alert>
            <AlertDescription>
              {weather.prediction}. Consider pre-cooling your home during off-peak hours to save ₹150 today.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}
