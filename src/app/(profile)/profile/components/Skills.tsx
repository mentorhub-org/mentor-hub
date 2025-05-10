import Title from '@/components/ui/title'

type SkillsProps = {
  skills: string[]
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section className="mt-8">
      <Title>Skills</Title>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-darkblue text-xs sm:text-sm font-medium px-3 py-2 rounded-xl border border-blue-300 hover:bg-blue-200 transition">
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}