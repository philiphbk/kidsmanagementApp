import React from "react";
import Image from "next/image";
import { LatestDropOffsProps, ChildDropOffProfile } from "@/lib/definitions/form-interfaces";


export default function LatestDropOffs<LatestDropOffsProps>({
    childrenDropOffProfiles,
}:{
    childrenDropOffProfiles: ChildDropOffProfile[]
}) {
  return (
    <>
      <div className="border border-gray-300 rounded p-4">
        <h2 className="text-lg font-semibold mb-4">LatestDropOffs</h2>

        <div>
          {childrenDropOffProfiles.map((child) => (
            <div
              key={child.id}
              className="border rounded p-3 mb-3 flex items-center"
            >
              <Image
                src={child.pictureUrl ?? ""}
                alt={child.name}
                className="rounded-full h-12 w-12 mr-4"
              />
              <div>
                <p className="font-semibold">{child.name}</p>
                <p className="text-gray-600">Time in:{child.dropOffTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
