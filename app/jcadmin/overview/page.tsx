"use client";

import { useState } from "react";
import { StaticImageData } from "next/image";
import LatestDropOffs from "../components/LatestDropOffs";
import LatestPickUps from "../components/LatestPickUps";
import SearchBar from "../components/SearchBar";
import ImageSrc from "../components/ImageSrc";
import ChildrenList from "../components/children";
import { GiHighFive } from "react-icons/gi";
import { HiOutlineEmojiHappy } from "react-icons/hi";

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

export default function Overview() {
  return (
    <div className=" flex flex-col items-center">
      <div className=" p-28 ">
        <h1 className=" my-5 text-2xl flex justify-center">
          Welcome to Junior Church!
          <HiOutlineEmojiHappy className="ml-3" />
          <GiHighFive className="ml-3" />
        </h1>
        <ChildrenList />
      </div>
      {/* <SearchBar onSearch={handleSearch} />
      <div>
        {searchTerm.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <div className=" flex flex-row justify-around mt-20 gap-10">
        <LatestDropOffs childrenDropOffProfiles={childrenDropOffProfiles} />
        <LatestPickUps childrenPickUpProfiles={childrenPickupProfiles} />
      </div> */}
    </div>
  );
}
