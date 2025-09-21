"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { CalendarEventsList } from "./calendar-events-list"
import { StudyStreakCard } from "./study-streak-card"
import { CalendarStats } from "./calendar-stats"
import { mockCalendarEvents, mockStudyStreak } from "@/lib/data"
import { format, isSameDay, parseISO } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [events] = useState(mockCalendarEvents)
  const [studyStreak] = useState(mockStudyStreak)

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.date), date))
  }

  const getDateStatus = (date: Date) => {
    const dayEvents = getEventsForDate(date)
    if (dayEvents.length === 0) return null

    const hasCompleted = dayEvents.some((event) => event.status === "completed")
    const hasAttempted = dayEvents.some((event) => event.status === "attempted")
    const hasMissed = dayEvents.some((event) => event.status === "missed")

    if (hasCompleted) return "completed"
    if (hasAttempted) return "attempted"
    if (hasMissed) return "missed"
    return "upcoming"
  }

  const selectedDateEvents = getEventsForDate(selectedDate)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-secondary" />
            Progress Calendar
          </h2>
          <p className="text-muted-foreground">Track your daily study progress and upcoming deadlines</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar and Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Streak */}
            <StudyStreakCard streak={studyStreak} />

            {/* Calendar Stats */}
            <CalendarStats events={events} />

            {/* Main Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Study Calendar
                </CardTitle>
                <CardDescription>
                  Click on any date to view your activities. Colors indicate your progress status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: cn(
                          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                          "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50",
                          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
                          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                        ),
                        day: cn(
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 relative",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus:bg-accent focus:text-accent-foreground",
                        ),
                        day_range_end: "day-range-end",
                        day_selected:
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground font-semibold",
                        day_outside:
                          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                      components={{
                        Day: ({ date, ...props }) => {
                          const status = getDateStatus(date)
                          const dayEvents = getEventsForDate(date)

                          return (
                            <div className="relative">
                              <button {...props} className={cn(props.className)}>
                                {format(date, "d")}
                                {status && (
                                  <div
                                    className={cn(
                                      "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full",
                                      status === "completed" && "bg-green-500",
                                      status === "attempted" && "bg-yellow-500",
                                      status === "missed" && "bg-red-500",
                                      status === "upcoming" && "bg-blue-500",
                                    )}
                                  />
                                )}
                              </button>
                            </div>
                          )
                        },
                      }}
                    />
                  </div>

                  {/* Legend */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Status Legend</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Completed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span>Attempted</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Missed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Upcoming</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Events for Selected Date */}
          <div className="space-y-6">
            <CalendarEventsList date={selectedDate} events={selectedDateEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}
