'use client'

import { cn } from '@/lib/utils'
import { Label } from '../ui/label'

import { DateField, DateInput } from '@/components/ui/datefield-rac'
import { InputHTMLAttributes, useEffect, useState } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onChangeDate: (date: Date | undefined) => void
  lable: string
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
  lable,
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
        {lable}
      </Label>
      <DateInput className={cn('', classNames?.input)} />
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
