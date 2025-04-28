'use client'

import { cn } from '@/lib/utils'
import { Label } from '../ui/label'

import { DateField, DateInput } from '@/components/ui/datefield-rac'
import { InputHTMLAttributes, useEffect, useState } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onChangeDate: (date: Date | undefined) => void
  label: string
  error?: string
  value?: string | Date
  defaultValue?: string | Date
  disabled?: boolean
  classNames?: {
    container?: string
    input?: string
    label?: string
    error?: string
  }
}

export default function PickDate({
  label,
  onChangeDate,
  classNames,
  error,
  defaultValue,
}: Props) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined,
  )

  // Sync date with onChangeDate prop
  useEffect(() => {
    onChangeDate(date)
  }, [date, onChangeDate])

  // Sync date with defaultValue prop
  useEffect(() => {
    setDate(defaultValue ? new Date(defaultValue) : undefined)
  }, [defaultValue])

  return (
    <DateField
      className={cn('*:not-first:mt-2', classNames?.container)}
      onChange={e => e && onChangeDate(new Date(e.toDate('America/New_York')))}>
      <Label
        className={cn(
          'text-foreground text-sm font-medium',
          classNames?.label,
        )}>
        {label}
      </Label>
      <DateInput className={cn('w-full p-2 text-left border border-blue-500 rounded-sm focus:outline-none focus:ring focus:ring-blue-300 text-black', classNames?.input)} />
      {error && (
        <p
          className={cn(
            'mt-2 absolute top-full text-xs text-destructive',
            classNames?.error,
          )}
          role="alert"
          aria-live="polite">
          {error}
        </p>
      )}
    </DateField>
  )
}
