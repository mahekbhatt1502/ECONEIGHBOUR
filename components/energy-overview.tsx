"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts"

const monthlyData = [
  { month: "Jan", usage: 850, cost: 127 },
  { month: "Feb", usage: 780, cost: 117 },
  { month: "Mar", usage: 720, cost: 108 },
  { month: "Apr", usage: 650, cost: 98 },
  { month: "May", usage: 580, cost: 87 },
  { month: "Jun", usage: 920, cost: 138 },
]

const dailyData = [
  { hour: "00:00", usage: 45 },
  { hour: "06:00", usage: 65 },
  { hour: "12:00", usage: 85 },
  { hour: "18:00", usage: 120 },
  { hour: "24:00", usage: 55 },
]

const chartConfig = {
  usage: {
    label: "Usage (kWh)",
    color: "hsl(var(--primary))",
  },
  cost: {
    label: "Cost ($)",
    color: "hsl(var(--accent))",
  },
}

export function EnergyOverview() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Your Energy Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get real-time insights into your energy consumption patterns and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-2xl">580 kWh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">↓ 12%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Monthly Cost</CardDescription>
              <CardTitle className="text-2xl">$87</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">↓ $11</span> savings this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Efficiency Rank</CardDescription>
              <CardTitle className="text-2xl">#3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Top <span className="text-accent font-medium">15%</span> in your neighborhood
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Usage Trend</CardTitle>
              <CardDescription>Your energy consumption over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="usage"
                    stroke="var(--color-usage)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-usage)" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Usage Pattern</CardTitle>
              <CardDescription>Average hourly consumption today</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="usage" fill="hsl(var(--accent))" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
