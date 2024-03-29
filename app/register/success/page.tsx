import Image from "next/image";
import HODLogo from "@/public/images/hodlogo1.png";
import Tick from "@/public/images/Circle.png";
import Link from "next/link";

export default function Success() {
  return (
    <>
      <div className=" success_container flex flex-col p-24 items-center">
        <Image src={HODLogo} width={80} height={80} alt="hodlogo" />
        <p className=" mb-4">Junior Church Monitor</p>
        <div className=" flex flex-col items-center border rounded p-4 shadow-xl">
          <Image src={Tick} width={100} height={100} alt="tick" />
          <h1 className=" font-bold">Registration Successful</h1>
          <p>Voila! There you go!</p>
          <br />
          <hr></hr>
          <br />
          <p className=" mb-14">
            Thank you for registering your child(ren) with us!
          </p>
          <Link href={`/register`}>
            <button className=" bg-[#273472] rounded px-4 py-5 text-wrap text-white font-semibold">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
