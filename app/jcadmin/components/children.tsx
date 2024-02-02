"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChildCard from "../components/ChildCard";
import ChildDetailsModal from "../components/ChildDetailsModal";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar"; // Ensure this is the correct path

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
  const [children, setChildren] = useState<Child[]>([]);
  const [displayedChildren, setDisplayedChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [childrenPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/child");
      setChildren(result.data);
      setDisplayedChildren(result.data); // Initially display all children
    };

    fetchData();
  }, []);

  let value = "child";

  const handleSearch = (searchTerm: string, searchType: string) => {
    const filteredChildren = children.filter((child) => {
      const fullName = `${child.firstName} ${child.lastName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) && value === searchType
      );
    });
    setDisplayedChildren(filteredChildren);
    setCurrentPage(1); // Reset to first page after search
  };

  // Get current children for pagination
  const indexOfLastChild = currentPage * childrenPerPage;
  const indexOfFirstChild = indexOfLastChild - childrenPerPage;
  const currentChildren = displayedChildren.slice(
    indexOfFirstChild,
    indexOfLastChild
  );

  return (
    <div>
      <div className=" flex justify-center mb-7">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentChildren.map((child) => (
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
            id={selectedChild.id}
            firstName={selectedChild.firstName}
            lastName={selectedChild.lastName}
            ageGroup={selectedChild.ageGroup}
            gender={selectedChild.gender}
            status={selectedChild.status}
            onClose={() => setSelectedChild(null)}
          />
        )}
      </div>
      <Pagination
        totalItems={displayedChildren.length}
        itemsPerPage={childrenPerPage}
        currentPage={currentPage}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </div>
  );
};

export default ChildrenList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ChildCard from "../components/ChildCard";
// import ChildDetailsModal from "../components/ChildDetailsModal";
// import Pagination from "../components/Pagination";

// // Define a type for the child object

// interface Child {
//   id: string;
//   firstName: string;
//   lastName: string;
//   ageGroup: number;
//   dateOfBirth: string;
//   parent: string;
//   gender: string;
//   status: string;
//   photograph: string;
//   specialNeeds: string;
// }

// const ChildrenList = () => {
//   // Use the Child type for the children array and for selectedChild
//   const [children, setChildren] = useState<Child[]>([]);
//   const [selectedChild, setSelectedChild] = useState<Child | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [childrenPerPage] = useState(6);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios("/api/child");
//       console.log(result.data);
//       setChildren(result.data);
//     };

//     fetchData();
//   }, []);

//   // Get current children
//   const indexOfLastChild = currentPage * childrenPerPage;
//   const indexOfFirstChild = indexOfLastChild - childrenPerPage;
//   const currentChildren = children.slice(indexOfFirstChild, indexOfLastChild);

//   // Change page
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {currentChildren.map((child) => (
//           <ChildCard
//             key={child.id}
//             id={child.id}
//             firstName={child.firstName}
//             lastName={child.lastName}
//             ageGroup={child.ageGroup}
//             dateOfBirth={child.dateOfBirth}
//             parent={child.parent}
//             photograph={child.photograph}
//             gender={child.gender}
//             status={child.status}
//             specialNeeds={child.specialNeeds}
//             onClick={() => setSelectedChild(child)}
//           />
//         ))}

//         {selectedChild && (
//           <ChildDetailsModal
//             firstName={selectedChild.firstName}
//             lastName={selectedChild.lastName}
//             ageGroup={selectedChild.ageGroup}
//             gender={selectedChild.gender}
//             status={selectedChild.status}
//             onClose={() => setSelectedChild(null)}
//           />
//         )}
//       </div>

//       <Pagination
//         totalItems={children.length}
//         itemsPerPage={childrenPerPage}
//         currentPage={currentPage}
//         onPageChange={paginate}
//       />
//     </div>
//   );
// };

// export default ChildrenList;
