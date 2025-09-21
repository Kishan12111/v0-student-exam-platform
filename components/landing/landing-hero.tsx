"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Trophy, Users } from "lucide-react"

interface LandingHeroProps {
  onGetStarted: () => void
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Master Your <span className="text-secondary">SSC & Civil Service</span> Exams
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
            Comprehensive preparation platform with daily editorials, interactive quizzes, vocabulary building, and
            progress tracking to help you succeed in competitive exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-3" onClick={onGetStarted}>
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              View Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Daily Editorials</h3>
              <p className="text-sm text-muted-foreground">Current affairs & analysis</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">Visual calendar & stats</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Gamification</h3>
              <p className="text-sm text-muted-foreground">Leaderboards & rewards</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Community</h3>
              <p className="text-sm text-muted-foreground">Learn with peers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
