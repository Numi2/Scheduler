"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Heart, GraduationCap, Dumbbell, Briefcase, Users, Sparkles, Clock, Zap, Target, Brain, Rocket, ChevronLeft, ChevronRight, Coffee, Book, Music } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    id: "morning-routine",
    title: "☕ Morning Vibes",
    prompt: `Help me create a relaxed morning routine: Wake up at 7 AM, enjoy coffee and breakfast, maybe some light stretching. Start next ${getNextMonday()} for 2 weeks to try it out`,
    icon: Coffee,
    gradient: "from-yellow-500 to-orange-500",
    tag: "Start Your Day Right"
  },
  {
    id: "family-time",
    title: "👨‍👩‍👧‍👦 Family Time",
    prompt: `Let's plan some quality family time: Weekend breakfast together on Saturdays at 9 AM, and maybe a movie night on Fridays at 7 PM. Try it for the next month`,
    icon: Users,
    gradient: "from-blue-500 to-purple-500",
    tag: "Connect & Enjoy"
  },
  {
    id: "date-nights",
    title: "💕 Date Ideas",
    prompt: `Schedule a casual date night every other ${getNextSaturday()} at 7 PM. Could be dinner, a walk, or just coffee. Let's try 3 dates and see how it goes`,
    icon: Heart,
    gradient: "from-pink-500 to-red-500",
    tag: "Quality Time Together"
  },
  {
    id: "fitness-start",
    title: "💪 Move More",
    prompt: `I'd like to be more active: Maybe a 30-minute walk on Monday, Wednesday, and Friday mornings at 8 AM. Let's start with just next week and see how I feel`,
    icon: Dumbbell,
    gradient: "from-green-500 to-teal-500",
    tag: "Feel Good, Move More"
  },
  {
    id: "hobby-time",
    title: "🎨 Me Time",
    prompt: `Block out some time for my hobbies: Tuesday and Thursday evenings from 7-8 PM for reading, crafts, or whatever I enjoy. Try it for 2 weeks`,
    icon: Book,
    gradient: "from-purple-500 to-indigo-500",
    tag: "Pursue Your Passions"
  },
  {
    id: "work-balance",
    title: "🎯 Work Smart",
    prompt: `Help me focus better at work: Block 2 hours of uninterrupted work time from 10 AM-12 PM on weekdays, with a proper lunch break at 1 PM. Let's try next week`,
    icon: Target,
    gradient: "from-cyan-500 to-blue-500",
    tag: "Productive & Balanced"
  },
  {
    id: "mindful-moments",
    title: "🧘 Breathe Easy",
    prompt: `Add small mindful moments: 5 minutes of deep breathing at 9 AM, and maybe journaling before bed at 9 PM. Start with just weekdays next week`,
    icon: Brain,
    gradient: "from-indigo-500 to-purple-500",
    tag: "Small Steps, Big Impact"
  },
  {
    id: "weekend-fun",
    title: "🎉 Weekend Plans",
    prompt: `Plan something fun for weekends: Saturday morning coffee at my favorite café at 10 AM, Sunday afternoon free time from 2-4 PM. Let's schedule the next 3 weekends`,
    icon: Music,
    gradient: "from-violet-500 to-purple-500",
    tag: "Enjoy Your Weekends"
  }
]

export function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll)
      return () => scrollElement.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 260 : 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Header with friendly feel - responsive text */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground animate-pulse" />
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Quick Start Ideas</h3>
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span>Pick one to get started</span>
        </div>
      </div>

      {/* Horizontally scrollable templates with navigation buttons */}
      <div className="relative group">
        {/* Navigation buttons - hidden on mobile for better UX */}
        {!isMobile && (
          <>
            <button
              onClick={() => scroll('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm transition-all duration-200 ${
                canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm transition-all duration-200 ${
                canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Scrollable container */}
        <div 
          ref={scrollRef}
          className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 snap-x snap-mandatory scrollbar-hide overscroll-x-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {promptTemplates.map((template) => {
            const IconComponent = template.icon
            return (
              <button
                key={template.id}
                onClick={() => onSelectPrompt(template.prompt)}
                className="snap-start shrink-0 group/card relative overflow-hidden rounded-lg sm:rounded-xl border bg-card p-3 sm:p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 w-[240px] sm:w-[280px] touch-manipulation"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover/card:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative space-y-2 sm:space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-gradient-to-br ${template.gradient} bg-opacity-10`}>
                        <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 text-foreground" />
                      </div>
                      <h4 className="font-semibold text-xs sm:text-sm">{template.title}</h4>
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="inline-flex items-center rounded-full bg-muted px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium text-muted-foreground">
                    {template.tag}
                  </div>

                  {/* Preview text */}
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {template.prompt}
                  </p>

                  {/* Hover/tap indicator */}
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground opacity-0 group-hover/card:opacity-100 sm:transition-opacity">
                    <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span className="hidden sm:inline">Click to try</span>
                    <span className="sm:hidden">Tap to use</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Scroll indicators - more subtle on mobile */}
        <div className={`absolute left-0 top-0 bottom-3 sm:bottom-4 w-6 sm:w-8 bg-gradient-to-r from-background to-transparent pointer-events-none ${!canScrollLeft && 'opacity-0'} transition-opacity`} />
        <div className={`absolute right-0 top-0 bottom-3 sm:bottom-4 w-6 sm:w-8 bg-gradient-to-l from-background to-transparent pointer-events-none ${!canScrollRight && 'opacity-0'} transition-opacity`} />
      </div>

      {/* Friendly tip - responsive */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground px-2 text-center">
        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
        <span>Tip: Start small and adjust as you go - you can always change your schedule later!</span>
      </div>
    </div>
  )
}
