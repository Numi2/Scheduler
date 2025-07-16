export interface CalendarEvent {
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location?: string
  recurrence?: "none" | "daily" | "weekly" | "monthly"
}

export function parseCalendarEvents(content: string): CalendarEvent[] {
  const calendarEventsMatch = content.match(/CALENDAR_EVENTS:\s*(\[[\s\S]*?\])/)
  if (!calendarEventsMatch) return []

  try {
    return JSON.parse(calendarEventsMatch[1])
  } catch (error) {
    console.error("Failed to parse calendar events:", error)
    return []
  }
}

export function generateICS(events: CalendarEvent[]): string {
  const formatDateTime = (date: string, time: string): string => {
    // Parse the date and time properly
    const [year, month, day] = date.split("-")
    const [hours, minutes] = time.split(":")
    const dateTime = new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
      Number.parseInt(hours),
      Number.parseInt(minutes),
    )

    // Format as YYYYMMDDTHHMMSSZ
    const utcDate = new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000)
    return utcDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")
  }

  const getRecurrenceRule = (recurrence: string): string => {
    switch (recurrence) {
      case "daily":
        return "RRULE:FREQ=DAILY"
      case "weekly":
        return "RRULE:FREQ=WEEKLY"
      case "monthly":
        return "RRULE:FREQ=MONTHLY"
      default:
        return ""
    }
  }

  const escapeText = (text: string): string => {
    return text.replace(/[\\,;]/g, "\\$&").replace(/\n/g, "\\n")
  }

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Family Calendar Assistant//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ]

  events.forEach((event, index) => {
    const uid = `event-${Date.now()}-${index}@family-calendar.com`
    const dtstart = formatDateTime(event.startDate, event.startTime)
    const dtend = formatDateTime(event.endDate, event.endTime)
    const dtstamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")

    icsLines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${escapeText(event.title)}`,
    )

    if (event.description) {
      icsLines.push(`DESCRIPTION:${escapeText(event.description)}`)
    }

    if (event.location) {
      icsLines.push(`LOCATION:${escapeText(event.location)}`)
    }

    const recurrenceRule = getRecurrenceRule(event.recurrence || "none")
    if (recurrenceRule) {
      icsLines.push(recurrenceRule)
    }

    icsLines.push("END:VEVENT")
  })

  icsLines.push("END:VCALENDAR")
  return icsLines.join("\r\n")
}

export function downloadICS(icsContent: string, filename = "family-schedule.ics"): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      console.log("Starting download process...")

      // Method 1: Try modern download API
      if ("showSaveFilePicker" in window) {
        console.log("Trying File System Access API...")
        const fileHandle = (window as any)
          .showSaveFilePicker({
            suggestedName: filename,
            types: [
              {
                description: "Calendar files",
                accept: { "text/calendar": [".ics"] },
              },
            ],
          })
          .then(async (handle: any) => {
            const writable = await handle.createWritable()
            await writable.write(icsContent)
            await writable.close()
            console.log("File saved successfully with File System Access API")
            resolve(true)
          })
          .catch((err: any) => {
            console.log("File System Access API failed:", err)
            fallbackDownload()
          })
        return
      }

      fallbackDownload()

      function fallbackDownload() {
        console.log("Using fallback download method...")

        try {
          // Create blob
          const blob = new Blob([icsContent], {
            type: "text/calendar;charset=utf-8",
          })
          console.log("Blob created:", blob)

          // Create object URL
          const url = URL.createObjectURL(blob)
          console.log("Object URL created:", url)

          // Create and configure link
          const link = document.createElement("a")
          link.href = url
          link.download = filename
          link.style.display = "none"

          console.log("Link created with href:", link.href, "download:", link.download)

          // Add to DOM
          document.body.appendChild(link)
          console.log("Link added to DOM")

          // Force click with multiple methods
          console.log("Attempting to trigger download...")

          // Method 1: Direct click
          link.click()

          // Method 2: Dispatch click event
          const clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          })
          link.dispatchEvent(clickEvent)

          console.log("Click events dispatched")

          // Cleanup after a delay
          setTimeout(() => {
            try {
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
              console.log("Cleanup completed")
            } catch (cleanupError) {
              console.log("Cleanup error:", cleanupError)
            }
          }, 1000)

          resolve(true)
        } catch (error) {
          console.error("Fallback download failed:", error)

          // Final fallback: data URI
          try {
            console.log("Trying data URI fallback...")
            const dataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`
            const newWindow = window.open(dataUri, "_blank")

            if (newWindow) {
              console.log("Data URI opened in new window")
              resolve(true)
            } else {
              console.log("Popup blocked")
              resolve(false)
            }
          } catch (dataUriError) {
            console.error("Data URI fallback failed:", dataUriError)
            resolve(false)
          }
        }
      }
    } catch (error) {
      console.error("Download completely failed:", error)
      resolve(false)
    }
  })
}
