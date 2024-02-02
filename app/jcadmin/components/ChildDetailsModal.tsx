"use client";

// components/ChildDetailsModal.tsx
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HomeIcon, UserIcon, SettingsIcon } from "@heroicons/react/solid";

interface ChildDetailsModalProps {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: number;
  gender: string;
  status: string;
  onClose: () => void;
  // ... Add other props as needed for the rest of the child's details
}

interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

interface Caregiver {
  id: string;
  firstName: string;
  lastName: string;
  relationshipWithChild: string;
}

const tabs = [
  { name: "Drop-off / Pick Up", icon: HomeIcon },
  { name: "Activity Log", icon: UserIcon },
  // { name: 'Settings', icon: SettingsIcon },
];

const ChildDetailsModal: React.FC<ChildDetailsModalProps> = ({
  firstName,
  lastName,
  ageGroup,
  gender,
  status,
  onClose,
}) => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [activeTab, setActiveTab] = useState("Home");
  const updateStatus = async (newStatus: string) => {
    try {
      let id;
      await axios.post("/api/child/status", { id: id, status: newStatus });
      // Optionally, close the modal or refresh data to reflect the change
      onClose();
      // Or fetch updated data
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    const fetchParents = async () => {
      const result = await axios("/api/parents");
      setParents(result.data);
    };

    const fetchCaregivers = async () => {
      const result = await axios("/api/caregiver");
      setCaregivers(result.data);
    };

    fetchParents();
    fetchCaregivers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg">
        <button className="float-right p-3 font-bold" onClick={onClose}>
          X
        </button>
        <div className="clear-both mx-8 my-8">
          <div className=" flex items-center justify-start gap-3">
            <Image
              src="data:image/jpeg;base64,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"
              alt={`${firstName} ${lastName}`}
              className="rounded-full"
              width={90}
              height={90}
            />

            <div className=" my-4">
              <h1 className="text-2xl font-bold">
                {firstName} &nbsp; {lastName}
              </h1>
              <p>{`${ageGroup} yrs, ${gender}`}</p>
              <p className=" italic text-red-800 ">specialNeeds</p>
            </div>
            <p className=" bg-red-100  text-red-600 rounded-3xl text-sm p-2">
              {status}
            </p>
          </div>

          <div className="flex justify-start">
            <div className="flex flex-col items-center">
              <div className="flex space-x-1 border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center px-4 py-2 -mb-px font-medium text-xs sm:text-sm ${
                      activeTab === tab.name
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-1" />
                    {tab.name}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                {activeTab === "Drop-off / Pick Up" && (
                  <div>
                    <p className=" mb-3 flex justify-center">
                      Select Parent / Caretaker
                    </p>
                    <div className=" grid grid-rows-5 grid-flow-col gap-4 ">
                      {parents.map((parent) => (
                        <div
                          className=" border-2 border-gray-200 p-2 hover:bg-gray-100 cursor-pointer rounded-lg mb-2"
                          key={parent}
                        >{`${parent.firstName} ${parent.lastName}`}</div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "Activity Log" && <div>Activity Log</div>}
                {/* {activeTab === "Settings" && <div>Settings Content</div>} */}
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-center mt-3">
            <button
              className=" bg-blue-950 px-5 text-white rounded-lg py-2 mr-2 hover: bg-blue-400"
              onClick={() => updateStatus("checked in")}
            >
              Check In
            </button>
            <button
              className="  bg-blue-950 px-5 text-white rounded-lg py-2 mr-2 hover: bg-blue-400"
              onClick={() => updateStatus("checked out")}
            >
              Check Out
            </button>
          </div>

          {/* ... Rest of the details */}
        </div>
      </div>
    </div>
  );
};

export default ChildDetailsModal;
