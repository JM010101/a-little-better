import Footer from "@/components/Footer/Footer";

const services = [
  {
    badge: "Scalable",
    title: "Enterprise Solutions",
    description: "Software that grows with your business, handling increased load and complexity.",
    badgeColor: "bg-green-100 text-green-700"
  },
  {
    badge: "Secure",
    title: "Security First",
    description: "Built with security best practices to protect your data and user information.",
    badgeColor: "bg-red-100 text-red-700"
  },
  {
    badge: "Integration",
    title: "API Development",
    description: "Seamless integration with existing systems and third-party services.",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    badge: "Cloud Native",
    title: "Cloud Solutions",
    description: "Modern cloud-based applications that are reliable and cost-effective.",
    badgeColor: "bg-indigo-100 text-indigo-700"
  },
  {
    badge: "Maintenance",
    title: "Ongoing Support",
    description: "Continuous updates, bug fixes, and feature enhancements to keep your software current.",
    badgeColor: "bg-yellow-100 text-yellow-700"
  },
  {
    badge: "Custom Logic",
    title: "Tailored Functionality",
    description: "Features and workflows designed specifically for your unique business processes.",
    badgeColor: "bg-purple-100 text-purple-700"
  }
];

export default function CustomSoftwarePage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Custom Software</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Build tailored software solutions that perfectly fit your business needs.
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
