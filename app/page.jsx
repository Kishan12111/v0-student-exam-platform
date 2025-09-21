"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingFeatures } from "@/components/landing/landing-features"
import { LandingStats } from "@/components/landing/landing-stats"
import { LandingCTA } from "@/components/landing/landing-cta"
import { Dashboard } from "@/components/dashboard/dashboard"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  const { user, loading } = useAuth()
  const [authMode, setAuthMode] = useState("login")
  const [showAuth, setShowAuth] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary"></div>
      </div>
    )
  }

  if (user) {
    return <Dashboard />
  }

  if (showAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {authMode === "login" ? (
          <LoginForm onToggleMode={() => setAuthMode("register")} />
        ) : (
          <RegisterForm onToggleMode={() => setAuthMode("login")} />
        )}
        <Toaster />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <LandingHero onGetStarted={() => setShowAuth(true)} />
      <LandingFeatures />
      <LandingStats />
      <LandingCTA onGetStarted={() => setShowAuth(true)} />
      <Toaster />
    </div>
  )
}
