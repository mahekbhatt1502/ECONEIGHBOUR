"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Zap } from "lucide-react"
import { format } from "date-fns"

const appliances = [
  { id: "ac", name: "Air Conditioner", carbonFactor: 0.82 },
  { id: "heater", name: "Water Heater", carbonFactor: 0.81 },
  { id: "fridge", name: "Refrigerator", carbonFactor: 0.81 },
  { id: "washing", name: "Washing Machine", carbonFactor: 0.81 },
  { id: "tv", name: "Television", carbonFactor: 0.81 },
  { id: "lights", name: "Lighting", carbonFactor: 0.81 },
  { id: "fan", name: "Ceiling Fan", carbonFactor: 0.81 },
  { id: "microwave", name: "Microwave", carbonFactor: 0.81 },
  { id: "computer", name: "Computer/Laptop", carbonFactor: 0.81 },
  { id: "other", name: "Other Appliance", carbonFactor: 0.81 },
]

interface EnergyReading {
  id: string
  appliance: string
  applianceName: string
  consumption: number
  date: Date
  duration: number
  cost: number
  carbonEmission: number
  notes?: string
}

export function EnergyInputForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    appliance: "",
    consumption: "",
    date: new Date(),
    duration: "",
    notes: "",
  })
  const [readings, setReadings] = useState<EnergyReading[]>([])
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.appliance || !formData.consumption || !formData.duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const selectedAppliance = appliances.find((a) => a.id === formData.appliance)
    if (!selectedAppliance) return

    const consumption = Number.parseFloat(formData.consumption)
    const duration = Number.parseFloat(formData.duration)
    const cost = consumption * 4 // ₹4 per kWh (example rate)
    const carbonEmission = consumption * selectedAppliance.carbonFactor

    const newReading: EnergyReading = {
      id: Date.now().toString(),
      appliance: formData.appliance,
      applianceName: selectedAppliance.name,
      consumption,
      date: formData.date,
      duration,
      cost,
      carbonEmission,
      notes: formData.notes,
    }

    setReadings([newReading, ...readings])

    // Store in localStorage for persistence
    const existingReadings = JSON.parse(localStorage.getItem("energyReadings") || "[]")
    localStorage.setItem("energyReadings", JSON.stringify([newReading, ...existingReadings]))

    toast({
      title: "Reading Added Successfully!",
      description: `${selectedAppliance.name}: ${consumption} kWh recorded`,
    })

    // Reset form
    setFormData({
      appliance: "",
      consumption: "",
      date: new Date(),
      duration: "",
      notes: "",
    })
    setIsOpen(false)
  }

  const totalConsumption = readings.reduce((sum, reading) => sum + reading.consumption, 0)
  const totalCost = readings.reduce((sum, reading) => sum + reading.cost, 0)
  const totalCarbon = readings.reduce((sum, reading) => sum + reading.carbonEmission, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Energy Input</span>
          </CardTitle>
          <Button onClick={() => setIsOpen(!isOpen)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Reading
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Input Form */}
        {isOpen && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 bg-secondary/30 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appliance">Appliance *</Label>
                <Select
                  value={formData.appliance}
                  onValueChange={(value) => setFormData({ ...formData, appliance: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select appliance" />
                  </SelectTrigger>
                  <SelectContent>
                    {appliances.map((appliance) => (
                      <SelectItem key={appliance.id} value={appliance.id}>
                        {appliance.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="consumption">Energy Consumption (kWh) *</Label>
                <Input
                  id="consumption"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 5.2"
                  value={formData.consumption}
                  onChange={(e) => setFormData({ ...formData, consumption: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Usage Duration (hours) *</Label>
                <Input
                  id="duration"
                  type="number"
                  step="0.5"
                  placeholder="e.g., 8"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(formData.date, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && setFormData({ ...formData, date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about usage..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
              />
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="flex-1">
                Add Reading
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Summary Stats */}
        {readings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">{totalConsumption.toFixed(1)} kWh</div>
              <div className="text-sm text-muted-foreground">Total Consumption</div>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
              <div className="text-2xl font-bold text-accent">₹{totalCost.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Estimated Cost</div>
            </div>
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <div className="text-2xl font-bold text-destructive">{totalCarbon.toFixed(1)} kg</div>
              <div className="text-sm text-muted-foreground">CO₂ Emissions</div>
            </div>
          </div>
        )}

        {/* Recent Readings */}
        {readings.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-semibold">Recent Readings</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {readings.slice(0, 5).map((reading) => (
                <div key={reading.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{reading.applianceName}</div>
                    <div className="text-sm text-muted-foreground">
                      {reading.consumption} kWh • {reading.duration}h • {format(reading.date, "MMM dd")}
                    </div>
                    {reading.notes && <div className="text-xs text-muted-foreground mt-1">{reading.notes}</div>}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{reading.cost.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground">{reading.carbonEmission.toFixed(1)} kg CO₂</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No energy readings yet.</p>
            <p className="text-sm">Click "Add Reading" to start tracking your consumption!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
