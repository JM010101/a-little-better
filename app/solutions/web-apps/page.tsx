import Footer from "@/components/Footer/Footer";

const services = [
  {
    badge: "Progressive",
    title: "Progressive Web Apps",
    description: "PWAs that work like native apps with offline capabilities and push notifications.",
    badgeColor: "bg-indigo-100 text-indigo-700"
  },
  {
    badge: "Real-time",
    title: "Real-time Applications",
    description: "Build interactive apps with live updates and real-time collaboration features.",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    badge: "Dashboard",
    title: "Admin Dashboards",
    description: "Powerful admin panels and dashboards for managing your business operations.",
    badgeColor: "bg-purple-100 text-purple-700"
  },
  {
    badge: "API",
    title: "RESTful APIs",
    description: "Robust backend APIs that power your web applications with clean, scalable architecture.",
    badgeColor: "bg-green-100 text-green-700"
  },
  {
    badge: "Performance",
    title: "High Performance",
    description: "Optimized applications that load quickly and handle high traffic efficiently.",
    badgeColor: "bg-orange-100 text-orange-700"
  },
  {
    badge: "Modern Stack",
    title: "Latest Frameworks",
    description: "Built with modern technologies like React, Next.js, and Node.js for optimal results.",
    badgeColor: "bg-pink-100 text-pink-700"
  }
];

export default function WebAppsPage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Web Apps</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Develop powerful web applications that scale with your business growth.
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
