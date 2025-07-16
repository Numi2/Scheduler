export interface IntroProps {
  title: string
  description: string
  connectionMessage: string
}

export function Intro({ title, description, connectionMessage }: IntroProps) {
  return (
    <header className="flex flex-col gap-5 text-center">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">{title}</h2>
      
      
    </header>
  )
}
