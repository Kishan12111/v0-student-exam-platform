"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import type { VocabularyWord } from "@/lib/data"

interface VocabularyTooltipProps {
  word: VocabularyWord
  language: "english" | "hindi"
  children: React.ReactNode
}

export function VocabularyTooltip({ word, language, children }: VocabularyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const playPronunciation = () => {
    // In a real app, this would use text-to-speech API
    console.log(`Playing pronunciation for: ${word.word}`)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80" side="top">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{word.word}</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {word.difficulty}
              </Badge>
              <Button variant="ghost" size="sm" onClick={playPronunciation}>
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Pronunciation:</span> {word.pronunciation}
            </p>
            <p className="text-sm">
              <span className="font-medium">Meaning:</span> {language === "english" ? word.meaning : word.hindiMeaning}
            </p>
            <p className="text-sm">
              <span className="font-medium">Example:</span> {word.example}
            </p>
            <Badge variant="secondary" className="text-xs">
              {word.category}
            </Badge>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
