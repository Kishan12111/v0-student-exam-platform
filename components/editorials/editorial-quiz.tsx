"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Quiz } from "@/lib/data"
import { CheckCircle, XCircle, ArrowLeft, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditorialQuizProps {
  quiz: Quiz
  onComplete: () => void
  onBack: () => void
}

export function EditorialQuiz({ quiz, onComplete, onBack }: EditorialQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
      setQuizCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / quiz.questions.length) * 100)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (showResults) {
    const score = calculateScore()
    const correctAnswers = quiz.questions.filter((q, index) => selectedAnswers[index] === q.correctAnswer).length

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>Here are your results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={cn("text-4xl font-bold mb-2", getScoreColor(score))}>{score}%</div>
                <p className="text-muted-foreground">
                  You got {correctAnswers} out of {quiz.questions.length} questions correct
                </p>
              </div>

              <div className="space-y-4">
                {quiz.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <Card
                      key={question.id}
                      className={cn("border-l-4", isCorrect ? "border-l-green-500" : "border-l-red-500")}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <CardTitle className="text-base">{question.question}</CardTitle>
                            {!isCorrect && (
                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-red-600">Your answer: {question.options[userAnswer]}</p>
                                <p className="text-sm text-green-600">
                                  Correct answer: {question.options[question.correctAnswer]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={onBack}>
                  Back to Editorial
                </Button>
                <Button onClick={onComplete}>Continue Learning</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editorial
              </Button>
              <Badge variant="secondary">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </Badge>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={cn(
                    "w-full p-4 text-left rounded-lg border-2 transition-colors",
                    selectedAnswers[currentQuestionIndex] === index
                      ? "border-secondary bg-secondary/10"
                      : "border-border hover:border-secondary/50 hover:bg-muted/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                        selectedAnswers[currentQuestionIndex] === index
                          ? "border-secondary bg-secondary text-white"
                          : "border-muted-foreground",
                      )}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={selectedAnswers[currentQuestionIndex] === undefined}>
                {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
