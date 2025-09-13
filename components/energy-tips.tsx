import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Thermometer, Zap, Home } from "lucide-react"

const tips = [
  {
    icon: Lightbulb,
    title: "LED Lighting",
    description: "Switch to LED bulbs to reduce lighting energy consumption by up to 75%",
    savings: "$45/year",
    difficulty: "Easy",
  },
  {
    icon: Thermometer,
    title: "Smart Thermostat",
    description: "Install a programmable thermostat to optimize heating and cooling",
    savings: "$180/year",
    difficulty: "Medium",
  },
  {
    icon: Zap,
    title: "Unplug Devices",
    description: "Eliminate phantom loads by unplugging electronics when not in use",
    savings: "$65/year",
    difficulty: "Easy",
  },
  {
    icon: Home,
    title: "Weatherization",
    description: "Seal air leaks and add insulation to improve home efficiency",
    savings: "$320/year",
    difficulty: "Hard",
  },
]

export function EnergyTips() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Energy Saving Tips</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical recommendations to reduce your energy consumption and lower your bills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tips.map((tip, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <tip.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{tip.title}</CardTitle>
                <CardDescription className="text-sm">{tip.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-primary">{tip.savings}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      tip.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : tip.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tip.difficulty}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg">View All Tips & Guides</Button>
        </div>
      </div>
    </section>
  )
}
