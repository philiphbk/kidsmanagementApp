"use client";

// This code snippet assumes your component and getServerSideProps are in the same file: pages/children/index.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ChildCard from "../components/ChildCard";
import ChildDetailsModal from "../components/ChildDetailsModal";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

// Define Child interface...
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

const ChildrenList = ({
  initialChildren,
  currentPage,
  totalPages,
}: {
  initialChildren: Child[];
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [filteredChildren, setFilteredChildren] =
    useState<Child[]>(initialChildren);

  let searchQuery: string | string[];
  useEffect(() => {
    // Ensure router is ready before attempting to use router.query
    if (router.isReady) {
      const searchQuery = router.query.search || "";

      // Perform client-side filtering if searchQuery is not empty.
      if (searchQuery) {
        const searchLowerCase = Array.isArray(searchQuery)
          ? searchQuery[0].toLowerCase()
          : searchQuery.toLowerCase();
        const filtered = initialChildren.filter((child) =>
          `${child.firstName} ${child.lastName}`
            .toLowerCase()
            .includes(searchLowerCase)
        );
        setFilteredChildren(filtered);
      } else {
        // If there's no search query, display all children fetched server-side
        setFilteredChildren(initialChildren);
      }
    }
  }, [router.isReady, router.query.search, initialChildren]);

  const handleSearch = (searchTerm: string) => {
    // Update the URL with the search term, maintaining the current page
    router.push(`/children?page=${currentPage}&search=${searchTerm}`);
  };

  return (
    <div>
      <div className="flex justify-center mb-7">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredChildren.map((child) => (
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
        totalItems={totalPages * 6} // Or adjust if your API returns the total number of items
        itemsPerPage={6}
        currentPage={currentPage}
        onPageChange={(pageNumber) => {
          // Update the page in URL, maintaining the search term if present
          const searchParam = searchQuery ? `&search=${searchQuery}` : "";
          window.location.href = `/children?page=${pageNumber}${searchParam}`;
        }}
      />
    </div>
  );
};

export async function getServerSideProps(context: {
  query: { page?: 1 | undefined; search?: "" | undefined };
}) {
  const { page = 1, search = "" } = context.query;
  const limit = 6;
  // Adjust the API call as necessary
  const response = await axios.get(
    `http://localhost:3000/api/child?page=${page}&limit=${limit}&search=${search}`
  );
  // Ensure your API handles the search parameter for initial filtering

  console.log(response.data);
  const { data, total } = response.data;
  const totalPages = Math.ceil(total / limit);

  return {
    props: {
      initialChildren: data,
      currentPage: page.toString(),
      totalPages,
    },
  };
}

export default ChildrenList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ChildCard from "../components/ChildCard";
// import ChildDetailsModal from "../components/ChildDetailsModal";
// import Pagination from "../components/Pagination";
// import SearchBar from "../components/SearchBar"; // Ensure this is the correct path

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

// const ChildrenList = ( { children, currentPage, totalPages }) => {
//const [children, setChildren] = useState<Child[]>([]);
//const [displayedChildren, setDisplayedChildren] = useState<Child[]>([]);
//   const [selectedChild, setSelectedChild] = useState<Child | null>(null);
//const [currentPage, setCurrentPage] = useState(1);
//const [childrenPerPage] = useState(6);

// useEffect(() => {
//   const fetchData = async () => {
//     const result = await axios("/api/child");
//     setChildren(result.data);
//     setDisplayedChildren(result.data); // Initially display all children
//   };

//   fetchData();
// }, [currentPage]);

//   let value = "child";

//   const handleSearch = (searchTerm: string, searchType: string) => {
//     const filteredChildren = children.filter((child) => {
//       const fullName = `${child.firstName} ${child.lastName}`.toLowerCase();
//       return (
//         fullName.includes(searchTerm.toLowerCase()) && value === searchType
//       );
//     });
//     setDisplayedChildren(filteredChildren);
//     setCurrentPage(1); // Reset to first page after search
//   };

// Get current children for pagination
// const indexOfLastChild = currentPage * childrenPerPage;
// const indexOfFirstChild = indexOfLastChild - childrenPerPage;
// const currentChildren = displayedChildren.slice(
//   indexOfFirstChild,
//   indexOfLastChild
// );

//   return (
//     <div>
//       <div className=" flex justify-center mb-7">
//         <SearchBar onSearch={handleSearch} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {children.map((child) => (
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
//             id={selectedChild.id}
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
//         totalItems={totalPages * 6} // Or adjust if your API returns the total number of items
//         itemsPerPage={6}
//         currentPage={currentPage}
//         onPageChange={(pageNumber) => {
//           // Handle page changes by navigating to the new page
//           window.location.href = `?page=${pageNumber}`;
//         }}
//       {/* <Pagination
//         totalItems={displayedChildren.length}
//         itemsPerPage={childrenPerPage}
//         currentPage={currentPage}
//         onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
//       /> */}
//     </div>
//   );
// };

// // Assuming your Next.js page is pages/children/index.js

// export async function getServerSideProps(context: any) {
//   const page = parseInt(context.query.page) || 1;
//   const limit = 6;

//   // Adjust the API call as necessary to match your actual API endpoint and response structure
//   const response = await axios.get(`/api/child?page=${page}&limit=${limit}`);
//   const { data, total } = response.data; // Adjust according to your actual API response

//   const totalPages = Math.ceil(total / limit);

//   return {
//     props: {
//       children: data,
//       currentPage: page,
//       totalPages,
//     },
//   };
// }

// export default ChildrenList;
