import Title from '@/components/ui/title'

type AboutMeProps = {
  bio: string
}

export default function AboutMe({ bio }: AboutMeProps) {
  return (
    <section>
      <Title>About Me</Title>
      <div className="bg-gradient p-6 sm:p-8 rounded-b-xl rounded-tr-xl shadow-md">
        <p className="text-white text-sm sm:text-base leading-relaxed">{bio}</p>
      </div>
    </section>
  )
}
