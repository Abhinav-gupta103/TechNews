"use client";

const DeleteButton = ({ id }: { id: string }) => {
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
