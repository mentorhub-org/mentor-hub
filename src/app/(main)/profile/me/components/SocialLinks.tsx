import { FACEBOOKK, INSTAGRAM, TELEGRAM, WHATSAPP } from '@/constants/icons'
import Image from 'next/image'

type SocialLinksProps = {
  links: {
    facebook?: string
    instagram?: string
    telegram?: string
    whatsapp?: string
  }
}

export default function SocialLinks({ links }: SocialLinksProps) {
  const socialLinks = [
    {
      name: 'Facebook',
      url: links.facebook,
      icon: FACEBOOKK,
      color: 'text-darkblue hover:text-blue-600'
    },
    {
      name: 'Instagram',
      url: links.instagram,
      icon: INSTAGRAM,
      color: 'text-pink-500 hover:text-pink-600'
    },
    {
      name: 'Telegram',
      url: links.telegram,
      icon: TELEGRAM,
      color: 'text-lightblue hover:text-blue-500'
    },
    {
      name: 'WhatsApp',
      url: links.whatsapp,
      icon: WHATSAPP,
      color: 'text-green-500 hover:text-green-600'
    }
  ].filter(link => link.url)
  
  if (socialLinks.length === 0) return null
  
  return (
    <div className="w-full">
      <h3 className="text-darkblue font-bold text-lg">Connect Me</h3>
      <div className="mt-4 flex justify-center space-x-6">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className={`flex flex-col items-center ${link.color} transition`}
            target="_blank"
            rel="noopener noreferrer">
            <Image src={link.icon} alt={link.name} className="w-6 h-6" />
            <span className="text-sm mt-1">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}