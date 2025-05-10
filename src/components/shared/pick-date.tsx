'use client'

import { DateField, DateInput } from '@/components/ui/datefield-rac'
import { cn } from '@/lib/utils'
import { CalendarDate } from '@internationalized/date'
import { InputHTMLAttributes, useEffect, useState } from 'react'
import { Label } from '../ui/label'

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

// Helper function to convert Date to CalendarDate
const dateToCalendarDate = (date: Date): CalendarDate => {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  )
}

// Helper function to convert CalendarDate to Date
const calendarDateToDate = (calendarDate: CalendarDate): Date => {
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)
}

export default function PickDate({
  label,
  onChangeDate,
  classNames,
  error,
  defaultValue,
  value,
}: Props) {
  // Use value prop if provided, otherwise use defaultValue
  const initialDate = value || defaultValue
  
  // Convert initial date to CalendarDate only if a date is provided
  const [calendarDate, setCalendarDate] = useState<CalendarDate | null>(
    initialDate ? dateToCalendarDate(new Date(initialDate)) : null
  )

  // Update calendarDate when value prop changes
  useEffect(() => {
    if (value) {
      const newCalendarDate = dateToCalendarDate(new Date(value))
      // Only update if different to avoid infinite loops
      if (!calendarDate || newCalendarDate.compare(calendarDate) !== 0) {
        setCalendarDate(newCalendarDate)
      }
    } else if (value === null || value === undefined) {
      // If value is explicitly null/undefined, clear the date
      setCalendarDate(null)
    }
  }, [value, calendarDate])

  // Notify parent component when date changes
  const handleDateChange = (date: CalendarDate | null) => {
    setCalendarDate(date)
    // Convert to JavaScript Date and call the callback only if date exists
    onChangeDate(date ? calendarDateToDate(date) : undefined)
  }

  return (
    <DateField
      className={cn('*:not-first:mt-2', classNames?.container)}
      onChange={handleDateChange}
      value={calendarDate}>
      <Label
        className={cn(
          'text-foreground text-sm font-medium',
          classNames?.label,
        )}>
        {label}
      </Label>
      <DateInput
        className={cn(
          'w-full p-2 text-left border border-blue-500 rounded-sm focus:outline-none focus:ring focus:ring-blue-300 text-black',
          classNames?.input,
        )}
      />
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
