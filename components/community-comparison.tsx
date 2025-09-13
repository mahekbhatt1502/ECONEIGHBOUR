"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

const neighborhoodData = [
  { name: "Maple Street", usage: 520, efficiency: 95, rank: 1 },
  { name: "Oak Avenue", usage: 580, efficiency: 88, rank: 2 },
  { name: "Your Home", usage: 580, efficiency: 85, rank: 3, isUser: true },
  { name: "Pine Road", usage: 620, efficiency: 82, rank: 4 },
  { name: "Elm Drive", usage: 680, efficiency: 75, rank: 5 },
]

export function CommunityComparison() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Community Leaderboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how your energy efficiency compares with your neighbors and get inspired by top performers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Neighborhood Energy Efficiency Rankings</CardTitle>
              <CardDescription>Based on kWh per square foot this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {neighborhoodData.map((neighbor, index) => (
                <div
                  key={neighbor.name}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    neighbor.isUser ? "bg-primary/5 border-primary/20" : "bg-background"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {neighbor.rank === 1 && <Trophy className="h-6 w-6 text-yellow-500" />}
                      {neighbor.rank === 2 && <Medal className="h-6 w-6 text-gray-400" />}
                      {neighbor.rank === 3 && <Award className="h-6 w-6 text-amber-600" />}
                      {neighbor.rank > 3 && (
                        <span className="text-lg font-semibold text-muted-foreground">{neighbor.rank}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${neighbor.isUser ? "text-primary" : ""}`}>{neighbor.name}</span>
                        {neighbor.isUser && <Badge variant="secondary">You</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">{neighbor.usage} kWh this month</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{neighbor.efficiency}% efficient</div>
                      <Progress value={neighbor.efficiency} className="w-20 h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">15%</div>
                <div className="text-sm text-muted-foreground">Average neighborhood reduction this year</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-accent mb-2">$2,340</div>
                <div className="text-sm text-muted-foreground">Total community savings this year</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">42</div>
                <div className="text-sm text-muted-foreground">Households participating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
