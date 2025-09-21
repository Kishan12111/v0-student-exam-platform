"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { VocabularyWord } from "@/lib/data"
import { BookOpen, Brain, Search, Volume2, Star, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface VocabularyBuilderProps {
  words: VocabularyWord[]
}

export function VocabularyBuilder({ words }: VocabularyBuilderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [masteredWords, setMasteredWords] = useState<Set<string>>(new Set())
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")

  const filteredWords = words.filter(
    (word) =>
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentWord = words[currentWordIndex]
  const progress = ((currentWordIndex + 1) / words.length) * 100

  const handleNextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length)
    setShowAnswer(false)
  }

  const handlePreviousWord = () => {
    setCurrentWordIndex((prev) => (prev - 1 + words.length) % words.length)
    setShowAnswer(false)
  }

  const handleMasterWord = (word: string) => {
    setMasteredWords((prev) => new Set([...prev, word]))
  }

  const handlePlayPronunciation = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Brain className="w-6 h-6 text-secondary" />
            Vocabulary Builder
          </h2>
          <p className="text-muted-foreground">Expand your vocabulary with interactive learning tools</p>
        </div>

        <Tabs defaultValue="flashcards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="browse">Browse Words</TabsTrigger>
            <TabsTrigger value="quiz">Vocabulary Quiz</TabsTrigger>
          </TabsList>

          {/* Flashcards Tab */}
          <TabsContent value="flashcards" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-96">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Word {currentWordIndex + 1} of {words.length}
                      </CardTitle>
                      <Badge variant={masteredWords.has(currentWord?.word) ? "default" : "outline"}>
                        {masteredWords.has(currentWord?.word) ? "Mastered" : "Learning"}
                      </Badge>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-center">
                    {currentWord && (
                      <div className="text-center space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-3">
                            <h3 className="text-4xl font-bold">{currentWord.word}</h3>
                            <Button variant="ghost" size="sm" onClick={() => handlePlayPronunciation(currentWord.word)}>
                              <Volume2 className="w-5 h-5" />
                            </Button>
                          </div>
                          {currentWord.pronunciation && (
                            <p className="text-lg text-muted-foreground font-mono">/{currentWord.pronunciation}/</p>
                          )}
                        </div>

                        {showAnswer ? (
                          <div className="space-y-4 animate-in fade-in-50">
                            <div className="p-4 bg-muted rounded-lg">
                              <p className="text-lg mb-2">
                                <strong>English:</strong> {currentWord.meaning}
                              </p>
                              <p className="text-lg mb-2">
                                <strong>Hindi:</strong> {currentWord.hindiMeaning}
                              </p>
                              <p className="text-sm text-muted-foreground italic">
                                <strong>Example:</strong> "{currentWord.example}"
                              </p>
                            </div>
                            <div className="flex gap-2 justify-center">
                              <Button
                                variant="outline"
                                onClick={() => handleMasterWord(currentWord.word)}
                                disabled={masteredWords.has(currentWord.word)}
                              >
                                <Star className="w-4 h-4 mr-2" />
                                {masteredWords.has(currentWord.word) ? "Mastered" : "Mark as Mastered"}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button onClick={() => setShowAnswer(true)} size="lg">
                            Show Meaning
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={handlePreviousWord}>
                    Previous
                  </Button>
                  <Button onClick={handleNextWord}>Next Word</Button>
                </div>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Words Mastered</span>
                        <span>
                          {masteredWords.size}/{words.length}
                        </span>
                      </div>
                      <Progress value={(masteredWords.size / words.length) * 100} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{masteredWords.size}</div>
                        <div className="text-xs text-muted-foreground">Mastered</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{words.length - masteredWords.size}</div>
                        <div className="text-xs text-muted-foreground">Learning</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full bg-transparent" onClick={() => setCurrentWordIndex(0)}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Restart
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Brain className="w-4 h-4 mr-2" />
                      Review Mastered
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Browse Words Tab */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search words or meanings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWords.map((word, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {word.word}
                        <Button variant="ghost" size="sm" onClick={() => handlePlayPronunciation(word.word)}>
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                      <Badge variant={masteredWords.has(word.word) ? "default" : "outline"}>
                        {masteredWords.has(word.word) ? "Mastered" : "Learning"}
                      </Badge>
                    </div>
                    {word.pronunciation && (
                      <CardDescription className="font-mono">/{word.pronunciation}/</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">English</p>
                      <p className="text-sm text-muted-foreground">{word.meaning}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Hindi</p>
                      <p className="text-sm text-muted-foreground">{word.hindiMeaning}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Example</p>
                      <p className="text-sm text-muted-foreground italic">"{word.example}"</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => handleMasterWord(word.word)}
                      disabled={masteredWords.has(word.word)}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      {masteredWords.has(word.word) ? "Mastered" : "Mark as Mastered"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vocabulary Quiz Tab */}
          <TabsContent value="quiz">
            <VocabularyQuiz words={words} masteredWords={masteredWords} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function VocabularyQuiz({
  words,
  masteredWords,
}: {
  words: VocabularyWord[]
  masteredWords: Set<string>
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizWords] = useState(() => words.slice(0, 5)) // Quiz with 5 words

  const currentWord = quizWords[currentQuestionIndex]
  const options = [
    currentWord?.meaning,
    ...words
      .filter((w) => w.word !== currentWord?.word)
      .slice(0, 3)
      .map((w) => w.meaning),
  ].sort(() => Math.random() - 0.5)

  const correctAnswerIndex = options.indexOf(currentWord?.meaning)

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === correctAnswerIndex) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < quizWords.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const progress = ((currentQuestionIndex + 1) / quizWords.length) * 100

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Vocabulary Quiz</span>
          <Badge variant="secondary">
            {currentQuestionIndex + 1} / {quizWords.length}
          </Badge>
        </CardTitle>
        <Progress value={progress} />
      </CardHeader>
      <CardContent className="space-y-6">
        {currentWord && (
          <>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{currentWord.word}</h3>
              <p className="text-muted-foreground">What does this word mean?</p>
            </div>

            <div className="space-y-3">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 text-left rounded-lg border-2 transition-colors",
                    !showResult && "hover:border-secondary/50 hover:bg-muted/50",
                    showResult && index === correctAnswerIndex && "border-green-500 bg-green-50",
                    showResult &&
                      selectedAnswer === index &&
                      index !== correctAnswerIndex &&
                      "border-red-500 bg-red-50",
                    !showResult && "border-border",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="text-center space-y-4">
                <div
                  className={cn(
                    "text-lg font-medium",
                    selectedAnswer === correctAnswerIndex ? "text-green-600" : "text-red-600",
                  )}
                >
                  {selectedAnswer === correctAnswerIndex ? "Correct!" : "Incorrect"}
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Example:</strong> "{currentWord.example}"
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Hindi:</strong> {currentWord.hindiMeaning}
                  </p>
                </div>
                {currentQuestionIndex < quizWords.length - 1 ? (
                  <Button onClick={handleNext}>Next Question</Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      Quiz Complete! Score: {score}/{quizWords.length}
                    </p>
                    <Button onClick={() => window.location.reload()}>Restart Quiz</Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
