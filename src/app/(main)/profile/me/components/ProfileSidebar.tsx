import { PROFILE } from '@/constants/images'
import { getProfileSocialLinks } from '@/services/profile'
import type { Profile } from '@prisma/client'
import ContactInfo from './ContactInfo'
import MentorshipStats from './MentorshipStats'
import ProfessionalLinks from './ProfessionalLinks'
import ProfileInfo from './ProfileInfo'
import SocialLinks from './SocialLinks'

type ProfileSidebarProps = {
  profile: Profile
}

export default async function ProfileSidebar({ profile }: ProfileSidebarProps) {
  const socialLinks = await getProfileSocialLinks(profile.id)

  return (
    <aside className="m-3 w-full md:w-1/4 max-w-sm bg-white md:p-8 lg:p-10 rounded-2xl">
      <div className="flex flex-col items-center">
        {/* Profile Section */}
        <ProfileInfo
          name={profile.name || 'User'}
          title={profile.jobTitle || 'Mentor'}
          id={profile.id}
          rating={4.8}
          profileImage={profile.imgUrl || PROFILE}
        />

        <hr className="my-6 border-gray-300 w-full" />

        {/* About Section */}
        <ContactInfo
          phone={profile.phone || '+1 (555) 123-4567'}
          email={profile?.email || 'mentor@example.com'}
          address={profile.location || '123 Main St, New York, NY'}
          dateOfBirth={
            profile.dateOfBirth
              ? new Date(profile.dateOfBirth).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Jan 1, 1990'
          }
        />

        <hr className="my-6 border-gray-300 w-full" />

        {/* Mentorship Sessions Section */}
        <MentorshipStats profileId={profile.id} />

        <hr className="my-6 border-gray-300 w-full" />

        {/* Professional Links Section */}
        <ProfessionalLinks
          links={{
            linkedin: socialLinks?.linkedin || 'https://linkedin.com/in/mentor',
            github: socialLinks?.github || 'https://github.com/mentor',
            behance: socialLinks?.behance || 'https://behance.net/mentor',
            dribbble: socialLinks?.dribbble || 'https://dribbble.com/mentor',
          }}
        />

        <hr className="my-6 border-gray-300 w-full" />

        {/* Social Links Section */}
        <SocialLinks
          links={{
            facebook: socialLinks?.facebook || 'https://facebook.com/mentor',
            instagram: socialLinks?.instagram || 'https://instagram.com/mentor',
            telegram: socialLinks?.telegram || 'https://t.me/mentor',
            whatsapp: socialLinks?.whatsapp || 'https://wa.me/1234567890',
          }}
        />
      </div>
    </aside>
  )
}
