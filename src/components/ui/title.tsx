import { cn } from '@/lib/utils'

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function Title({ className, children }: Props) {
  return (
    <h3
      style={{
        color: 'linear-gradient(55.08deg, #137BDD 20.31%, #4DB7FF 72.54%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      className={cn('', className)}>
      {children}
    </h3>
  )
}
