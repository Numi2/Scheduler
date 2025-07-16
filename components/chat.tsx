"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { Intro } from "@/components/intro"
import { MessageList } from "@/components/message-list"
import { Prompt } from "@/components/prompt"
import { PromptSuggestions } from "@/components/prompt-suggestions"

export interface ChatProps extends React.ComponentProps<"form"> {
  className?: string
}

export function Chat({ className, ...props }: ChatProps) {
  const [isRetrying, setIsRetrying] = useState(false)
  const [showTyping, setShowTyping] = useState(false)

  const { messages, input, setInput, append, isLoading, error, reload } = useChat({
    api: "/api/chat",
  })

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowTyping(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setShowTyping(false)
    }
  }, [isLoading])

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === "assistant") {
      setShowTyping(false)
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void append({ content: input, role: "user" })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await reload()
    } catch (err) {
      console.error("Retry failed:", err)
    } finally {
      setIsRetrying(false)
    }
  }

  const handleSelectPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className={cn("flex min-h-screen flex-col px-3", className)} {...props}>
      <div className="flex-1 mx-auto w-full max-w-[35rem] px-3 pb-0">
        {messages.length ? (
          <MessageList
            messages={messages}
            error={error}
            isLoading={isLoading}
            showTyping={showTyping}
            isRetrying={isRetrying}
            handleRetry={handleRetry}
          />
        ) : (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-4xl space-y-8">
              <div className="max-w-md mx-auto">
                <Intro
                  title="Family Calendar Assistant"
                  description="Create calendar events from natural language. Describe your family's scheduling needs and get downloadable .ics files."
                  connectionMessage="Connect to Groq using the Vercel Integration to get started."
                />
              </div>
              <PromptSuggestions onSelectPrompt={handleSelectPrompt} />
            </div>
          </div>
        )}
      </div>

      <Prompt
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
      />
    </div>
  )
}
