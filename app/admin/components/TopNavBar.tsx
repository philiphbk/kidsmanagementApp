import HODLogo from "@/public/images/hodlogo1.png";
import Image from "next/image";
import Link from "next/link";

export default function TopNavBar() {
  return (
    <div>
      <nav className=" flex flex-row justify-around border-b-2 items-center mb-2 pb-5">
        <div>
          <Link href="/admin/overview">
            <Image src={HODLogo} width={60} height={60} alt="hodlogo" />
          </Link>
        </div>
        <div className=" flex flex-row gap-5 ">
          <Link className=" hover:text-blue-800 active:underline font-semibold" href="/admin/overview">Overview</Link>

          <Link className=" hover:text-blue-800 active:underline font-semibold" href="/admin/checkInOut">Check In/Out</Link>

          <Link className=" hover:text-blue-800 active:underline font-semibold" href="/admin/registerUsers">Register Users</Link>

          <Link className=" hover:text-blue-800 active:underline font-semibold" href="/admin/settings">Settings</Link>
        </div>
        <div>
          <Link className=" hover:text-blue-800 active:underline font-semibold" href="/admin/profile">Admin</Link>
        </div>
      </nav>
    </div>
  );
}
