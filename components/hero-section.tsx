"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingDown, Users, Leaf, Zap, Trophy, Target } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export function HeroSection() {
  const [energySaved, setEnergySaved] = useState(0)
  const [carbonReduced, setCarbonReduced] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [currentChallenge, setCurrentChallenge] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergySaved((prev) => prev + Math.random() * 0.5)
      setCarbonReduced((prev) => prev + Math.random() * 0.2)
      setActiveUsers((prev) => Math.floor(1247 + Math.sin(Date.now() / 10000) * 50))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const challenges = [
    "Turn off lights for 1 hour - Earn 50 EcoPoints!",
    "Use AC 2°C higher today - Save 15% energy!",
    "Unplug devices when not in use - Reduce phantom load!",
    "Take shorter showers - Save water & energy!",
  ]

  useEffect(() => {
    const challengeInterval = setInterval(() => {
      setCurrentChallenge((prev) => (prev + 1) % challenges.length)
    }, 4000)

    return () => clearInterval(challengeInterval)
  }, [])

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-card to-secondary overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary rounded-full animate-ping delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 mb-8 border border-primary/20">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent animate-pulse" />
              <span className="font-semibold">{energySaved.toFixed(1)} kWh</span>
              <span className="text-muted-foreground">saved today</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary animate-bounce" />
              <span className="font-semibold">{carbonReduced.toFixed(1)} kg CO₂</span>
              <span className="text-muted-foreground">reduced</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span className="font-semibold">{activeUsers}</span>
              <span className="text-muted-foreground">active eco-warriors</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6 animate-fade-in">
            Empower Your <span className="text-primary animate-pulse">Energy Choices</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Track, compare, and optimize your neighborhood's energy consumption. Join your community in building a more
            sustainable future, one kilowatt at a time.
          </p>

          <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg p-4 mb-8 border border-accent/30">
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Trophy className="h-4 w-4 text-accent animate-spin" />
              <span className="text-accent">Daily Challenge:</span>
              <span className="animate-fade-in">{challenges[currentChallenge]}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
                Start Your Eco Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent hover:scale-105 transition-transform"
              >
                Login to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <TrendingDown className="h-6 w-6 text-primary group-hover:animate-bounce" />
              </div>
              <h3 className="font-semibold mb-2">Smart Tracking</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered insights to identify energy-saving opportunities and track your progress
              </p>
            </div>

            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Users className="h-6 w-6 text-accent group-hover:animate-pulse" />
              </div>
              <h3 className="font-semibold mb-2">Eco Community</h3>
              <p className="text-sm text-muted-foreground">
                Connect with neighbors, share tips, and compete in energy-saving challenges
              </p>
            </div>

            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Target className="h-6 w-6 text-primary group-hover:animate-spin" />
              </div>
              <h3 className="font-semibold mb-2">Gamified Goals</h3>
              <p className="text-sm text-muted-foreground">
                Earn EcoPoints, unlock achievements, and grow your virtual eco-tree
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
