// pages/children.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChildCard from "../components/ChildCard";
import ChildDetailsModal from "../components/ChildDetailsModal";

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/children");
      setChildren(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {children.map((child) => (
        <ChildCard
          key={child.id}
          name={child.name}
          age={child.age}
          gender={child.gender}
          status={child.status}
          imageUrl={child.imageUrl}
          onClick={() => setSelectedChild(child)}
        />
      ))}

      {selectedChild && (
        <ChildDetailsModal
          name={selectedChild.name}
          age={selectedChild.age}
          gender={selectedChild.gender}
          status={selectedChild.status}
          onClose={() => setSelectedChild(null)}
        />
      )}
    </div>
  );
};

export default ChildrenList;
