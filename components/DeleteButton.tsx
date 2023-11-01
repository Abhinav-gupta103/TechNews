"use client";

const DeleteButton = ({ id }: { id: string }) => {
  const deleteImage = async (publicId: string) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
  };
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Post?"
    );
    if (confirmed) {
      try {
        const res = await fetch(`api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (res.ok) {
          console.log("Post deleted successfully");
          const post = await res.json();
          const { publicId } = post;
          await deleteImage(publicId);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
};

export default DeleteButton;
