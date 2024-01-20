import Image from "next/image";
import ProfileImg from "@/public/images/profile.jpeg";

export default function ImageSrc() {
  return (
    <div>
      <Image src={ProfileImg} alt="Profile Image" width={30} height={30} />
    </div>
  );
}
