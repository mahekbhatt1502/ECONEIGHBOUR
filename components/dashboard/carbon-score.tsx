"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function CarbonScore() {
  const [carbonScore, setCarbonScore] = useState(750)
  const [treeGrowth, setTreeGrowth] = useState(65)
  const [weeklyReduction, setWeeklyReduction] = useState(12)

  const maxScore = 1000
  const scorePercentage = (carbonScore / maxScore) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <span>Carbon Credit Score & Virtual Tree</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Carbon Score */}
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="text-4xl font-bold text-primary">{carbonScore}</div>
              <div className="text-sm text-muted-foreground">Carbon Credits</div>
            </div>
            <Progress value={scorePercentage} className="h-3" />
            <div className="text-sm text-muted-foreground">{maxScore - carbonScore} credits to next level</div>
          </div>

          {/* Virtual Tree */}
          <div className="bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-900/20 dark:to-green-900/20 p-6 rounded-lg text-center">
            <div className="text-6xl mb-2">🌳</div>
            <div className="space-y-2">
              <div className="font-semibold">Your Eco Tree</div>
              <Progress value={treeGrowth} className="h-2" />
              <div className="text-sm text-muted-foreground">{treeGrowth}% grown</div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-accent">-{weeklyReduction}%</div>
              <div className="text-sm text-muted-foreground">Carbon Reduction</div>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">+85</div>
              <div className="text-sm text-muted-foreground">Credits Earned</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <h4 className="font-semibold">Recent Achievements</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-accent/10 rounded-lg">
                <span className="text-lg">🏆</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">Energy Saver</div>
                  <div className="text-xs text-muted-foreground">Reduced usage by 15% this week</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                <span className="text-lg">🌱</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">Tree Grower</div>
                  <div className="text-xs text-muted-foreground">Your tree reached 65% growth</div>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-transparent" variant="outline">
            View All Achievements
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
