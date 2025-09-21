import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { StudyStreak } from "@/lib/data"
import { Flame, Target, TrendingUp } from "lucide-react"

interface StudyStreakCardProps {
  streak: StudyStreak
}

export function StudyStreakCard({ streak }: StudyStreakCardProps) {
  const streakProgress = (streak.currentStreak / streak.longestStreak) * 100

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Flame className="w-5 h-5" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-orange-600">{streak.currentStreak}</div>
            <p className="text-sm text-orange-700">Days in a row</p>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            🔥 On Fire!
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to personal best</span>
            <span className="font-medium">
              {streak.currentStreak}/{streak.longestStreak}
            </span>
          </div>
          <Progress value={streakProgress} className="h-2" />
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span>Best: {streak.longestStreak} days</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>Last study: {streak.lastStudyDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
