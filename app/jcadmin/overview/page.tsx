"use client";

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

export default function Overview() {
  const handleSearch = (searchTerm: string, searchType: string) => {
    // Implement your search logic here based on the search term and type
    console.log(`Searching for ${searchTerm} in ${searchType}`);
  };

  const childrenDropOffProfiles: ChildDropOffProfile[] = [
    {
      id: 1,
      name: "John Doe",
      pictureUrl: "" ,
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
  return (
    <div className=" flex flex-col items-center">
      <h1 className=" my-6 text-2xl">Welcome to Junior Church!</h1>
      <SearchBar onSearch={handleSearch} />
      <div className=" flex flex-row justify-around mt-20 gap-10">
        <LatestDropOffs childrenDropOffProfiles={childrenDropOffProfiles} />
        <LatestPickUps childrenPickUpProfiles={childrenPickupProfiles} />
      </div>
    </div>
  );
}
