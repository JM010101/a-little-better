import Footer from "@/components/Footer/Footer";

const services = [
  {
    badge: "Responsive Design",
    title: "Mobile-First Websites",
    description: "Beautiful websites that work perfectly on all devices and screen sizes.",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    badge: "SEO Optimized",
    title: "Search Engine Ready",
    description: "Built with SEO best practices to help you rank higher in search results.",
    badgeColor: "bg-green-100 text-green-700"
  },
  {
    badge: "Fast Loading",
    title: "Performance Focused",
    description: "Lightning-fast websites that keep visitors engaged and reduce bounce rates.",
    badgeColor: "bg-purple-100 text-purple-700"
  },
  {
    badge: "Conversion Focused",
    title: "Landing Pages",
    description: "High-converting landing pages designed to turn visitors into customers.",
    badgeColor: "bg-orange-100 text-orange-700"
  },
  {
    badge: "Modern Stack",
    title: "Latest Technologies",
    description: "Built with cutting-edge frameworks and tools for optimal performance.",
    badgeColor: "bg-indigo-100 text-indigo-700"
  },
  {
    badge: "Custom Design",
    title: "Unique Branding",
    description: "Tailored designs that reflect your brand identity and stand out from competitors.",
    badgeColor: "bg-pink-100 text-pink-700"
  }
];

export default function WebsitesLandingsPage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Websites & Landings</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Create stunning websites and landing pages that convert visitors into customers.
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
