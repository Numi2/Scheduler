import { Chat } from "@/components/chat"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Family Calendar Assistant - Create Events with AI",
  description:
    "Transform your family scheduling with AI. Describe your events in natural language and get downloadable .ics calendar files. Works with Google Calendar, Apple Calendar, and Outlook.",
  openGraph: {
    title: "Family Calendar Assistant - Create Events with AI",
    description:
      "Transform your family scheduling with AI. Describe your events in natural language and get downloadable .ics calendar files.",
    url: "https://family-calendar-assistant.vercel.app",
    type: "website",
  },
}

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Family Calendar Assistant - AI-Powered Scheduling Tool for Families</h1>
      <Chat />
    </>
  )
}
