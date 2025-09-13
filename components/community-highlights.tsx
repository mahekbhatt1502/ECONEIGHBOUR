import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, TrendingUp } from "lucide-react"

const highlights = [
  {
    title: "Solar Panel Installation Success",
    description: "The Johnson family reduced their energy bill by 85% after installing solar panels last month.",
    author: "Sarah Johnson",
    savings: "85% reduction",
    type: "Success Story",
    image: "/house-with-solar-panels.png",
  },
  {
    title: "Community Energy Challenge",
    description: "Join our neighborhood-wide challenge to reduce energy consumption by 20% this quarter.",
    participants: "28 households",
    type: "Challenge",
    image: "/community-energy-saving-challenge.jpg",
  },
  {
    title: "Smart Home Workshop",
    description: "Learn how to optimize your smart home devices for maximum energy efficiency.",
    date: "Next Saturday",
    type: "Event",
    image: "/smart-home-devices-workshop.jpg",
  },
]

export function CommunityHighlights() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Community Highlights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating our neighborhood's energy-saving achievements and upcoming initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img
                  src={highlight.image || "/placeholder.svg"}
                  alt={highlight.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{highlight.type}</Badge>
                  {highlight.type === "Success Story" && (
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg text-balance">{highlight.title}</CardTitle>
                <CardDescription>{highlight.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {highlight.author && <span className="text-sm text-muted-foreground">by {highlight.author}</span>}
                  {highlight.participants && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {highlight.participants}
                    </div>
                  )}
                  {highlight.date && <span className="text-sm text-muted-foreground">{highlight.date}</span>}
                  {highlight.savings && (
                    <div className="flex items-center text-sm text-primary font-medium">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {highlight.savings}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Button size="lg">Share Your Success Story</Button>
          <p className="text-sm text-muted-foreground">
            Have an energy-saving tip or achievement? Share it with the community!
          </p>
        </div>
      </div>
    </section>
  )
}
