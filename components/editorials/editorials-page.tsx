"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VocabularyTooltip } from "./vocabulary-tooltip"
import { EditorialQuiz } from "./editorial-quiz"
import { EditorialSidebar } from "./editorial-sidebar"
import { mockEditorials, type Editorial } from "@/lib/data"
import { BookOpen, Clock, Target, Bookmark, Languages } from "lucide-react"

export function EditorialsPage() {
  const [selectedEditorial, setSelectedEditorial] = useState<Editorial | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [language, setLanguage] = useState<"english" | "hindi">("english")
  const [editorials] = useState(mockEditorials)

  useEffect(() => {
    if (editorials.length > 0 && !selectedEditorial) {
      setSelectedEditorial(editorials[0])
    }
  }, [editorials, selectedEditorial])

  const handleEditorialSelect = (editorial: Editorial) => {
    setSelectedEditorial(editorial)
    setShowQuiz(false)
  }

  const handleQuizComplete = () => {
    setShowQuiz(false)
  }

  if (showQuiz && selectedEditorial?.quiz) {
    return (
      <EditorialQuiz quiz={selectedEditorial.quiz} onComplete={handleQuizComplete} onBack={() => setShowQuiz(false)} />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <EditorialSidebar
              editorials={editorials}
              selectedEditorial={selectedEditorial}
              onEditorialSelect={handleEditorialSelect}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {selectedEditorial ? (
              <Card className="h-full">
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="capitalize">
                          {selectedEditorial.category}
                        </Badge>
                        <Badge variant="outline">{selectedEditorial.readTime} min read</Badge>
                      </div>
                      <CardTitle className="text-2xl text-balance leading-tight mb-2">
                        {selectedEditorial.title}
                      </CardTitle>
                      <CardDescription className="text-base">{selectedEditorial.summary}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLanguage(language === "english" ? "hindi" : "english")}
                      >
                        <Languages className="w-4 h-4 mr-2" />
                        {language === "english" ? "हिंदी" : "English"}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedEditorial.readTime} min read
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {selectedEditorial.date}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="p-6">
                      <div className="prose prose-gray max-w-none leading-relaxed text-pretty">
                        {selectedEditorial.content.split("\n\n").map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph.split(" ").map((word, wordIndex) => {
                              const cleanWord = word.replace(/[.,!?;:]/g, "").toLowerCase()
                              const vocabWord = selectedEditorial.vocabularyWords.find(
                                (vw) => vw.word.toLowerCase() === cleanWord,
                              )

                              if (vocabWord) {
                                return (
                                  <VocabularyTooltip key={wordIndex} word={vocabWord} language={language}>
                                    <span className="vocabulary-word cursor-help text-secondary underline decoration-dotted">
                                      {word}
                                    </span>
                                  </VocabularyTooltip>
                                )
                              }
                              return word + " "
                            })}
                          </p>
                        ))}
                      </div>

                      <Separator className="my-8" />

                      {/* Quiz CTA */}
                      {selectedEditorial.quiz && (
                        <Card className="bg-secondary/5 border-secondary/20">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <Target className="w-5 h-5 text-secondary" />
                                  Test Your Understanding
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Take a quiz based on this editorial to reinforce your learning.
                                </p>
                              </div>
                              <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select an Editorial</h3>
                  <p className="text-muted-foreground">Choose an editorial from the sidebar to start reading.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
