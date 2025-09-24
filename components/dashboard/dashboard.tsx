"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EditorialsPage } from "@/components/editorials/editorials-page"
import { CalendarPage } from "@/components/calendar/calendar-page"
import { VocabularyBuilder } from "@/components/vocabulary/vocabulary-builder"
import { LeaderboardPage } from "@/components/gamification/leaderboard-page"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { mockEditorials } from "@/lib/data"
import { BookOpen, Calendar, Trophy, Target, LogOut, User, Home, Brain, Settings } from "lucide-react"

type DashboardView = "home" | "editorials" | "calendar" | "vocabulary" | "leaderboard" | "admin"

export function Dashboard() {
  const user = { name: "Demo User", role: "student" }
  const [currentView, setCurrentView] = useState<DashboardView>("home")

  // Get all vocabulary words from editorials
  const allVocabularyWords = mockEditorials.flatMap((editorial) => editorial.vocabularyWords)

  const renderContent = () => {
    switch (currentView) {
      case "editorials":
        return <EditorialsPage />
      case "calendar":
        return <CalendarPage />
      case "vocabulary":
        return <VocabularyBuilder words={allVocabularyWords} />
      case "leaderboard":
        return <LeaderboardPage />
      case "admin":
        return <AdminDashboard />
      default:
        return <DashboardHome onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">SSC Exam Prep</h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                <Button
                  variant={currentView === "home" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("home")}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
                <Button
                  variant={currentView === "editorials" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("editorials")}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Editorials
                </Button>
                <Button
                  variant={currentView === "calendar" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("calendar")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar
                </Button>
                <Button
                  variant={currentView === "vocabulary" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("vocabulary")}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Vocabulary
                </Button>
                <Button
                  variant={currentView === "leaderboard" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("leaderboard")}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Leaderboard
                </Button>
                {user?.role === "admin" && (
                  <Button
                    variant={currentView === "admin" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentView("admin")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary">{user?.role === "admin" ? "Admin" : "Student"}</Badge>
              <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {user?.name}</span>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {renderContent()}
    </div>
  )
}

function DashboardHome({ onNavigate }: { onNavigate: (view: DashboardView) => void }) {
  const user = { name: "Demo User", role: "student" }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Track your progress and continue your exam preparation journey.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground">Out of 1,247 students</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className={`grid md:grid-cols-2 ${user?.role === "admin" ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-6`}>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("editorials")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              Today's Editorial
            </CardTitle>
            <CardDescription>Read and analyze today's current affairs editorial</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Reading</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("calendar")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              Progress Calendar
            </CardTitle>
            <CardDescription>View your study progress and upcoming deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              View Calendar
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("vocabulary")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-secondary" />
              Vocabulary Builder
            </CardTitle>
            <CardDescription>Learn new words with interactive flashcards</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Start Learning
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("leaderboard")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" />
              Leaderboard
            </CardTitle>
            <CardDescription>See how you rank against other students</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              View Rankings
            </Button>
          </CardContent>
        </Card>

        {user?.role === "admin" && (
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate("admin")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-secondary" />
                Admin Panel
              </CardTitle>
              <CardDescription>Manage content, users, and platform settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                Manage Platform
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
