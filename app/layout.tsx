import { cn } from "@/lib/utils"
import { Geist } from "next/font/google"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Family Calendar Assistant - AI-Powered Scheduling Tool",
  description:
    "Create calendar events from natural language. Describe your family's scheduling needs and get downloadable .ics files for Google Calendar, Apple Calendar, and Outlook. Free AI-powered family scheduling assistant.",
  keywords:
    "family calendar, AI scheduling, calendar assistant, .ics generator, family planning, schedule maker, calendar events, Google Calendar, Apple Calendar, Outlook",
  authors: [{ name: "Family Calendar Assistant" }],
  creator: "Family Calendar Assistant",
  publisher: "Family Calendar Assistant",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://family-calendar-assistant.vercel.app",
    title: "Family Calendar Assistant - AI-Powered Scheduling Tool",
    description:
      "Create calendar events from natural language. Describe your family's scheduling needs and get downloadable .ics files for any calendar app.",
    siteName: "Family Calendar Assistant",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Family Calendar Assistant - AI-Powered Scheduling Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Calendar Assistant - AI-Powered Scheduling Tool",
    description: "Create calendar events from natural language. Get downloadable .ics files for any calendar app.",
    images: ["/og-image.png"],
    creator: "@familycalendar",
  },
  alternates: {
    canonical: "https://family-calendar-assistant.vercel.app",
  },
  category: "productivity",
    generator: 'v0.dev'
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={cn("antialiased", geist.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main role="main">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
