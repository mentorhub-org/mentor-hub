import ReviewForm from '@/app/(main)/session/[sessionId]/ReviewForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { MentoringSession } from '@prisma/client'

interface ReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: MentoringSession
}

export function ReviewModal({ open, onOpenChange, session }: ReviewModalProps) {
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
          <ReviewForm session={session} />
        </DialogContent>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
