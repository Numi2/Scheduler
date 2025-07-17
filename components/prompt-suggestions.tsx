"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Heart, GraduationCap, Dumbbell, Briefcase, Users, Sparkles, Clock, Zap, Target, Brain, Rocket, ChevronLeft, ChevronRight } from "lucide-react"
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
    id: "power-start",
    title: "⚡ Power Start",
    prompt: `Create my perfect morning routine: 5:30 AM wake up, 5:45 AM meditation, 6:00 AM workout, 6:45 AM cold shower, 7:00 AM healthy breakfast. Schedule this Monday-Friday starting ${getNextMonday()}`,
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
    tag: "Transform Your Mornings"
  },
  {
    id: "family-sync",
    title: "👨‍👩‍👧‍👦 Family Sync",
    prompt: `Set up our family routine: Kids homework 4-5 PM, family dinner 6:30 PM, bedtime stories 8 PM. Add weekend family time Saturday 10 AM. Start this week, repeat for 3 months`,
    icon: Users,
    gradient: "from-blue-500 to-purple-500",
    tag: "Harmony at Home"
  },
  {
    id: "date-nights",
    title: "💕 Love Rituals",
    prompt: `Schedule date night every ${getNextSaturday()} at 7 PM for next 8 weeks. Alternate between dinner out and home movie night. Add reminder to book babysitter 2 days before`,
    icon: Heart,
    gradient: "from-pink-500 to-red-500",
    tag: "Keep Romance Alive"
  },
  {
    id: "fitness-goals",
    title: "💪 Fitness Journey",
    prompt: `Plan my workout schedule: Monday/Wednesday/Friday gym 6 AM, Tuesday/Thursday yoga 7 PM, Saturday morning run 8 AM. Include rest day Sunday. Start next week for 12 weeks`,
    icon: Dumbbell,
    gradient: "from-green-500 to-teal-500",
    tag: "Build Your Best Self"
  },
  {
    id: "kids-growth",
    title: "🌟 Kids Activities",
    prompt: `Soccer practice Tuesday/Thursday 4 PM starting ${getNextTuesday()}, Piano lessons Wednesday 3:30 PM, Swimming Saturday 10 AM. Schedule for 8 weeks with progress check reminders`,
    icon: GraduationCap,
    gradient: "from-purple-500 to-indigo-500",
    tag: "Nurture Their Talents"
  },
  {
    id: "work-life",
    title: "🎯 Work-Life Balance",
    prompt: `Block focus time 9-11 AM daily for deep work, lunch break 12:30-1:30 PM, family time 5:30 PM sharp. No meetings Friday afternoons. Implement starting Monday`,
    icon: Target,
    gradient: "from-cyan-500 to-blue-500",
    tag: "Master Your Time"
  },
  {
    id: "mindfulness",
    title: "🧘 Mindful Living",
    prompt: `Daily meditation 6 AM (20 min), gratitude journaling before bed 9:30 PM, Sunday reflection hour 4 PM, monthly digital detox first Saturday. Begin this week`,
    icon: Brain,
    gradient: "from-indigo-500 to-purple-500",
    tag: "Inner Peace Daily"
  },
  {

    id: "side-hustle",
    title: "🚀 Side Project",
    prompt: `Dedicate 5-7 AM weekdays to side business, Saturday 8 AM-12 PM for planning/strategy, Sunday evening 7-9 PM for week prep. Schedule for next 90 days with milestone reminders`,
    icon: Rocket,
    gradient: "from-violet-500 to-purple-500",
    tag: "Build Your Dream"
  }

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
      {/* Header with futuristic feel - responsive text */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground animate-pulse" />
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Life-Changing Templates</h3>
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span>One click to transform your life</span>
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
                    <span className="hidden sm:inline">Click to customize</span>
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

      {/* Smart tip - responsive */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground px-2 text-center">
        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
        <span>Pro tip: Describe your ideal routine and let AI create the perfect recurring schedule</span>
      </div>
    </div>
  )
}
