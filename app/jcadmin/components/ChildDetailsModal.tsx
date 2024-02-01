// components/ChildDetailsModal.tsx
import React from "react";

interface ChildDetailsModalProps {
  firstName: string;
  lastName: string;
  ageGroup: number;
  gender: string;
  status: string;
  onClose: () => void;
  // ... Add other props as needed for the rest of the child's details
}

const ChildDetailsModal: React.FC<ChildDetailsModalProps> = ({
  firstName,
  lastName,
  ageGroup,
  gender,
  status,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <button className="float-right" onClick={onClose}>
          X
        </button>
        <div className="clear-both">
          <h1 className="text-2xl font-bold">
            {firstName} &nbsp; {lastName}
          </h1>
          <p>{`${ageGroup} yrs, ${gender}`}</p>
          <p>{status}</p>

          {/* ... Rest of the details */}
        </div>
      </div>
    </div>
  );
};

export default ChildDetailsModal;
