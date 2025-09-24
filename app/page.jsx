"use client"

import { LandingHero } from "@/components/landing/landing-hero"
import { LandingFeatures } from "@/components/landing/landing-features"
import { LandingStats } from "@/components/landing/landing-stats"
import { LandingCTA } from "@/components/landing/landing-cta"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <LandingHero onGetStarted={() => {}} />
      <LandingFeatures />
      <LandingStats />
      <LandingCTA onGetStarted={() => {}} />
      <Toaster />
    </div>
  )
}
