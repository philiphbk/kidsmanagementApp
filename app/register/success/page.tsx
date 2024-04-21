"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";
import HODLogo from "@/public/images/hodlogo1.png";
import Tick from "@/public/images/Circle.png";
// import Link from "next/link";

export default function Success() {
  const router = useRouter();

  return (
    <>
      <div className=" success_container flex flex-col p-24 items-center">
        <div className="flex flex-col gap-y-2.5 items-center">
          <Image src={HODLogo} width={80} height={80} alt="hodlogo" />
          <h1 className="text-lg sm:text-xl md:text-2xl mb-4">Junior Church Monitor</h1>
        </div>

        <div className="flex gap-y-6 flex-col items-center border rounded p-4 sm:p-6 shadow-lg">
          <Image src={Tick} width={100} height={100} alt="tick" />

          <div className="space-y-2 text-center mb-2 max-w-[19.5rem]">
            <h2 className="text-xl font-semibold">Registration Successful</h2>
            {/* <p>Voila! There you go!</p> */}

            <p>Thank you for registering your child(ren) with us!</p>
          </div>

          {/* <Link href={`/register`}> */}
          <button
            className="bg-[#273472] rounded-lg py-2 px-3 text-wrap text-white font-medium"
            onClick={() => router.push("/register")}
          >
            Return Home
          </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}
