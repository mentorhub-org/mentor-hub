import { cn } from '@/lib/utils'

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function Title({ className, children }: Props) {
  return (
    <h3
      style={{
        backgroundImage:
          'linear-gradient(55.08deg, #137BDD 20.31%, #4DB7FF 72.54%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      className={cn(
        'text-2xl sm:text-3xl font-bold bg-gradient-to-tr from-darkblue to-light  bg-clip-text text-transparent mb-2',
        className,
      )}>
      {children}
    </h3>
  )
}
