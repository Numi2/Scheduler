"use client"

import type React from "react"
import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"

export interface PromptProps {
  input: string
  setInput: (value: string) => void
  isLoading: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

export function Prompt({ input, setInput, isLoading, handleSubmit, handleKeyDown }: PromptProps) {
  return (
    <div className="sticky bottom-0 w-full bg-background/80 backdrop-blur-sm pt-0 pb-3 sm:pb-4 px-2 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="border-input bg-background focus-within:ring-ring/10 relative mx-auto max-w-[40rem] flex items-start rounded-[16px] sm:rounded-[20px] border-2 px-4 sm:px-6 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base focus-within:outline-none focus-within:ring-4 focus-within:ring-offset-2 min-h-[48px] sm:min-h-[56px] shadow-lg hover:shadow-xl transition-shadow duration-200 focus-within:border-primary"
      >
        <AutoResizeTextarea
          onKeyDown={handleKeyDown}
          onChange={(v) => setInput(v)}
          value={input}
          placeholder="Describe your scheduling needs..."
          className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none py-0.5 sm:py-1 leading-6 sm:leading-7 mt-0.5 sm:mt-1 text-sm sm:text-base"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 sm:top-3 right-2 sm:right-3 size-7 sm:size-8 rounded-full hover:bg-primary hover:text-primary-foreground"
                disabled={isLoading || input.trim() === ""}
              >
                <ArrowUpIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>Submit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  )
}
