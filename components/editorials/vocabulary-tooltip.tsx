"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { VocabularyWord } from "@/lib/data"
import { Volume2 } from "lucide-react"

interface VocabularyTooltipProps {
  vocabularyWords: VocabularyWord[]
  language: "english" | "hindi"
}

export function VocabularyTooltip({ vocabularyWords, language }: VocabularyTooltipProps) {
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleWordClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.classList.contains("vocabulary-word")) {
        const word = target.getAttribute("data-word")
        const vocabularyWord = vocabularyWords.find((vw) => vw.word === word)

        if (vocabularyWord) {
          setSelectedWord(vocabularyWord)
          setPosition({ x: event.clientX, y: event.clientY })
          setIsVisible(true)
        }
      } else {
        setIsVisible(false)
      }
    }

    document.addEventListener("click", handleWordClick)
    return () => document.removeEventListener("click", handleWordClick)
  }, [vocabularyWords])

  const handlePlayPronunciation = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  if (!isVisible || !selectedWord) return null

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: Math.min(position.x, window.innerWidth - 320),
        top: Math.max(position.y - 200, 10),
      }}
    >
      <Card className="w-80 shadow-lg border-2 pointer-events-auto">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {selectedWord.word}
              {selectedWord.pronunciation && (
                <button
                  onClick={() => handlePlayPronunciation(selectedWord.word)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </CardTitle>
            <Badge variant="secondary">Vocabulary</Badge>
          </div>
          {selectedWord.pronunciation && (
            <CardDescription className="text-sm font-mono">/{selectedWord.pronunciation}/</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-1">{language === "english" ? "Meaning" : "अर्थ"}</h4>
            <p className="text-sm text-muted-foreground">
              {language === "english" ? selectedWord.meaning : selectedWord.hindiMeaning}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-1">{language === "english" ? "Example" : "उदाहरण"}</h4>
            <p className="text-sm text-muted-foreground italic">"{selectedWord.example}"</p>
          </div>

          {language === "english" && (
            <div>
              <h4 className="font-medium text-sm mb-1">Hindi Translation</h4>
              <p className="text-sm text-muted-foreground">{selectedWord.hindiMeaning}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
