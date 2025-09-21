import { Card, CardContent } from "@/components/ui/card"
import type { CalendarEvent } from "@/lib/data"
import { CheckCircle, Clock, XCircle, Calendar } from "lucide-react"

interface CalendarStatsProps {
  events: CalendarEvent[]
}

export function CalendarStats({ events }: CalendarStatsProps) {
  const completed = events.filter((e) => e.status === "completed").length
  const attempted = events.filter((e) => e.status === "attempted").length
  const missed = events.filter((e) => e.status === "missed").length
  const upcoming = events.filter((e) => e.status === "upcoming").length

  const stats = [
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Attempted",
      value: attempted,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      title: "Missed",
      value: missed,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      title: "Upcoming",
      value: upcoming,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} ${stat.borderColor}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
