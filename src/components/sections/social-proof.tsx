import { Container } from '@/components/layout/container'

const SocialProof = () => {
  const stats = [
    {
      number: "10K+",
      label: "Businesses Improved",
      description: "Companies using our methodology"
    },
    {
      number: "25%",
      label: "Average Growth",
      description: "Improvement in key metrics"
    },
    {
      number: "90 Days",
      label: "To See Results",
      description: "Typical time to impact"
    }
  ]

  const testimonials = [
    {
      quote: "The small changes ALB recommended increased our team productivity by 30% in just two months.",
      author: "Sarah Chen",
      company: "TechFlow Inc.",
      role: "CEO"
    },
    {
      quote: "We were skeptical about incremental improvements, but the results speak for themselves. Game-changing.",
      author: "Marcus Rodriguez",
      company: "InnovateLab",
      role: "Operations Director"
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <Container>
        {/* Stats */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Small Changes, Big Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-gray-600 mb-6 text-lg leading-relaxed italic">
                "{testimonial.quote}"
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { SocialProof }