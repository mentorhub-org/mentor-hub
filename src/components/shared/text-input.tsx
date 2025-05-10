'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { useId, useState, type InputHTMLAttributes } from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputText<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<T>
    name: Path<T>
    label: string
    error?: string
    classNames?: {
      container?: string
      button?: string
      input?: string
      label?: string
      error?: string
    }
  }

export default function InputText<T>({
  register,
  name,
  label,
  type = 'text',
  placeholder,
  defaultValue,
  error,
  classNames,
  ...rest
}: InputText<T extends FieldValues ? T : never>) {
  const id = useId()
  const [isVisible, setIsVisible] = useState<boolean>(type !== 'password')

  const toggleVisibility = () => setIsVisible(prevState => !prevState)
  return (
    <div className={cn('space-y-1 w-full', classNames?.container)}>
      <Label
        htmlFor={id}
        className={cn('font-bold', !label && 'hidden', classNames?.label)}>
        {label}
      </Label>
      <div className="relative h-full w-full">
        <Input
          id={id}
          type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
          className={cn(
            'w-full p-2 text-left border border-darkblue rounded-sm focus:outline-none focus:ring focus:ring-lightblue text-black',
            error &&
              'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20',
            classNames?.input,
          )}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name)}
          {...rest}
        />
        {type === 'password' && (
          <button
            className={cn(
              'absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-dark outline-offset-2 transition-colors hover:text-muted-foreground/80 cursor-pointer focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
              classNames?.button,
            )}
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            aria-controls="password">
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p
          className={cn('mt-2 text-xs text-destructive', classNames?.error)}
          role="alert"
          aria-live="polite">
          {error}
        </p>
      )}
    </div>
  )
}
