export interface IntroProps {
  title: string
  description: string
  connectionMessage: string
}

export function Intro({ title, description, connectionMessage }: IntroProps) {
  return (
    <header className="flex flex-col gap-3 sm:gap-5 text-center">
      <h2 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight">{title}</h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
      
    </header>
  )
}
