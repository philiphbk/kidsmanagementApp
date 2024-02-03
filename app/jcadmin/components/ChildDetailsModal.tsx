"use client";

// components/ChildDetailsModal.tsx
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HomeIcon, UserIcon } from "@heroicons/react/solid";
import tempimage from "@/public/upload/pexels-binyamin-mellish-186077.jpg";

interface ChildDetailsModalProps {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: number;
  gender: string;
  status: string;
  photograph: string;
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
  photograph,
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
              src={photograph || tempimage}
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
                    <div className=" grid grid-rows-6 grid-flow-col gap-4 ">
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
