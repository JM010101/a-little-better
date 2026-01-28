import Footer from "@/components/Footer/Footer";

const services = [
  {
    badge: "Strategy",
    title: "Technology Strategy",
    description: "Develop comprehensive technology roadmaps aligned with your business goals.",
    badgeColor: "bg-red-100 text-red-700"
  },
  {
    badge: "Architecture",
    title: "System Architecture",
    description: "Design scalable and maintainable system architectures for your infrastructure.",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    badge: "Migration",
    title: "Cloud Migration",
    description: "Expert guidance on migrating to cloud platforms for better scalability and cost efficiency.",
    badgeColor: "bg-indigo-100 text-indigo-700"
  },
  {
    badge: "Security",
    title: "Security Assessment",
    description: "Evaluate and improve your security posture with comprehensive audits and recommendations.",
    badgeColor: "bg-green-100 text-green-700"
  },
  {
    badge: "Optimization",
    title: "Performance Optimization",
    description: "Identify bottlenecks and optimize your systems for better performance and cost savings.",
    badgeColor: "bg-yellow-100 text-yellow-700"
  },
  {
    badge: "Best Practices",
    title: "Code Reviews",
    description: "Expert code reviews and recommendations to improve code quality and maintainability.",
    badgeColor: "bg-purple-100 text-purple-700"
  }
];

export default function ITConsultingPage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">IT Consulting</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Get expert guidance on technology strategy and implementation for your business.
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
