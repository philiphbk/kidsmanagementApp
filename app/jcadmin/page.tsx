// import { Metadata } from "next";

import Overview from "./overview/page";

// export const meta: Metadata = {
//   title: "Welcome to Admin Page",
//   description: "Register your child(ren) for Junior Church",
//   icons: "@/public/images/hodlogo1.png"
// };

export default function JCAdmin() {
  return (
    <div>
      <Overview />
    </div>
  );
}
