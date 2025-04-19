import { FACECARDE } from '@/constants/images';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/_profile/overview/')({
  component: RouteComponent
});

function RouteComponent() {
  const skills = [
    'UI/UX Design',
    'UI Animations',
    'Wireframing',
    'Prototypes',
    'User Research & Usability Testing',
    'Figma',
    'Adobe XD',
    'Sketch',
    'After Effects',
    'Information Architecture',
    'User Flows',
    'UX Audits',
    'User Personas',
    'Journey Mapping',
    'Lean UX Methodologies',
    'Multi-Device Optimization'
  ];

  const reviews = [
    {
      name: 'Ahmed Salem',
      rating: 4.5,
      text: 'Nour is a highly talented graphic designer with an incredible eye for detail. Her designs are always creative, modern, and aligned with the latest trends. Working with her was an absolute pleasure!',
    },
    {
      name: 'Mariam Hossam',
      rating: 5.0,
      text: 'I had a great experience with Nour! She is very professional, delivers on time, and always brings fresh ideas to the table. Highly recommend her for branding and UI/UX projects!',
    },
    {
      name: 'Youssef Khaled',
      rating: 4.5,
      text: "From concept to execution, Nour is simply outstanding! She designed an entire website layout for me, and it was beyond my expectations. Can't wait to collaborate again!",
    },
    {
      name: 'Salma Reda',
      rating: 4.5,
      text: "Excellent work and very creative! The only reason I'm giving 4 stars instead of 5 is that I wish the revisions were a bit faster, but overall, Nour is an amazing designer!",
    },
    {
      name: 'Omar Tarek',
      rating: 5.0,
      text: "Nour helped me redesign my business logo, and I couldn't be happier with the results. She understood my vision perfectly and created something truly unique. Will definitely work with her again!",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* About Me Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">About Me</h2>
        <section className="bg-blue-500 p-6 sm:p-8 rounded-xl shadow-md">
          <p className="text-white text-sm sm:text-base leading-relaxed">
            Hey there! I’m Nour Mohamed, a passionate graphic designer & visual
            storyteller who loves turning ideas into stunning visuals. With years
            of experience in branding, UI/UX, and digital illustration, I’ve
            worked with businesses and individuals to create designs that leave a
            lasting impact. I specialize in logo design, social media graphics,
            web design, and motion graphics, using tools like Adobe Photoshop,
            Illustrator, Figma, and After Effects. My goal is to blend creativity
            with strategy, ensuring every design not only looks good but also
            serves its purpose effectively. When I’m not designing, you’ll
            probably find me exploring new creative trends, mentoring aspiring
            designers, or sharing my work on Behance & Dribbble. Let’s connect and
            create something amazing together!
          </p>
        </section>

        {/* Skills Section */}
        <section className="mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-3 py-2 rounded-xl border border-blue-300 hover:bg-blue-200 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Review Form */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Give Us Your Review</h3>
              <textarea
                className="w-full h-24 p-3 bg-gray-100 rounded-lg outline-none text-gray-600 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-300"
                placeholder="Write your review here..."
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-600 transition">
                Post Review
              </button>
            </div>

            {/* Review Cards */}
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={FACECARDE}
                    alt={`${review.name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">{'★'.repeat(Math.floor(review.rating))}</span>
                      <span className="text-gray-600 text-sm">{review.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}