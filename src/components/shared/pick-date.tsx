import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useId, useState, type InputHTMLAttributes } from 'react'

type PickDate = InputHTMLAttributes<HTMLInputElement> & {
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
  onChangeDate,
  lable,
  placeholder = 'Select your birth date',
  defaultValue,
  error,
  classNames,
  disabled = false,
}: PickDate) {
  const id = useId()
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

  // Custom caption to remove month dropdown and style year dropdown
  const CustomCaption = ({ displayMonth }: { displayMonth: Date }) => {
    const year = displayMonth.getFullYear()
    return (
      <div className="flex items-center justify-center p-2 border-b">
        <span className="text-lg font-semibold mr-2">
          {format(displayMonth, 'MMMM yyyy')}
        </span>
        <select
          value={year}
          onChange={e => {
            const newYear = parseInt(e.target.value, 10)
            const newDate = new Date(displayMonth)
            newDate.setFullYear(newYear)
            setDate(newDate)
          }}
          className="p-1 border rounded-md text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring">
          {Array.from(
            { length: new Date().getFullYear() - 1900 + 1 },
            (_, i) => 1900 + i,
          ).map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className={cn('space-y-1 relative', classNames?.container)}>
      <Label htmlFor={id} className={cn('font-bold', classNames?.label)}>
        {lable}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={'outline'}
            className={cn(
              'group w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20 disabled:pointer-events-none disabled:opacity-50',
              !date && 'text-muted-foreground',
            )}
            disabled={disabled}>
            <span className={cn('truncate', !date && 'text-muted-foreground')}>
              {date ? format(date, 'PPP') : placeholder}
            </span>
            <CalendarIcon
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className={cn('w-full', classNames?.input)}
            fromYear={1900}
            toYear={new Date().getFullYear()}
            initialFocus
            components={{
              Caption: CustomCaption,
            }}
          />
        </PopoverContent>
      </Popover>
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
    </div>
  )
}
