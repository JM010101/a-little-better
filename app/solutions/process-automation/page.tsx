import Footer from "@/components/Footer/Footer";

const services = [
  {
    badge: "Workflow",
    title: "Workflow Automation",
    description: "Streamline complex business processes with automated workflows that save time and reduce errors.",
    badgeColor: "bg-orange-100 text-orange-700"
  },
  {
    badge: "Data Processing",
    title: "Data Automation",
    description: "Automate data entry, processing, and reporting to eliminate manual work and improve accuracy.",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    badge: "Integration",
    title: "System Integration",
    description: "Connect different systems and applications to work together seamlessly.",
    badgeColor: "bg-green-100 text-green-700"
  },
  {
    badge: "Notifications",
    title: "Automated Alerts",
    description: "Set up smart notifications and alerts to keep your team informed in real-time.",
    badgeColor: "bg-purple-100 text-purple-700"
  },
  {
    badge: "Reporting",
    title: "Automated Reports",
    description: "Generate and distribute reports automatically, ensuring stakeholders always have up-to-date information.",
    badgeColor: "bg-indigo-100 text-indigo-700"
  },
  {
    badge: "ROI",
    title: "Cost Reduction",
    description: "Reduce operational costs by automating repetitive tasks and improving efficiency.",
    badgeColor: "bg-yellow-100 text-yellow-700"
  }
];

export default function ProcessAutomationPage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Process Automation</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Automate repetitive tasks and streamline your business processes for maximum efficiency.
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
