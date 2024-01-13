import Link from "next/link";
import styles from '../../styles/Register.module.css';

export default function Register() {
  return (
    <div className="styles.register_body flex flex-col justify-center p-60">
      <h1 className=" flex items-center justify-center mb-7 font-extrabold text-5xl text-center antialiased">
        Welcome to Junior Church Kids App
      </h1>
      <div className=" flex gap-9 items-center justify-center">
        <Link
          className=" bg-amber-800 rounded px-4 py-5 text-wrap text-white font-semibold antialiased"
          href="/register/member"
        >
          Register as a Member
        </Link>
        <Link
          className=" bg-amber-800 rounded px-4 py-5 text-wrap text-white font-semibold antialiased"
          href="/register/visitor"
        >
          Register as a Visitor
        </Link>
      </div>
    </div>
  );
}
