import HODLogo from "@/public/images/hodlogo1.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className=" flex flex-col items-center my-32 p-24">
      <Image src={HODLogo} width={100} height={100} alt="hodlogo" />
      loading...
    </div>
  )
}
