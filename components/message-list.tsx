import { ErrorMessage } from "@/components/error-message"
import { CalendarEventsCard } from "@/components/calendar-events-card"
import { parseCalendarEvents } from "@/lib/calendar-utils"
import type { MessageListProps } from "@/types/message-list-props"

export function MessageList({ messages, error, isLoading, showTyping, isRetrying, handleRetry }: MessageListProps) {
  return (
    <div className="my-4 flex flex-col gap-4">
      {messages.map((message, index) => {
        const calendarEvents = message.role === "assistant" ? parseCalendarEvents(message.content) : []
        const cleanContent =
          message.role === "assistant"
            ? message.content.replace(/CALENDAR_EVENTS:\s*\[[\s\S]*?\]/g, "").trim()
            : message.content

        return (
          <div key={index} className="flex flex-col gap-2">
            <div
              data-role={message.role}
              className="max-w-[80%] rounded-xl px-3 py-2 text-sm data-[role=assistant]:self-start data-[role=user]:self-end data-[role=assistant]:bg-secondary data-[role=user]:bg-primary data-[role=assistant]:text-secondary-foreground data-[role=user]:text-primary-foreground"
            >
              {cleanContent}
            </div>
            {calendarEvents.length > 0 && (
              <div className="w-full">
                <CalendarEventsCard events={calendarEvents} />
              </div>
            )}
          </div>
        )
      })}
      {showTyping && !error && messages.length > 0 && (
        <div className="max-w-[80%] self-start rounded-xl bg-secondary h-9 flex items-center justify-center px-4 text-sm text-secondary-foreground">
          <div className="flex space-x-2">
            <div className="w-1.5 h-1.5 animate-bounce rounded-full bg-muted-foreground"></div>
            <div
              className="w-1.5 h-1.5 animate-bounce rounded-full bg-muted-foreground"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 animate-bounce rounded-full bg-muted-foreground"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      )}
      <ErrorMessage error={error} isRetrying={isRetrying} handleRetry={handleRetry} />
    </div>
  )
}
