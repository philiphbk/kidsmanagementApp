import Image from 'next/image'

import HODLogo from "@/public/images/hodlogo1.png";

const HodLogoOnly = () => {
    return (
        <div>
            <Image
                src={HODLogo}
                alt="HOD Logo"
                width="82"
                height="76"
            // priority={true}
            />
        </div>
    )
}

export default HodLogoOnly