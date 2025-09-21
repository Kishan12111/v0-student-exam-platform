import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CalendarEvent } from "@/lib/data"
import { format } from "date-fns"
import { BookOpen, Target, AlertCircle, Calendar, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarEventsListProps {
  date: Date
  events: CalendarEvent[]
}

export function CalendarEventsList({ date, events }: CalendarEventsListProps) {
  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "editorial":
        return BookOpen
      case "quiz":
        return Target
      case "deadline":
        return AlertCircle
      case "exam":
        return Trophy
      default:
        return Calendar
    }
  }

  const getStatusColor = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "attempted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "missed":
        return "bg-red-100 text-red-800 border-red-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "editorial":
        return "text-secondary"
      case "quiz":
        return "text-green-600"
      case "deadline":
        return "text-orange-600"
      case "exam":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{format(date, "MMMM d, yyyy")}</CardTitle>
        <CardDescription>
          {events.length === 0
            ? "No activities scheduled for this date"
            : `${events.length} ${events.length === 1 ? "activity" : "activities"} scheduled`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No activities for this date</p>
            <p className="text-sm">Select another date to view activities</p>
          </div>
        ) : (
          events.map((event) => {
            const Icon = getEventIcon(event.type)
            return (
              <Card key={event.id} className="border-l-4 border-l-secondary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={cn("p-2 rounded-lg bg-muted", getTypeColor(event.type))}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs capitalize">
                            {event.type}
                          </Badge>
                          <Badge className={cn("text-xs", getStatusColor(event.status))}>{event.status}</Badge>
                        </div>
                        {event.score && (
                          <p className="text-sm text-muted-foreground">
                            Score: <span className="font-medium">{event.score}%</span>
                          </p>
                        )}
                      </div>
                    </div>
                    {event.status === "upcoming" && (
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    )}
                    {event.status === "missed" && (
                      <Button size="sm" variant="secondary">
                        Retry
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
