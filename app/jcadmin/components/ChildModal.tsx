// components/ChildModal.tsx

import React from "react";

interface ChildModalProps {
  child: {
    name: string;
    age: number;
    gender: string;
    imageUrl: string;
    caretakers: Array<{ name: string; relation: string }>;
  };
  onClose: () => void; // Function to close the modal
}

const ChildModal: React.FC<ChildModalProps> = ({ child, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <button className="absolute top-4 right-4 text-lg" onClick={onClose}>
          ×
        </button>
        {/* Other modal content */}
      </div>
    </div>
  );
};

export default ChildModal;
