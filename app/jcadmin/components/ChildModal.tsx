// components/ChildModal.tsx

import Image from "next/image";
import React from "react";

interface ChildModalProps {
  child: {
    firstName: string;
    lastName: string;
    ageGroup: number;
    gender: string;
    photograph: string;
    caretakers: Array<{
      firstName: string;
      lastName: string;
      relation: string;
    }>;
  };
  onClose: () => void; // Function to close the modal
}

const ChildModal: React.FC<ChildModalProps> = ({ child, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-4/5 p-7">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <button className="absolute top-4 right-4 text-lg" onClick={onClose}>
          ×
        </button>
        {/* Other modal content */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 relative">
            <Image
              src={child.photograph}
              alt={child.firstName}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {child.firstName} {child.lastName}
            </h3>
            <p>{`${child.ageGroup} yrs`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildModal;
