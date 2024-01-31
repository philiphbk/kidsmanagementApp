// pages/index.tsx

import React, { useState } from "react";
import axios from "axios";
import ChildCard from "../components/ChildCard";
import ChildModal from "../components/ChildModal";

const Home = ({ childrenData }) => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChildClick = (child) => {
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
            name={child.name}
            age={child.age}
            gender={child.gender}
            status={child.status}
            imageUrl={child.imageUrl}
            onClick={() => handleChildClick(child)}
          />
        ))}
      </div>

      {isModalOpen && selectedChild && (
        <ChildModal child={selectedChild} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get("your-api-endpoint/children");
  return {
    props: { childrenData: data },
    revalidate: 10, // ISR: Regenerate the page every 10 seconds if there are requests
  };
}

export default Home;
