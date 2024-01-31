// components/ChildCard.tsx

import React from "react";
import Image from "next/image";

interface ChildCardProps {
  name: string;
  age: number;
  gender: string;
  status: string;
  imageUrl: string;
  onClick: () => void; // Function to handle click event
}

const ChildCard: React.FC<ChildCardProps> = ({
  name,
  age,
  gender,
  status,
  imageUrl,
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
            src={imageUrl}
            alt={name}
            layout="fill"
            className="rounded-full"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p>{`${age} yrs, ${gender}`}</p>
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
