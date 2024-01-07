import getUser from "@/lib/getUser";
import { Metadata } from "next/types";

type Params = { 
    params: {
        userId: string
    }
}

//generating dynamic metadata
export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId);
    const user: User = await userData;
    return {
        title: `${user.name}`,
        description: `This is the page of ${user.name}`,
    };
    
}


export default function UserPage({ params: { userId } }: Params) {
  return (
    <div>page</div>
  )
}
