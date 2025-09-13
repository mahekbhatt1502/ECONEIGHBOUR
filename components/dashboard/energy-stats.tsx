"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts"

const energyData = [
  { day: "Mon", usage: 45, cost: 180 },
  { day: "Tue", usage: 52, cost: 208 },
  { day: "Wed", usage: 38, cost: 152 },
  { day: "Thu", usage: 41, cost: 164 },
  { day: "Fri", usage: 48, cost: 192 },
  { day: "Sat", usage: 55, cost: 220 },
  { day: "Sun", usage: 42, cost: 168 },
]

const equipmentData = [
  { name: "Air Conditioner", usage: 35, carbon: 28.5, cost: 140 },
  { name: "Water Heater", usage: 15, carbon: 12.2, cost: 60 },
  { name: "Refrigerator", usage: 8, carbon: 6.5, cost: 32 },
  { name: "Lighting", usage: 5, carbon: 4.1, cost: 20 },
  { name: "Others", usage: 7, carbon: 5.7, cost: 28 },
]

const chartConfig = {
  usage: {
    label: "Usage (kWh)",
    color: "hsl(var(--primary))",
  },
  cost: {
    label: "Cost (₹)",
    color: "hsl(var(--accent))",
  },
}

export function EnergyStats() {
  const [viewMode, setViewMode] = useState<"usage" | "equipment">("usage")
  const totalUsage = energyData.reduce((sum, day) => sum + day.usage, 0)
  const totalCost = energyData.reduce((sum, day) => sum + day.cost, 0)
  const avgDaily = totalUsage / 7

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Energy Consumption</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "usage" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("usage")}
            >
              Weekly Usage
            </Button>
            <Button
              variant={viewMode === "equipment" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("equipment")}
            >
              Equipment Breakdown
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalUsage} kWh</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-accent">₹{totalCost}</div>
              <div className="text-sm text-muted-foreground">Total Cost</div>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-chart-3">{avgDaily.toFixed(1)} kWh</div>
              <div className="text-sm text-muted-foreground">Daily Average</div>
            </div>
          </div>

          {/* Charts */}
          {viewMode === "usage" ? (
            <div className="h-64">
              <ChartContainer config={chartConfig} className="h-full">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="usage" stroke="var(--color-usage)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-48">
                <ChartContainer config={chartConfig} className="h-full">
                  <BarChart data={equipmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="usage" fill="var(--color-usage)" />
                  </BarChart>
                </ChartContainer>
              </div>

              {/* Equipment Details */}
              <div className="space-y-3">
                <h4 className="font-semibold">Equipment Carbon Emissions</h4>
                {equipmentData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.usage} kWh • {item.carbon} kg CO₂ • ₹{item.cost}
                      </div>
                    </div>
                    <Progress value={(item.usage / 35) * 100} className="w-20" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Energy Saving Tips */}
          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
            <h4 className="font-semibold text-accent mb-2">💡 Smart Tip</h4>
            <p className="text-sm">
              Your AC usage is 20% higher than similar homes. Try setting it to 24°C instead of 22°C to save ₹50/day.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
