"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Zap, Users, Leaf, Star, Award, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export function GamificationSection() {
  const [userLevel, setUserLevel] = useState(7)
  const [ecoPoints, setEcoPoints] = useState(2847)
  const [weeklyProgress, setWeeklyProgress] = useState(68)
  const [treeGrowth, setTreeGrowth] = useState(45)

  useEffect(() => {
    const interval = setInterval(() => {
      setEcoPoints((prev) => prev + Math.floor(Math.random() * 5))
      setWeeklyProgress((prev) => Math.min(100, prev + Math.random() * 2))
      setTreeGrowth((prev) => Math.min(100, prev + Math.random() * 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const achievements = [
    { name: "Energy Saver", icon: Zap, earned: true, description: "Reduced energy by 20%" },
    { name: "Community Leader", icon: Users, earned: true, description: "Helped 5 neighbors" },
    { name: "Green Warrior", icon: Leaf, earned: false, description: "Plant 10 virtual trees" },
    { name: "Efficiency Master", icon: TrendingUp, earned: false, description: "Maintain 90% efficiency" },
  ]

  const challenges = [
    { title: "Weekend Energy Challenge", progress: 75, reward: "150 EcoPoints", timeLeft: "2 days" },
    { title: "Neighborhood Competition", progress: 45, reward: "Tree Seed", timeLeft: "5 days" },
    { title: "Carbon Footprint Reduction", progress: 90, reward: "Eco Badge", timeLeft: "1 day" },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Eco Gaming Hub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Turn energy saving into an exciting game! Earn points, unlock achievements, and compete with your community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Stats */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                Your Eco Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Level {userLevel} Eco Warrior</span>
                <Badge variant="secondary" className="animate-pulse">
                  {ecoPoints} EcoPoints
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Goal</span>
                  <span>{weeklyProgress}%</span>
                </div>
                <Progress value={weeklyProgress} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Virtual Tree Growth</span>
                  <span>{treeGrowth}%</span>
                </div>
                <Progress value={treeGrowth} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  🌱 Your tree is growing! Keep saving energy to help it flourish.
                </div>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                <Trophy className="h-4 w-4 mr-2" />
                View Full Stats
              </Button>
            </CardContent>
          </Card>

          {/* Active Challenges */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Active Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.map((challenge, index) => (
                <div key={index} className="p-3 bg-card/50 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{challenge.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {challenge.timeLeft}
                    </Badge>
                  </div>
                  <Progress value={challenge.progress} className="h-1 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{challenge.progress}% complete</span>
                    <span className="text-accent font-medium">{challenge.reward}</span>
                  </div>
                </div>
              ))}

              <Button className="w-full" size="sm">
                Join New Challenge
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                    achievement.earned ? "bg-primary/10 border border-primary/20" : "bg-muted/50 opacity-60"
                  }`}
                >
                  <div className={`p-2 rounded-full ${achievement.earned ? "bg-primary/20" : "bg-muted"}`}>
                    <achievement.icon
                      className={`h-4 w-4 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{achievement.name}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <Badge variant="secondary" className="text-xs animate-pulse">
                      ✓
                    </Badge>
                  )}
                </div>
              ))}

              <Button className="w-full bg-transparent" variant="outline" size="sm">
                View All Achievements
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Preview */}
        <Card className="mt-8 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              Neighborhood Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { rank: 1, name: "Sarah Chen", points: 3247, badge: "🥇" },
                { rank: 2, name: "You", points: ecoPoints, badge: "🥈" },
                { rank: 3, name: "Mike Johnson", points: 2156, badge: "🥉" },
              ].map((player, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border text-center ${
                    player.name === "You" ? "bg-primary/10 border-primary/30" : "bg-card/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{player.badge}</div>
                  <h4 className="font-medium">{player.name}</h4>
                  <p className="text-sm text-muted-foreground">{player.points} EcoPoints</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
