"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface LandingCTAProps {
  onGetStarted: () => void
}

export function LandingCTA({ onGetStarted }: LandingCTAProps) {
  const benefits = [
    "Access to daily editorials and current affairs",
    "Interactive progress tracking calendar",
    "AI-powered quizzes and assessments",
    "Vocabulary building with bilingual support",
    "Personal study notes and bookmarks",
    "Community leaderboards and gamification",
  ]

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-secondary/10"></div>
          <CardContent className="relative p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Start Your <span className="text-secondary">Success Journey?</span>
              </h2>
              <p className="text-xl text-muted-foreground text-balance">
                Join thousands of students who are already preparing smarter, not harder.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm lg:text-base">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="text-lg px-8 py-3" onClick={onGetStarted}>
                Get Started Free
              </Button>
              <p className="text-sm text-muted-foreground mt-3">No credit card required • Start immediately</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
