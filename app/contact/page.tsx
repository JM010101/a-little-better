"use client";

import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Footer/Footer";
import { useSpring, animated } from "@react-spring/web";

export default function ContactPage() {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 100, friction: 50 }
  });

  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 100,
    config: { tension: 100, friction: 50 }
  });

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
        <div className="w-full max-w-[600px]">
          <animated.h1 style={titleAnimation} className="text-4xl font-medium text-center mb-4">
            Get in Touch
          </animated.h1>
          <animated.p style={subtitleAnimation} className="text-neutral-600 text-center mb-10">
            Have a project in mind? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </animated.p>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
