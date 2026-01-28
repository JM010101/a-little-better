import TeamMembers from "@/components/Team/TeamMembers";
import Footer from "@/components/Footer/Footer";

export default function TeamPage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Our Team</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Meet the talented individuals who make A Little Better possible.
            </p>
          </div>
          <TeamMembers />
        </div>
      </main>
      <Footer />
    </>
  );
}
