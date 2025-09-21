import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, XCircle, Flag, MessageSquare } from "lucide-react"

export function ContentModeration() {
  const pendingReports = [
    {
      id: "1",
      type: "comment",
      content: "Inappropriate comment on Digital India editorial",
      reporter: "Student User",
      reportedUser: "Anonymous User",
      reason: "Spam/Inappropriate",
      timestamp: "2 hours ago",
      severity: "medium",
    },
    {
      id: "2",
      type: "quiz_answer",
      content: "Potentially incorrect quiz answer reported",
      reporter: "Priya Sharma",
      reportedUser: "System Generated",
      reason: "Factual Error",
      timestamp: "5 hours ago",
      severity: "high",
    },
    {
      id: "3",
      type: "user_behavior",
      content: "User creating multiple accounts",
      reporter: "System Detection",
      reportedUser: "Multiple Accounts",
      reason: "Terms Violation",
      timestamp: "1 day ago",
      severity: "high",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "comment":
        return MessageSquare
      case "quiz_answer":
        return AlertTriangle
      case "user_behavior":
        return Flag
      default:
        return AlertTriangle
    }
  }

  return (
    <div className="space-y-6">
      {/* Moderation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingReports.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">Reports handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Flagged</CardTitle>
            <Flag className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-xs text-muted-foreground">System detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2.3h</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Reports</CardTitle>
          <CardDescription>Content and user behavior reports awaiting moderation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingReports.map((report) => {
            const TypeIcon = getTypeIcon(report.type)
            return (
              <div key={report.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{report.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {report.type.replace("_", " ")}
                        </Badge>
                        <Badge className={`text-xs ${getSeverityColor(report.severity)}`}>
                          {report.severity} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    <p>{report.timestamp}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                  <div>
                    <span className="font-medium">Reported by:</span> {report.reporter}
                  </div>
                  <div>
                    <span className="font-medium">Reported user:</span> {report.reportedUser}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Reason:</span> {report.reason}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="default">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Review Details
                  </Button>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
