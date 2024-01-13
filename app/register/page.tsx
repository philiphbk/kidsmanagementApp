import Link from "next/link";

import RegisterComponent from "@/components/registration/RegisterComponent";

export default function Register() {
  return (
    <div className="container flex flex-col justify-center p-60">
      <h1 className=" flex items-center justify-center mb-7 font-extrabold text-5xl text-center">
        Welcome to Junior Church Kids App
      </h1>
      <div className=" flex gap-9 items-center justify-center">
        <Link
          className=" bg-amber-800 rounded px-4 py-5 text-wrap text-white font-semibold"
          href="/register/member"
        >
          <RegisterComponent />
        </Link>
        <Link
          className=" bg-amber-800 rounded px-4 py-5 text-wrap text-white font-semibold"
          href="/register/visitor"
        >
          Register as a Visitor
        </Link>
      </div>
    </div>
  );
}
