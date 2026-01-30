"use client";

import { useState } from "react";
import Image from "next/image";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);
  const isHiring = member.name === "hiring...";
  const showImage = member.image && !imageError && !isHiring;
  const needsBottomMargin = member.name === "Andrea Montrone" || member.name === "Mohammad Asadi";

  return (
    <div className={`flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-all ${needsBottomMargin ? "mt-8" : ""}`}>
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

interface TeamMembersProps {
  members: TeamMember[];
}

export default function TeamMembers({ members }: TeamMembersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </div>
  );
}
