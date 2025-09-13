import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EnergyStats } from "@/components/dashboard/energy-stats"
import { WeatherAlert } from "@/components/dashboard/weather-alert"
import { CarbonScore } from "@/components/dashboard/carbon-score"
import { NearbyFriends } from "@/components/dashboard/nearby-friends"
import { AIAssistant } from "@/components/dashboard/ai-assistant"
import { EnergyInputForm } from "@/components/dashboard/energy-input-form"
import { EmailNotifications } from "@/components/dashboard/email-notifications"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WeatherAlert />
            <EnergyInputForm />
            <EnergyStats />
            <CarbonScore />
          </div>
          <div className="space-y-6">
            <NearbyFriends />
            <AIAssistant />
            <EmailNotifications />
          </div>
        </div>
      </main>
    </div>
  )
}
