import TeamMembers from "@/components/Team/TeamMembers";
import Footer from "@/components/Footer/Footer";
import type { TeamMember } from "@/components/Team/TeamMembers";

const developers: TeamMember[] = [
  {
    name: "Reginald Chikelu",
    role: "Full Stack Engineer",
    image: "/team/Reginald Chikelu - full stack engineer.jpg"
  },
  {
    name: "Andrea Montrone",
    role: "Senior Software Engineer",
    image: "/team/Andrea Montrone - Senior Software Engineer.png"
  },
  {
    name: "Mohammad Asadi",
    role: "Full Stack Engineer",
    image: "/team/Mohammad Asadi - full stack engineer.png"
  },
  {
    name: "Rahul Singh",
    role: "Software Engineer",
    image: "/team/Rahul Singh - Software Engineer.png"
  },
  {
    name: "Maheen Mashrur",
    role: "Software Engineer",
    image: "/team/Maheen Mashrur - software engineer.jpg"
  },
  {
    name: "Wealth Hajoh",
    role: "Full Stack Engineer",
    image: "/team/Wealth Hajoh - full stack engineer.png"
  },
  {
    name: "Rafael Silverio",
    role: "Backend Developer",
    image: "/team/Rafael Silverio - backend developer.jpg"
  }
];

export default function DevelopersPage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Developers</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Meet the talented developers who bring our ideas to life.
            </p>
          </div>
          <TeamMembers members={developers} />
        </div>
      </main>
      <Footer />
    </>
  );
}
