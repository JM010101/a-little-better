import TeamMembers from "@/components/Team/TeamMembers";
import Footer from "@/components/Footer/Footer";
import type { TeamMember } from "@/components/Team/TeamMembers";

const managers: TeamMember[] = [
  {
    name: "Adam Wong",
    role: "CEO & Founder",
    image: "/team/adam wong - CEO&founder.png"
  },
  {
    name: "hiring...",
    role: "CTO",
    image: ""
  },
  {
    name: "hiring...",
    role: "COO",
    image: ""
  },
  {
    name: "hiring...",
    role: "HR Director",
    image: ""
  },
  {
    name: "hiring...",
    role: "Technical Architect",
    image: ""
  },
  {
    name: "hiring...",
    role: "CFO",
    image: ""
  }
];

export default function ManagersPage() {
  return (
    <>
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-medium mb-4">Managers</h1>
            <p className="text-neutral-600 text-xl max-w-[700px] mx-auto">
              Meet the leadership team who guide A Little Better forward.
            </p>
          </div>
          <TeamMembers members={managers} />
        </div>
      </main>
      <Footer />
    </>
  );
}
