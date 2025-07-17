"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Heart, GraduationCap, Dumbbell, Apple } from "lucide-react"

export interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void
}

const getCurrentDateInfo = () => {
  const today = new Date()
  const osloTime = new Date(today.toLocaleString("en-US", { timeZone: "Europe/Oslo" }))

  return {
    fullDate: osloTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    dayOfWeek: osloTime.toLocaleDateString("en-US", { weekday: "long" }),
  }
}

const getNextSaturday = () => {
  const today = new Date()
  const osloTime = new Date(today.toLocaleString("en-US", { timeZone: "Europe/Oslo" }))
  const nextSaturday = new Date(osloTime)
  const daysUntilSaturday = (6 - osloTime.getDay()) % 7 || 7
  nextSaturday.setDate(osloTime.getDate() + daysUntilSaturday)
  return nextSaturday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })
}

const getNextTuesday = () => {
  const today = new Date()
  const osloTime = new Date(today.toLocaleString("en-US", { timeZone: "Europe/Oslo" }))
  const nextTuesday = new Date(osloTime)
  const daysUntilTuesday = (2 - osloTime.getDay() + 7) % 7 || 7
  nextTuesday.setDate(osloTime.getDate() + daysUntilTuesday)
  return nextTuesday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })
}

const getNextMonday = () => {
  const today = new Date()
  const osloTime = new Date(today.toLocaleString("en-US", { timeZone: "Europe/Oslo" }))
  const nextMonday = new Date(osloTime)
  const daysUntilMonday = (1 - osloTime.getDay() + 7) % 7 || 7
  nextMonday.setDate(osloTime.getDate() + daysUntilMonday)
  return nextMonday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })
}

const promptTemplates = [
  {
    category: "Date Nights & Romance",
    icon: Heart,
    color: "text-pink-500",
    prompts: [
      `Schedule date night starting ${getNextSaturday()} at 8:00 PM, then every Saturday for the next 4 weeks`,
      `Plan romantic dinner every Friday at 7:30 PM starting this week through the end of the month`,
      `Set up weekly movie night every Thursday at 8:00 PM beginning this week`,
    ],
  },
  {
    category: "Kids Activities",
    icon: GraduationCap,
    color: "text-blue-500",
    prompts: [
      `Soccer practice every Tuesday and Thursday at 4:00 PM starting ${getNextTuesday()}`,
      `Piano lessons every Wednesday at 3:30 PM beginning next week for 8 weeks`,
      `Swimming lessons every Saturday at 10:00 AM starting this weekend for 6 weeks`,
    ],
  },
  {
    category: "Workout & Fitness",
    icon: Dumbbell,
    color: "text-orange-500",
    prompts: [
      `Morning gym session every Monday, Wednesday, and Friday at 6:30 AM starting ${getNextMonday()}`,
      `Yoga class every Tuesday and Thursday at 7:00 PM for the next 4 weeks`,
      `Weekend running group every Saturday at 7:00 AM and Sunday at 8:00 AM starting this weekend`,
      `HIIT training every weekday at 5:30 PM starting tomorrow for 30 days`,
    ],
  },
  {
    category: "Meal Planning & Diet",
    icon: Apple,
    color: "text-green-500",
    prompts: [
      `Meal prep every Sunday at 2:00 PM for the next 8 weeks`,
      `Weekly grocery shopping every Saturday at 10:00 AM starting this weekend`,
      `Intermittent fasting reminder: eating window 12:00 PM - 8:00 PM daily starting tomorrow`,
      `Family dinner planning session every Sunday at 5:00 PM for the month`,
    ],
  },
]

export function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  const currentDate = getCurrentDateInfo()

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Quick Start Templates</h2>
        <p className="text-sm text-muted-foreground">
          Today is {currentDate.fullDate}. Click any template below to customize and create your schedule.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {promptTemplates.map((category, categoryIndex) => {
          const IconComponent = category.icon
          return (
            <Card key={categoryIndex} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <IconComponent className={`h-5 w-5 ${category.color}`} />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.prompts.map((prompt, promptIndex) => (
                  <Button
                    key={promptIndex}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3 text-sm hover:bg-muted/50 border-2"
                    onClick={() => onSelectPrompt(prompt)}
                  >
                    <span className="line-clamp-3">{prompt}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-full px-3 py-1">
          <Calendar className="h-3 w-3" />
          {""}
        </div>
      </div>
    </div>
  )
}
