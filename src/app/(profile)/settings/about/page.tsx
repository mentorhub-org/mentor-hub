'use client'
import InputText from '@/components/shared/text-input'
import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useForm } from 'react-hook-form'

export default function About() {
  const {
    register,
    formState: {},
  } = useForm()

  return (
    <main className="max-w-6xl mx-auto p-6 mb-3 mt-3 bg-white rounded-lg ">
      {/* About Me Section */}
      <Title>About & Skills</Title>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">About Me</h3>
        <textarea
          className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={8}
          defaultValue="Hey There! I'm Nour Mohamed, A Passionate Graphic Designer & Visual Storyteller Who Loves Turning Ideas Into Stunning Visuals. With Years Of Experience In Branding, UI/UX, And Digital Illustration, I've Worked With Businesses And Individuals To Create Designs That Leave A Lasting Impact. I Specialize In Logo Design, Social Media Graphics, Web Design, And Motion Graphics, Using Tools Like Adobe Photoshop, Illustrator, Figma, And After Effects. My Goal Is To Blend Creativity With Strategy, Ensuring Every Design Not Only Looks Good But Also Serves Its Purpose Effectively. When I'm Not Designing, You'll Probably Find Me Exploring New Creative Trends, Mentoring Aspiring Designers, Or Sharing My Work On Behance & Dribbble. Let's Connect And Create Something Amazing Together!"
        />
        <div className="flex justify-end mt-2">
          <Button variant={'outline'}>Save</Button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-3">
        <div className="mb-2">
          <InputText
            label="Skills"
            type="text"
            defaultValue="Mohamed"
            name={'lastname'}
            register={register}
            classNames={{ label: 'text-xl font-bold mb-2' }}
          />
          <p className="text-gray-500 text-sm mt-1">
            Use commas to enter multiple skills at once.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            'UI/UX Design',
            'UI Animations',
            'Wireframing',
            'Prototypes',
            'User Research & Usability Testing',
            'Sketch',
            'Figma',
            'Adobe XD',
            'UX Audits',
            'User Personas',
            'Journey Mapping',
            'Multi-Device Optimization',
            'Information Architecture',
            'User Flows',
            'Lean UX Methodologies',
            'After Effects',
          ].map(skill => (
            <button
              key={skill}
              className="px-4 py-2 rounded-lg border border-blue-300 flex items-center space-x-2 transition-colors bg-blue-100 text-blue-700">
              <span>{skill}</span>
              <span className="text-blue-500">×</span>
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button variant={'outline'}>Save</Button>
      </div>
    </main>
  )
}
