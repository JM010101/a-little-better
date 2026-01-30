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
  // Adjust image position for Andrea, Mohammad, Rahul, Maheen, Wealth, and Rafael to show their heads properly
  const needsImageAdjustment = member.name === "Andrea Montrone" || member.name === "Mohammad Asadi" || member.name === "Rahul Singh" || member.name === "Maheen Mashrur" || member.name === "Wealth Hajoh" || member.name === "Rafael Silverio";

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-all">
      <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
        {showImage ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            style={needsImageAdjustment ? { objectPosition: "center 20%" } : { objectPosition: "center center" }}
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
