// pages/index.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import ChildCard from "./ChildCard";

const ChildHome = ({ childrenData }: { childrenData: Array<any> }) => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChildClick = (child: React.SetStateAction<null>) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {childrenData.map((child) => (
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
            onClick={() => handleChildClick(child)}
          />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get("/api/children");
  return {
    props: { childrenData: data },
    revalidate: 10, // ISR: Regenerate the page every 10 seconds if there are requests
  };
}

export default ChildHome;
