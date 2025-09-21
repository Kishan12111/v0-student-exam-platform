"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AchievementsPanel } from "./achievements-panel"
import { mockLeaderboard, mockAchievements } from "@/lib/data"
import { Trophy, Medal, Crown, Star, Target } from "lucide-react"
import { cn } from "@/lib/utils"

export function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "alltime">("alltime")
  const [leaderboard] = useState(mockLeaderboard)
  const [achievements] = useState(mockAchievements)

  const currentUser = leaderboard.find((entry) => entry.name === "You")
  const topUsers = leaderboard.slice(0, 3)
  const otherUsers = leaderboard.slice(3)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-secondary" />
            Leaderboard & Achievements
          </h2>
          <p className="text-muted-foreground">Compete with fellow students and track your achievements</p>
        </div>

        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Leaderboard */}
              <div className="lg:col-span-2 space-y-6">
                {/* Top 3 Podium */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Top Performers
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant={timeframe === "weekly" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe("weekly")}
                      >
                        Weekly
                      </Button>
                      <Button
                        variant={timeframe === "monthly" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe("monthly")}
                      >
                        Monthly
                      </Button>
                      <Button
                        variant={timeframe === "alltime" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe("alltime")}
                      >
                        All Time
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-end gap-4 mb-6">
                      {/* 2nd Place */}
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{topUsers[1]?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg min-h-[80px] flex flex-col justify-center">
                          <Medal className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <p className="font-semibold text-sm">{topUsers[1]?.name}</p>
                          <p className="text-xs text-muted-foreground">{topUsers[1]?.totalPoints} pts</p>
                        </div>
                      </div>

                      {/* 1st Place */}
                      <div className="text-center">
                        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback>{topUsers[0]?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg min-h-[100px] flex flex-col justify-center">
                          <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
                          <p className="font-bold">{topUsers[0]?.name}</p>
                          <p className="text-sm text-muted-foreground">{topUsers[0]?.totalPoints} pts</p>
                        </div>
                      </div>

                      {/* 3rd Place */}
                      <div className="text-center">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{topUsers[2]?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="bg-amber-100 p-4 rounded-lg min-h-[80px] flex flex-col justify-center">
                          <Medal className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                          <p className="font-semibold text-sm">{topUsers[2]?.name}</p>
                          <p className="text-xs text-muted-foreground">{topUsers[2]?.totalPoints} pts</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Full Leaderboard */}
                <Card>
                  <CardHeader>
                    <CardTitle>Full Rankings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={entry.id}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border",
                          entry.name === "You" && "bg-secondary/10 border-secondary",
                        )}
                      >
                        <div className="flex items-center justify-center w-8">{getRankIcon(entry.rank)}</div>

                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{entry.name}</p>
                            {entry.name === "You" && <Badge variant="secondary">You</Badge>}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Level {entry.level}</span>
                            <span>{entry.streak} day streak</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold">{entry.totalPoints}</p>
                          <p className="text-sm text-muted-foreground">points</p>
                        </div>

                        <div className="flex gap-1">
                          {entry.badges.slice(0, 2).map((badge) => (
                            <Badge key={badge.id} className={cn("text-xs", getRarityColor(badge.rarity))}>
                              {badge.icon}
                            </Badge>
                          ))}
                          {entry.badges.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{entry.badges.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* User Stats Sidebar */}
              <div className="space-y-6">
                {/* Your Stats */}
                {currentUser && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Your Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary">#{currentUser.rank}</div>
                        <p className="text-sm text-muted-foreground">Current Rank</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold">{currentUser.totalPoints}</div>
                          <div className="text-xs text-muted-foreground">Total Points</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold">{currentUser.level}</div>
                          <div className="text-xs text-muted-foreground">Level</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold">{currentUser.streak}</div>
                          <div className="text-xs text-muted-foreground">Day Streak</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold">{currentUser.weeklyPoints}</div>
                          <div className="text-xs text-muted-foreground">This Week</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to Level {currentUser.level + 1}</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Your Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {currentUser?.badges.map((badge) => (
                        <div key={badge.id} className={cn("p-3 rounded-lg text-center", getRarityColor(badge.rarity))}>
                          <div className="text-2xl mb-1">{badge.icon}</div>
                          <div className="text-xs font-medium">{badge.name}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Challenge */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Weekly Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Complete 5 Editorials</p>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>3/5</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary">🏆 250 Points Reward</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsPanel achievements={achievements} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
