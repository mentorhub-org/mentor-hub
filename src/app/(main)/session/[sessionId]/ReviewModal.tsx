import ReviewForm from '@/app/(main)/session/[sessionId]/ReviewForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: string
  setReview: (review: string) => void
  submitting: boolean
  onSubmit: () => void
}

export function ReviewModal({
  open,
  onOpenChange,
  review,
  setReview,
  submitting,
  onSubmit,
}: ReviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Review</DialogTitle>
          <DialogDescription>
            Let us know how your session went!
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <ReviewForm onReviewSubmitted={() => {}} />
        </DialogContent>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={submitting || !review}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
