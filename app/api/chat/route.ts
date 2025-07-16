import { type CoreMessage, streamText } from "ai"
import { groq } from "@ai-sdk/groq"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json()

    // Get current date in Oslo timezone
    const getCurrentDateOslo = () => {
      const now = new Date()
      const osloTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Oslo" }))

      return {
        fullDate: osloTime.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        isoDate: osloTime.toISOString().split("T")[0], // YYYY-MM-DD format
        dayOfWeek: osloTime.toLocaleDateString("en-US", { weekday: "long" }),
        time: osloTime.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "Europe/Oslo",
        }),
      }
    }

    const currentDate = getCurrentDateOslo()

    const result = streamText({
      model: groq("moonshotai/kimi-k2-instruct"),
      system: `You are a helpful family scheduling assistant. 

CURRENT DATE AND TIME: ${currentDate.fullDate} (${currentDate.isoDate}) at ${currentDate.time} Oslo time.
TODAY IS: ${currentDate.dayOfWeek}

When users describe their scheduling needs, you should:

1. Understand their natural language requests for family events, appointments, activities, AND TAKE INTO ACCOUNT WHAT DATE IT IS TODAY
2. When users say "next Saturday", "this weekend", "tomorrow", etc., calculate the correct dates based on today being ${currentDate.fullDate}
3. Create structured calendar events with appropriate details
4. Always respond with calendar events in this exact EXAMPLE JSON format within your response:

CALENDAR_EVENTS:
[
  {
    "title": "Event Title",
    "description": "Event description",
    "startDate": "YYYY-MM-DD",
    "startTime": "HH:MM",
    "endDate": "YYYY-MM-DD", 
    "endTime": "HH:MM",
    "location": "Location if provided",
    "recurrence": "none|daily|weekly|monthly"
  }
]

Always include the CALENDAR_EVENTS: prefix before the JSON array. Use 24-hour time format and YYYY-MM-DD date format.

For recurring events, set appropriate recurrence patterns. If no specific time is mentioned, suggest reasonable times based on the activity type.

When calculating dates:
- "Tomorrow" = ${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
- "Next week" = starting from ${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
- Always be precise with date calculations based on today being ${currentDate.isoDate}

Provide helpful explanations about the events you're creating and ask clarifying questions if needed.`,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "There was a problem with the AI service",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
