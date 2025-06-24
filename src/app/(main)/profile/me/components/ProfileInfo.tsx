import Image, { type StaticImageData } from 'next/image'

type ProfileInfoProps = {
  name: string
  title: string
  id: string
  rating: number
  profileImage: string | StaticImageData
}

export default function ProfileInfo({
  name,
  title,
  id,
  rating,
  profileImage,
}: ProfileInfoProps) {
  return (
    <div className="text-center">
      <Image
        src={profileImage}
        alt={`${name}'s profile`}
        width={128}
        height={128}
        className="rounded-full mx-auto w-24 h-24 md:w-32 md:h-32 object-cover"
      />
      <h2 className="text-2xl font-bold mt-4 text-gray-800">{name}</h2>
      <p className="text-darkblue font-medium">{title}</p>
      <p className="text-gray-500 text-sm">ID: {id}</p>
      <div className="flex justify-center items-center mt-3">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
        <span className="ml-2 text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  )
}
