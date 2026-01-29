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
    name: "hiring...",
    role: "Senior Full-Stack Developer",
    image: ""
  },
  {
    name: "hiring...",
    role: "Frontend Developer",
    image: ""
  },
  {
    name: "hiring...",
    role: "Backend Developer",
    image: ""
  },
  {
    name: "hiring...",
    role: "DevOps Engineer",
    image: ""
  },
  {
    name: "hiring...",
    role: "Mobile Developer",
    image: ""
  },
  {
    name: "hiring...",
    role: "UI/UX Developer",
    image: ""
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
