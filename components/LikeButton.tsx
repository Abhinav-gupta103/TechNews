"use client";
import { useEffect, useState } from "react";

const LikeButton: React.FC<{ id: string }> = ({ id }) => {
  const [like, setLike] = useState(false);

  useEffect(() => {
    const fetchInitialLikeState = async () => {
      try {
        const response = await fetch(`/api/like/${id}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.message === "User Liked Post") {
            setLike(true);
          } else if (data.message === "User Didn't like Post") {
            setLike(false);
          }
        }
      } catch (error) {
        console.error("Failed to toggle like:", error);
      }
    };
    fetchInitialLikeState();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/like/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        setLike((prevLike) => !prevLike);
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
