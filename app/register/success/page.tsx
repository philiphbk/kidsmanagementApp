import Image from "next/image";
import HODLogo from "@/public/images/hodlogo1.png";

export default function Success() {
  return (
    <>
      <div className=" flex flex-col p-24 items-center">
        <Image src={HODLogo} width={80} height={80} alt="hodlogo" />
        <p>HOD Kids Pick-Up Platform</p>
        <div className=" flex flex-col items-center border rounded p-4 shadow-xl">
          <h1>Registration Successful</h1>
          <p>Voila! There you go!</p>
          <br />
          <hr></hr>
          <br />
          <p>Thank you for registering your child(ren) with us!</p>
        </div>
      </div>
    </>
  );
}
