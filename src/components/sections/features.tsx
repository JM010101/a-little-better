import { Container } from '@/components/layout/container'

const Features = () => {
  const features = [
    {
      icon: "🎯",
      title: "Focused Improvements",
      description: "Identify the small changes that will have the biggest impact on your business outcomes."
    },
    {
      icon: "📈",
      title: "Measurable Results",
      description: "Track how small improvements compound over time to create significant business growth."
    },
    {
      icon: "⚡",
      title: "Quick Implementation",
      description: "Get started immediately with changes that require minimal effort but deliver maximum value."
    },
    {
      icon: "🔄",
      title: "Continuous Optimization",
      description: "Build a culture of ongoing improvement that keeps your business ahead of the competition."
    }
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why A Little Better Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Small, consistent improvements compound over time to create remarkable transformations. 
            Here's how we help you harness this power.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { Features }