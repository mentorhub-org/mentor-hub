
import Title from '@/components/ui/title';
import Aside from './componentss/aside'
import { Button } from '@/components/ui/button';
import InputText from '@/components/shared/text-input'
export default function PersonalInfo() {
  return (
    <main className="flex  min-h-screen bg-gray-100 p-4">
      <Aside/>
      <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-3 mb-3">
        {/* Header */}
        <div className="flex justify-between  mb-6">
          <Title >Personal Information</Title>
          <div className="flex items-center space-x-2">
            <Title className='text-1xl sm:text-1xl'>Available for Mentoring</Title>
            <div className="relative inline-flex items-center">
              <div className="w-12 h-6 rounded-full bg-blue-500">
                <div className="w-6 h-6 bg-white rounded-full shadow-md transform translate-x-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Gender */}
          <div className="col-span-2 flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked
                className="form-radio h-5 w-5 text-blue-500"
              />
              <span className="text-gray-700">Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                className="form-radio h-5 w-5 text-blue-500"
              />
              <span className="text-gray-700">Female</span>
            </label>
          </div>

          {/* First Name & Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              defaultValue="Nour"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <InputText 
             label="last Name"
              type="text"
              defaultValue="Mohamed"
              name={'lastname'}
              register={"lastname"}
              classNames={{ label: 'text-black mb-2' }}
            />
          </div>

          {/* Email & Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="Nourmohamed@gmail.com"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              defaultValue="+20 123 456 7890"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/*  Password */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
            <div className="relative">
              <input
                type="password"
                defaultValue="password123"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-red-500 text-sm mt-1">
              Incorrect Current Password. Please Try Again.{" "}
              <a href="#" className="underline text-blue-500">
                Forget Your Password?
              </a>
            </p>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input
                type="password"
                defaultValue="newpass123"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-red-500 text-sm mt-1">Must Have Least 6 Characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type="password"
                defaultValue="newpass1234"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-red-500 text-sm mt-1">Password Doesn't Match</p>
          </div>

          {/* Date of Birth & Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="Oct 19, 1998"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              defaultValue="Egypt, Cairo"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Field of Mentoring */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Field of Mentoring</label>
            <input
              type="text"
              defaultValue="UI/UX Designer"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant={'secondary'} className='p-6' >
            Discard Changes
          </Button>
          <Button  className='p-6'>
            Save Changes
          </Button>
        </div>
      </div>
    </main>
  );
}
