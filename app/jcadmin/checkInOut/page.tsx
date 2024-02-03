import React from "react";
import ChildrenList from "../components/children";
import ChildHome from "../components/ChildHome";
import Image from "next/image";

export default function CheckInOut() {
  return (
    <div>
      CheckInOut
      <Image
        src="/public/upload/children-bg.jpg"
        alt="children"
        width={500}
        height={500}
      />
      <ChildHome childrenData={[]} />
    </div>
  );
}
