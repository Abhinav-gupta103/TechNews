"use client";
import { useState } from "react";

const LikeButton: React.FC<{ id: string }> = ({ id }) => {
  const [like, setLike] = useState(false);
  const handleLike = async () => {
    try {
      const response = await fetch(`/api/like/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        console.log("Like toggled successfully");
      } else {
        console.error("Fail to toggle like");
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <button
      className={`${like ? "text-blue-500 " : "text-red-500 "}`}
      onClick={handleLike}
    >
      Like
    </button>
  );
};

export default LikeButton;
