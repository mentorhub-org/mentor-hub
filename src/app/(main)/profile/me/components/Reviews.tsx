'use client'

import Title from '@/components/ui/title'
import ReviewCard from './ReviewCard'

export default function Reviews() {
  // Static reviews data
  const staticReviews = [
    {
      id: '1',
      text: 'Excellent mentor! Really helped me understand complex concepts.',
      rating: 5,
      reviewer: {
        name: 'John Doe',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
    },
    {
      id: '2',
      text: 'Very knowledgeable and patient. Great teaching style.',
      rating: 4,
      reviewer: {
        name: 'Jane Smith',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      },
    },
    {
      id: '3',
      text: 'Fantastic experience! Would definitely recommend.',
      rating: 5,
      reviewer: {
        name: 'Mike Johnson',
        image: null,
      },
    },
  ]

  return (
    <section className="mt-8">
      <Title>Reviews</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {staticReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
