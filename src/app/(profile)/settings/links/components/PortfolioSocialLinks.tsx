import InputText from '@/components/shared/text-input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

type Props = {
  links: {
    src: any
    key: string
    alt: string
    className: string
    placeholder: string
  }[]
}

export default function PortfolioSocialLinks({ links }: Props) {
  const { register } = useFormContext()

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        {links.map(social => (
          <div
            key={social.key}
            className="flex items-center space-x-3 rounded-lg p-3">
            <Image
              src={social.src}
              alt={social.alt}
              className={cn(
                'w-[41px] h-[41px] flex-shrink-0',
                social.className,
              )}
            />
            <InputText
              label=""
              type="text"
              placeholder={social.placeholder}
              name={social.key}
              register={register}
              classNames={{
                label: 'text-black mb-2',
                input:
                  'w-full h-[41px] text-[80px] flex justify-center items-center',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
