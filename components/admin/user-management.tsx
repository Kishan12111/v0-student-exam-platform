import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockLeaderboard } from "@/lib/data"
import { Search, MoreHorizontal, UserCheck, UserX, Shield } from "lucide-react"

export function UserManagement() {
  const users = mockLeaderboard.map((entry, index) => ({
    id: entry.id,
    name: entry.name,
    email: `${entry.name.toLowerCase().replace(" ", ".")}@example.com`,
    role: entry.name === "You" ? "student" : "student",
    status: "active",
    joinDate: "2024-01-01",
    lastActive: "2024-01-15",
    totalPoints: entry.totalPoints,
    level: entry.level,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search users..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            <UserCheck className="w-4 h-4 mr-2" />
            Active Users
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Shield className="w-4 h-4 mr-2" />
            Admins
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage platform users and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{user.name}</p>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>Level {user.level}</span>
                      <span>{user.totalPoints} points</span>
                      <span>Last active: {user.lastActive}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <UserCheck className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <UserX className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
