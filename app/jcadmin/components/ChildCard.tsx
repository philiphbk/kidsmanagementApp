// components/ChildCard.tsx

import React from "react";
import Image from "next/image";

interface ChildCardProps {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: number;
  dateOfBirth: string;
  parent: string;
  gender: string;
  photograph: string;
  specialNeeds: string;
  status: string;
  onClick: () => void;
}

const ChildCard: React.FC<ChildCardProps> = ({
  firstName,
  lastName,
  gender,
  ageGroup,
  dateOfBirth,
  parent,
  photograph,
  specialNeeds,
  status,
  onClick,
}) => {
  return (
    <div
      className="p-4 bg-white shadow rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 relative">
          <Image
            src={photograph}
            alt={firstName}
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            {firstName}&nbsp; {lastName}
          </h3>
          <p>{`${ageGroup} yrs, ${gender}`}</p>
          <p>{`DOB: ${dateOfBirth}`}</p>
          <p>{`Parent: ${parent}`}</p>
          <p>{`Special Needs: ${specialNeeds}`}</p>
          <span
            className={`text-sm ${
              status === "Checked In" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
