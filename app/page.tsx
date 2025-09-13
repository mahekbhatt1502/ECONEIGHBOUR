import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { EnergyOverview } from "@/components/energy-overview"
import { CommunityComparison } from "@/components/community-comparison"
import { EnergyTips } from "@/components/energy-tips"
import { CommunityHighlights } from "@/components/community-highlights"
import { GamificationSection } from "@/components/gamification-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <EnergyOverview />
        <GamificationSection />
        <CommunityComparison />
        <EnergyTips />
        <CommunityHighlights />
      </main>
      <Footer />
    </div>
  )
}
