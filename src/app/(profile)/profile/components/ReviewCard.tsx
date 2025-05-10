import { FACECARDE } from '@/constants/images'
import Image from 'next/image'

type ReviewCardProps = {
  review: {
    id: string
    text: string
    rating: number
    reviewer: {
      name: string
      image?: string | null
    }
  }
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Image
          src={FACECARDE || review.reviewer.image}
          alt={`${review.reviewer.name}'s avatar`}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {review.reviewer.name}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">
              {'★'.repeat(Math.floor(review.rating))}
            </span>
            <span className="text-gray-600 text-sm">{review.rating}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {review.text}
      </p>
    </div>
  )
}
