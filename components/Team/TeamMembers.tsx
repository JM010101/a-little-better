"use client";

import { useState } from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
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

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);
  const isHiring = member.name === "hiring...";
  const showImage = member.image && !imageError && !isHiring;

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-all">
      <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
        {showImage ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-5xl font-bold">
            {isHiring ? "?" : member.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-medium mb-2">{member.name}</h3>
      <p className="text-neutral-600 text-lg">{member.role}</p>
    </div>
  );
}

export default function TeamMembers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </div>
  );
}
