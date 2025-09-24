"use client"

import { useState } from "react"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingFeatures } from "@/components/landing/landing-features"
import { LandingStats } from "@/components/landing/landing-stats"
import { LandingCTA } from "@/components/landing/landing-cta"
import { Dashboard } from "@/components/dashboard/dashboard"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false)

  const handleGetStarted = () => {
    setShowDashboard(true)
  }

  const handleBackToLanding = () => {
    setShowDashboard(false)
  }

  if (showDashboard) {
    return <Dashboard onBackToLanding={handleBackToLanding} />
  }

  return (
    <div className="min-h-screen">
      <LandingHero onGetStarted={handleGetStarted} />
      <LandingFeatures />
      <LandingStats />
      <LandingCTA onGetStarted={handleGetStarted} />
      <Toaster />
    </div>
  )
}
