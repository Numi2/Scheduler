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
    <div className="sticky bottom-0 w-full bg-background/80 backdrop-blur-sm pt-0 pb-4">
      <form
        onSubmit={handleSubmit}
        className="border-input bg-background focus-within:ring-ring/10 relative mx-auto max-w-[40rem] flex items-start rounded-[20px] border-2 px-6 py-3 pr-12 text-base focus-within:outline-none focus-within:ring-4 focus-within:ring-offset-2 min-h-[56px] shadow-lg hover:shadow-xl transition-shadow duration-200 focus-within:border-primary"
      >
        <AutoResizeTextarea
          onKeyDown={handleKeyDown}
          onChange={(v) => setInput(v)}
          value={input}
          placeholder="Describe your scheduling needs or use a template above..."
          className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none py-1 leading-7 mt-1 text-base"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-3 right-3 size-8 rounded-full hover:bg-primary hover:text-primary-foreground"
                disabled={isLoading || input.trim() === ""}
              >
                <ArrowUpIcon size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>Submit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  )
}
