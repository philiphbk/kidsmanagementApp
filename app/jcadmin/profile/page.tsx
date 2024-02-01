import React from "react";
import ChildCard from "../components/ChildCard";
import ChildrenList from "../components/children";

export default function Profile() {
  return (
    <div>
      Profile
      {/* <ChildCard name={''} age={0} gender={''} status={''} imageUrl={''} onClick={function (): void {
        throw new Error('Function not implemented.')
      } } />
       */}
      <div className=" p-28">
        <ChildrenList />
      </div>
    </div>
  );
}
