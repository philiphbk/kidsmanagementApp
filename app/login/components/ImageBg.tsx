import Image from "next/image";
import BgImg from "@/public/images/children-bg.jpg";
export default function ImageBg() {
  return (
    <div>

      <Image src={BgImg} alt="Background Image" width={1920} height={1080} />
    </div>
  )
}
