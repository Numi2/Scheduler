import type { CoreMessage } from "ai"

export interface MessageListProps {
  messages: CoreMessage[]
  error: Error | null
  isLoading: boolean
  showTyping: boolean
  isRetrying: boolean
  handleRetry: () => Promise<void>
}
