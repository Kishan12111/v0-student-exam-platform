import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Achievement } from "@/lib/data"
import { CheckCircle, Lock, Star, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface AchievementsPanelProps {
  achievements: Achievement[]
}

export function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  const completedAchievements = achievements.filter((a) => a.completed)
  const inProgressAchievements = achievements.filter((a) => !a.completed && a.progress > 0)
  const lockedAchievements = achievements.filter((a) => !a.completed && a.progress === 0)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        achievement.completed && "bg-green-50 border-green-200",
        !achievement.completed && achievement.progress === 0 && "opacity-60",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                achievement.completed ? "bg-green-100" : "bg-muted",
              )}
            >
              {achievement.completed ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : achievement.progress > 0 ? (
                <Target className="w-6 h-6 text-secondary" />
              ) : (
                <Lock className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{achievement.title}</CardTitle>
              <CardDescription>{achievement.description}</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary">{achievement.points} pts</Badge>
            {achievement.badge && (
              <Badge className={cn("ml-2 text-xs", getRarityColor(achievement.badge.rarity))}>
                {achievement.badge.icon} {achievement.badge.name}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!achievement.completed && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {achievement.progress}/{achievement.target}
              </span>
            </div>
            <Progress value={(achievement.progress / achievement.target) * 100} />
          </div>
        )}
        {achievement.completed && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>Completed!</span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedAchievements.length}</div>
            <p className="text-xs text-muted-foreground">achievements unlocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Target className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{inProgressAchievements.length}</div>
            <p className="text-xs text-muted-foreground">achievements in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {completedAchievements.reduce((sum, a) => sum + a.points, 0)}
            </div>
            <p className="text-xs text-muted-foreground">points earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Completed Achievements */}
      {completedAchievements.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Completed Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {completedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      {inProgressAchievements.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-secondary" />
            In Progress
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {inProgressAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Locked Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
