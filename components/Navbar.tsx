"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { status, data: session } = useSession();
  const [isPopUpVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    if (!isPopUpVisible) {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopUpVisible]);

  return (
    /* eslint-disable react/no-unescaped-entities */
    <div className="flex justify-between pb-4 border-b mb-4 relative">
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
        <>
          <div
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 text-right min-w-[160px] ${
              isPopUpVisible ? "flex" : "hidden"
            }`}
          >
            <div className="font-bold">{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <Link
              onClick={() => setIsPopupVisible(!isPopUpVisible)}
              href={"/dashboard"}
              className="hover:underline"
            >
              Dashboard
            </Link>
            <Link
              onClick={() => setIsPopupVisible(!isPopUpVisible)}
              href={"/create-post"}
              className="hover:underline"
            >
              Create Post
            </Link>
            <button onClick={() => signOut()} className="btn">
              Sign Out
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Link
              className="hidden md:flex gap-2 items-center mr-6"
              href={"/create-post"}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span>Create New</span>
            </Link>
            <Image
              onClick={() => setIsPopupVisible(!isPopUpVisible)}
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt="Profile Image"
              className="rounded-full cursor-pointer"
            />
          </div>
        </>
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
