"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { status } = useSession();

  return (
    <header className="px-10 py-5 flex justify-between">
      <Link href="/" className="text-2xl font-bold text-green-600">
        ECG
      </Link>
      <div>
        {status === "authenticated" && (
          <>
            <Link
              href="/predictions"
              className="pr-2 border-r border-solid border-green-800">
              My predictions
            </Link>
            <p className="pl-2 cursor-pointer inline-block" onClick={signOut}>
              Logout
            </p>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link
              href="/signin"
              className="pr-2 border-r border-solid border-green-800">
              Sign in
            </Link>
            <Link href="/signup" className="pl-2">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
