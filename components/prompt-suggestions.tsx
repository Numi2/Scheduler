"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Heart, GraduationCap, Dumbbell, Briefcase, Users, Sparkles, Clock, Zap, Target, Brain, Rocket } from "lucide-react"

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

// Powerful templates that showcase the tool's potential
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
]

export function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  return (
    <div className="w-full space-y-4">
      {/* Header with futuristic feel */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-muted-foreground animate-pulse" />
          <h3 className="text-sm font-medium text-muted-foreground">Life-Changing Templates</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>One click to transform your life</span>
        </div>
      </div>

      {/* Horizontally scrollable templates */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {promptTemplates.map((template) => {
            const IconComponent = template.icon
            return (
              <button
                key={template.id}
                onClick={() => onSelectPrompt(template.prompt)}
                className="snap-start shrink-0 group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 w-[280px]"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${template.gradient} bg-opacity-10`}>
                        <IconComponent className="h-4 w-4 text-foreground" />
                      </div>
                      <h4 className="font-semibold text-sm">{template.title}</h4>
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {template.tag}
                  </div>

                  {/* Preview text */}
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {template.prompt}
                  </p>

                  {/* Hover indicator */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap className="h-3 w-3" />
                    <span>Click to customize</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Scroll indicators */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      {/* Smart tip */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        <span>Pro tip: Describe your ideal routine and let AI create the perfect recurring schedule</span>
      </div>
    </div>
  )
}
