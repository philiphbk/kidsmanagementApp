import Link from "next/link";
import HODLogo from "@/public/images/hodlogo1.png";
import Image from "next/image";

export default function Register() {
  return (
    <div className="success_container h-screen flex flex-col justify-center my-auto py-20">
      <div className="flex justify-center">
        <Image src={HODLogo} width={100} height={100} alt="HOD logo" />
      </div>
      <h1 className="flex items-center justify-center mt-8 mb-12 font-extrabold text-4xl sm:text-[2.75rem] md:text-6xl leading-[2.75rem] text-center text-[#273472]">
        Welcome to <br />
        Junior Church
        <br /> Kids App
      </h1>
      <div className="flex flex-col sm:flex-row gap-x-8 gap-y-6 items-center justify-center">
        <Link
          className="hod_button hod_button_primary"
          style={{ fontWeight: "500" }}
          href="/register/member"
        >
          Register as a Member
        </Link>
        {/* <Link
          className="hod_button hod_button_primary_light"
          style={{ fontWeight: "500" }}
          href="/register/visitor"
        >
          Register as a Visitor
        </Link> */}
      </div>
    </div>
  );
}
