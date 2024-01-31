"use client";

import { useState } from "react";
import { StaticImageData } from "next/image";
import LatestDropOffs from "../components/LatestDropOffs";
import LatestPickUps from "../components/LatestPickUps";
import SearchBar from "../components/SearchBar";
import ImageSrc from "../components/ImageSrc";

type ChildDropOffProfile = {
  id: number;
  name: string;
  pictureUrl: string | StaticImageData | undefined;
  dropOffTime: string;
};

type ChildPickUpProfile = {
  id: number;
  name: string;
  pictureUrl: string | StaticImageData | undefined;
  pickUpTime: string;
};

const childrenDropOffProfiles: ChildDropOffProfile[] = [
  {
    id: 1,
    name: "John Doe",
    pictureUrl: "",
    dropOffTime: "10:30 AM",
  },
  {
    id: 2,
    name: "John Doe",
    pictureUrl: "",
    dropOffTime: "10:30 AM",
  },
  {
    id: 3,
    name: "John Doe",
    pictureUrl: "",
    dropOffTime: "10:30 AM",
  },
  // Add more child profiles as needed
];

const childrenPickupProfiles: ChildPickUpProfile[] = [
  {
    id: 1,
    name: "John Doe",
    pictureUrl: "",
    pickUpTime: "10:30 AM",
  },
  {
    id: 2,
    name: "John Doe",
    pictureUrl: "",
    pickUpTime: "10:30 AM",
  },
  {
    id: 3,
    name: "John Doe",
    pictureUrl: "",
    pickUpTime: "10:30 AM",
  },
  // Add more child profiles as needed
];

interface Item {
  id: number;
  name: string;
  type: string;
  // Add other properties that might be relevant for your items
}

// Mock data array
const items: Item[] = [
  { id: 1, name: "Child A ", type: "child" },
  { id: 2, name: "Parent B", type: "parent" },
  { id: 3, name: "Caregiver C", type: "caregiver" },
  // ... other items
];

export default function Overview() {
  const [searchTerm, setSearchTerm] = useState<Item[]>([]);
  const handleSearch = (searchTerm: string, searchType: string) => {
    if (searchTerm.trim() === "") {
      setSearchTerm([]);
    } else {
      const results = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.type === searchType
      );
      setSearchTerm(results);
    }

    console.log(`Searching for ${searchTerm} in ${searchType}`);
  };

  return (
    <div className=" flex flex-col items-center">
      <h1 className=" my-6 text-2xl">Welcome to Junior Church!</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        {searchTerm.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <div className=" flex flex-row justify-around mt-20 gap-10">
        <LatestDropOffs childrenDropOffProfiles={childrenDropOffProfiles} />
        <LatestPickUps childrenPickUpProfiles={childrenPickupProfiles} />
      </div>
    </div>
  );
}
