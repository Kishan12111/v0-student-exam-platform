import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Brain, Target, Bookmark, BarChart3 } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: BookOpen,
      title: "Daily Editorials",
      description:
        "Curated current affairs and analysis updated daily to keep you informed on the latest developments.",
      badge: "Updated Daily",
    },
    {
      icon: Calendar,
      title: "Interactive Calendar",
      description: "Visual progress tracking with color-coded indicators showing your daily study completion status.",
      badge: "Progress Tracking",
    },
    {
      icon: Brain,
      title: "Vocabulary Builder",
      description: "Hover over difficult words for instant explanations. Toggle between English and Hindi content.",
      badge: "Bilingual",
    },
    {
      icon: Target,
      title: "Smart Quizzes",
      description: "AI-generated quizzes based on daily editorial content to test your understanding and retention.",
      badge: "AI-Powered",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights into your learning progress with personalized recommendations for improvement.",
      badge: "Data-Driven",
    },
    {
      icon: Bookmark,
      title: "Study Tools",
      description: "Bookmark important content, highlight key points, and save personal notes for quick revision.",
      badge: "Personalized",
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-secondary">Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and resources you need for effective exam preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
