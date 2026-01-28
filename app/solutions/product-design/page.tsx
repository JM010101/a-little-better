import Footer from "@/components/Footer/Footer";

const services = [
  {
    badge: "User Research",
    title: "User-Centered Design",
    description: "Deep understanding of user needs through research and data-driven insights.",
    badgeColor: "bg-purple-100 text-purple-700"
  },
  {
    badge: "UI/UX",
    title: "Intuitive Interfaces",
    description: "Beautiful and functional designs that users can navigate effortlessly.",
    badgeColor: "bg-pink-100 text-pink-700"
  },
  {
    badge: "Prototyping",
    title: "Interactive Prototypes",
    description: "Test and validate designs before development with clickable prototypes.",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    badge: "Design Systems",
    title: "Consistent Branding",
    description: "Comprehensive design systems that ensure consistency across all touchpoints.",
    badgeColor: "bg-indigo-100 text-indigo-700"
  },
  {
    badge: "Accessibility",
    title: "Inclusive Design",
    description: "Designs that are accessible to all users, meeting WCAG guidelines.",
    badgeColor: "bg-green-100 text-green-700"
  },
  {
    badge: "Iteration",
    title: "Continuous Improvement",
    description: "Ongoing refinement based on user feedback and analytics data.",
    badgeColor: "bg-orange-100 text-orange-700"
  }
];

export default function ProductDesignPage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Product Design</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Design beautiful, intuitive products that users love and businesses need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 ${service.badgeColor} text-xs font-medium rounded-full`}>
                    {service.badge}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-neutral-600 flex-grow">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
