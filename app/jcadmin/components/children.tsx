"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChildCard from "../components/ChildCard";
import ChildDetailsModal from "../components/ChildDetailsModal";

// Define a type for the child object

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: number;
  dateOfBirth: string;
  parent: string;
  gender: string;
  status: string;
  photograph: string;
  specialNeeds: string;
}

const ChildrenList = () => {
  // Use the Child type for the children array and for selectedChild
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/child");
      console.log(result.data);
      setChildren(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {children.map((child) => (
        <ChildCard
          key={child.id}
          id={child.id}
          firstName={child.firstName}
          lastName={child.lastName}
          ageGroup={child.ageGroup}
          dateOfBirth={child.dateOfBirth}
          parent={child.parent}
          photograph={child.photograph}
          gender={child.gender}
          status={child.status}
          specialNeeds={child.specialNeeds}
          onClick={() => setSelectedChild(child)}
        />
      ))}

      {selectedChild && (
        <ChildDetailsModal
          firstName={selectedChild.firstName}
          lastName={selectedChild.lastName}
          ageGroup={selectedChild.ageGroup}
          gender={selectedChild.gender}
          status={selectedChild.status}
          onClose={() => setSelectedChild(null)}
        />
      )}
    </div>
  );
};

export default ChildrenList;
