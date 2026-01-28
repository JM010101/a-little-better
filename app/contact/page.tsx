import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Footer/Footer";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
        <div className="w-full max-w-[600px]">
          <h1 className="text-4xl font-medium text-center mb-4">Get in Touch</h1>
          <p className="text-neutral-600 text-center mb-10">
            Have a project in mind? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
