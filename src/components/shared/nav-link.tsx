'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link> & {
  activeClassName?: string
}

export default function NavLink({
  className,
  activeClassName,
  ...props
}: Props) {
  const path = usePathname()

  return (
    <Link
      {...props}
      className={cn(className, path == props.href && activeClassName)}
    />
  )
}
