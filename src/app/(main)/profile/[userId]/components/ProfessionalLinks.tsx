import { BE, DRI, GITHUB, LINKED } from '@/constants/icons'
import Image from 'next/image'

type Link = {
  platform: string
  url: string
  icon: any
}

type ProfessionalLinksProps = {
  links: {
    linkedin?: string
    github?: string
    behance?: string
    dribbble?: string
  }
}

export default function ProfessionalLinks({ links }: ProfessionalLinksProps) {
  const linksList: Link[] = []
  
  if (links.linkedin) {
    linksList.push({
      platform: 'LinkedIn',
      url: links.linkedin,
      icon: LINKED
    })
  }
  
  if (links.github) {
    linksList.push({
      platform: 'GitHub',
      url: links.github,
      icon: GITHUB
    })
  }
  
  if (links.behance) {
    linksList.push({
      platform: 'Behance',
      url: links.behance,
      icon: BE
    })
  }
  
  if (links.dribbble) {
    linksList.push({
      platform: 'Dribbble',
      url: links.dribbble,
      icon: DRI
    })
  }
  
  if (linksList.length === 0) return null
  
  return (
    <div className="w-full">
      <h3 className="text-darkblue font-bold text-lg">Links</h3>
      <div className="mt-4 space-y-3">
        {linksList.map((link, index) => (
          <p key={index} className="flex items-center space-x-2 text-gray-600">
            <Image src={link.icon} alt={link.platform} className="w-5 h-5" />
            <span className="text-gray-400 text-sm">{link.platform}:</span>
            <a
              className="text-darkblue text-sm hover:underline"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer">
              {link.url.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </p>
        ))}
      </div>
    </div>
  )
}