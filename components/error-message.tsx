"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ErrorMessageProps {
  error: Error | null
  isRetrying: boolean
  handleRetry: () => Promise<void>
}

export function ErrorMessage({ error, isRetrying, handleRetry }: ErrorMessageProps) {
  if (!error) return null

  const isCreditsError =
    error.message.includes("used all available credits") || error.message.includes("reached its monthly spending limit")

  return (
    <div className="max-w-[80%] self-start my-4 overflow-hidden rounded-xl border border-destructive/20 bg-destructive/10 shadow-sm dark:border-destructive/30 dark:bg-background">
      <div className="flex flex-col p-4">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 dark:bg-destructive/30">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
          <h3 className="ml-3 text-sm font-medium text-destructive">
            {isCreditsError ? "Credits Exhausted" : "Connection Error"}
          </h3>
        </div>
        <div className="mt-2 text-sm text-destructive/90">
          {isCreditsError ? (
            <p>
              Your team has either used all available credits or reached its monthly spending limit. Please purchase
              more credits or raise your spending limit to continue.
            </p>
          ) : (
            <p>We couldn't connect to Groq at the moment.</p>
          )}
        </div>
        <div className="mt-3 flex justify-end space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isRetrying}
            className="border-destructive/30 bg-background text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive"
          >
            {isRetrying ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
