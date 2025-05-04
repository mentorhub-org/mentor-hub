import { Button } from '@/components/ui/button'

interface FormActionsProps {
  handleDiscard: () => void
  isSubmitting: boolean
  isDirty: boolean
  profileImage: string | null
}

export default function FormActions({
  handleDiscard,
  isSubmitting,
  isDirty,
  profileImage,
}: FormActionsProps) {
  return (
    <div className="col-span-2 flex justify-end gap-4 w-full mt-6">
      <Button
        type="button"
        variant={'secondary'}
        className="px-6 py-2"
        onClick={handleDiscard}
        disabled={isSubmitting || (!isDirty && !profileImage)}>
        Discard Changes
      </Button>
      <Button
        type="submit"
        className="px-6 py-2"
        disabled={isSubmitting || (!isDirty && !profileImage)}>
        {isSubmitting ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Saving...
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    </div>
  )
}