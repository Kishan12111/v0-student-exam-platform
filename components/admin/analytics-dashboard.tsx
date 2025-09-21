import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, BookOpen, Target, Trophy } from "lucide-react"

export function AnalyticsDashboard() {
  const metrics = [
    {
      title: "Daily Active Users",
      value: "892",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Editorials Read",
      value: "2,341",
      change: "+8%",
      trend: "up",
      icon: BookOpen,
    },
    {
      title: "Quizzes Completed",
      value: "1,567",
      change: "-3%",
      trend: "down",
      icon: Target,
    },
    {
      title: "Average Score",
      value: "78%",
      change: "+5%",
      trend: "up",
      icon: Trophy,
    },
  ]

  const topContent = [
    { title: "Digital India Initiative", views: 1234, engagement: 89 },
    { title: "Climate Change and Renewable Energy", views: 987, engagement: 92 },
    { title: "Economic Survey Highlights", views: 756, engagement: 76 },
    { title: "Budget Analysis 2024", views: 654, engagement: 84 },
    { title: "Foreign Policy Updates", views: 543, engagement: 71 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>
                from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Performing Content */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Most viewed and engaged editorials this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContent.map((content, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm leading-tight">{content.title}</p>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{content.views} views</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Engagement</span>
                    <span>{content.engagement}%</span>
                  </div>
                  <Progress value={content.engagement} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* User Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>User Engagement Trends</CardTitle>
            <CardDescription>Weekly engagement patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Monday</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">85%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tuesday</span>
                <div className="flex items-center gap-2">
                  <Progress value={92} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">92%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Wednesday</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">78%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Thursday</span>
                <div className="flex items-center gap-2">
                  <Progress value={88} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">88%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Friday</span>
                <div className="flex items-center gap-2">
                  <Progress value={95} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">95%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekend</span>
                <div className="flex items-center gap-2">
                  <Progress value={65} className="w-20 h-2" />
                  <span className="text-xs text-muted-foreground">65%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
