"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();
  return (
    /* eslint-disable react/no-unescaped-entities */
    <div className="flex justify-between pb-4 border-b mb-4">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            Tech News
          </h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow's Innovations,
          <br />
          One Byte at a Time.
        </p>
      </div>
      {status === "authenticated" ? (
        <div className="flex items-center">
          <button onClick={() => signOut()} className="btn">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <Link className="btn" href={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
