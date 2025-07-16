"use client"

import { Calendar, Download, MapPin, Clock, Repeat, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import type { CalendarEvent } from "@/lib/calendar-utils"
import { generateICS, downloadICS } from "@/lib/calendar-utils"

export interface CalendarEventsCardProps {
  events: CalendarEvent[]
}

export function CalendarEventsCard({ events }: CalendarEventsCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<string>("")

  if (events.length === 0) return null

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      setDownloadStatus("Preparing download...")

      console.log("Starting download for events:", events)

      const icsContent = generateICS(events)
      console.log("Generated ICS content:", icsContent)

      const filename = `family-schedule-${new Date().toISOString().split("T")[0]}.ics`

      setDownloadStatus("Downloading...")
      const success = await downloadICS(icsContent, filename)

      if (success) {
        setDownloadStatus("Download completed!")
        setTimeout(() => setDownloadStatus(""), 3000)
      } else {
        setDownloadStatus("Download failed - try copy option")
        setTimeout(() => setDownloadStatus(""), 5000)
      }
    } catch (error) {
      console.error("Download error:", error)
      setDownloadStatus("Download failed")
      setTimeout(() => setDownloadStatus(""), 3000)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      const icsContent = generateICS(events)
      await navigator.clipboard.writeText(icsContent)
      setDownloadStatus("Copied to clipboard!")
      setTimeout(() => setDownloadStatus(""), 3000)
    } catch (error) {
      console.error("Copy failed:", error)
      setDownloadStatus("Copy failed")
      setTimeout(() => setDownloadStatus(""), 3000)
    }
  }

  const handleOpenInNewTab = () => {
    try {
      const icsContent = generateICS(events)
      const dataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`
      const newWindow = window.open(dataUri, "_blank")

      if (!newWindow) {
        setDownloadStatus("Please allow popups")
        setTimeout(() => setDownloadStatus(""), 3000)
      } else {
        setDownloadStatus("Opened in new tab")
        setTimeout(() => setDownloadStatus(""), 3000)
      }
    } catch (error) {
      console.error("Open in tab failed:", error)
      setDownloadStatus("Failed to open")
      setTimeout(() => setDownloadStatus(""), 3000)
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getRecurrenceLabel = (recurrence: string) => {
    switch (recurrence) {
      case "daily":
        return "Daily"
      case "weekly":
        return "Weekly"
      case "monthly":
        return "Monthly"
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5" />
          Calendar Events Created ({events.length})
        </CardTitle>
        <div className="flex gap-2">
          <Button onClick={handleDownload} size="sm" className="gap-2" disabled={isDownloading}>
            <Download className="h-4 w-4" />
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
          <Button onClick={handleCopyToClipboard} size="sm" variant="outline" className="gap-2 bg-transparent">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button onClick={handleOpenInNewTab} size="sm" variant="outline" className="gap-2 bg-transparent">
            <ExternalLink className="h-4 w-4" />
            Open
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {downloadStatus && <div className="text-sm text-center p-2 bg-muted rounded-lg">{downloadStatus}</div>}

        {events.map((event, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-base">{event.title}</h3>
              {event.recurrence && event.recurrence !== "none" && (
                <Badge variant="secondary" className="gap-1">
                  <Repeat className="h-3 w-3" />
                  {getRecurrenceLabel(event.recurrence)}
                </Badge>
              )}
            </div>

            {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {formatDate(event.startDate)} • {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </span>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        ))}

        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
          <p className="font-medium mb-1">Multiple download options:</p>
          <ul className="space-y-1">
            <li>
              • <strong>Download:</strong> Save .ics file directly
            </li>
            <li>
              • <strong>Copy:</strong> Copy content to clipboard, then save as .ics file
            </li>
            <li>
              • <strong>Open:</strong> View content in new tab, then save manually
            </li>
          </ul>
          <p className="font-medium mt-2 mb-1">Import to calendar:</p>
          <ul className="space-y-1">
            <li>
              • <strong>Google Calendar:</strong> Settings → Import & Export → Import
            </li>
            <li>
              • <strong>Apple Calendar:</strong> File → Import → Select .ics file
            </li>
            <li>
              • <strong>Outlook:</strong> File → Open & Export → Import/Export
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
