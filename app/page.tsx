import { Chat } from "@/components/chat"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Calendar Assistant - Create Habits in your own cal with AI",
  description:
    "Repetetive scheduling with AI. Describe your events in natural language and get downloadable .ics calendar files. Works with Google Calendar, Apple Calendar, and Outlook.",
  openGraph: {
    title: "Free Calendar Assistant - Create Events with AI",
    description:
      "Repetetive scheduling with AI. Describe your events in natural language and get downloadable .ics calendar files. Works with Google Calendar, Apple Calendar, and Outlook. Describe your events in natural language and get downloadable .ics calendar files.",
    url: "https://scheduleapp.org",
    type: "website",
  },
}

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Free Calendar Assistant - Free .ics calendar files for all calendars</h1>
      <Chat />
    </>
  )
}
