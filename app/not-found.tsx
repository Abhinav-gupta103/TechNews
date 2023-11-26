import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div
      style={{ height: "50vh" }}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <p className="text-blue-500">Go back to the home page</p>
      </Link>
    </div>
  );
};

export default notFound;
