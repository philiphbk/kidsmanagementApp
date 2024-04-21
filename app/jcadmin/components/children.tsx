"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, SimpleGrid, Grid, useDisclosure } from "@chakra-ui/react";
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
  parentId: string;
  caregiverIds: string;
  photograph: string;
  specialNeeds: string;
}

const ChildrenList = () => {
  //const [allChildren, setAllChildren] = useState<Child[]>([]);
  const [displayedChildren, setDisplayedChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  //const [currentPage, setCurrentPage] = useState(1);
  //const [childrenPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setSelectedChild(null);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async (searchTerm?: string) => {
      try {
        const result = await axios(
          `/api/child${searchTerm ? `?searchWord=${searchTerm}` : ""}`
        );
        console.log(result.data);
        setDisplayedChildren(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (searchTerm) {
      fetchData(searchTerm);
    } else {
      fetchData();
    }
  }, [searchTerm]);

  let value = "child";

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  function setChildPhoto(photo: string) {
    //console.log(photo);

    // if (photo.includes("/public")) {
    //   return photo.replace("/public", "") as string;
    // } else if (
    //   photo.includes("https://householdofdavid.org/wp-content/uploads")
    // ) {
    //   return photo.replace(
    //     "https://householdofdavid.org/wp-content/uploads",
    //     ""
    //   ) as string;
    // }
    return photo;
  }
  // Get current children for pagination
  // const indexOfLastChild = currentPage * childrenPerPage;
  // const indexOfFirstChild = indexOfLastChild - childrenPerPage;
  // const currentChildren = allChildren?.slice(
  //   indexOfFirstChild,
  //   indexOfLastChild
  // );

  return (
    <Box>
      <Box className="mb-7" display="flex" justifyContent="center">
        <SearchBar onSearch={(e: any) => handleSearch(e)} />
      </Box>

      <SimpleGrid columns={3} spacing="40px">
        {displayedChildren.map((child) => (
          <ChildCard
            key={child.id}
            id={child.id}
            firstName={child.firstName}
            lastName={child.lastName}
            ageGroup={child.ageGroup}
            dateOfBirth={child.dateOfBirth}
            parent={child.parent}
            photograph={setChildPhoto(child.photograph) as string}
            gender={child.gender}
            status={child.status}
            specialNeeds={child.specialNeeds}
            onClick={() => {
              // setShowModal(true);
              onOpen();
              setSelectedChild(child);
            }}
          />
        ))}
        {selectedChild && (
          <ChildDetailsModal
            id={selectedChild?.id}
            firstName={selectedChild?.firstName}
            lastName={selectedChild?.lastName}
            ageGroup={selectedChild?.ageGroup}
            gender={selectedChild?.gender}
            status={selectedChild?.status}
            photograph={setChildPhoto(selectedChild?.photograph) as string}
            parentId={selectedChild?.parentId}
            caregiverIds={selectedChild?.caregiverIds}
            specialNeeds={selectedChild?.specialNeeds}
            isOpen={isOpen} // isOpen prop replaces the show prop
            onClose={onClose}
          />
        )}
      </SimpleGrid>
      {/* <Pagination
        totalItems={allChildren.length}
        itemsPerPage={childrenPerPage}
        currentPage={currentPage}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      /> */}
    </Box>
  );
};

export default ChildrenList;
