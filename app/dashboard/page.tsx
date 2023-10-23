import Post from "@/components/Post";
import { postsData } from "@/data";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1>My Posts</h1>
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            date={post.datepublished}
            authorEmail={"test@email.com"}
            thumbnail={post.thumbnail}
            category={post.category}
            links={post.links}
          />
        ))
      ) : (
        <div className="py-6">
          No Posts created yet.
          <Link href={"/create-post"} className="underline">
            {" "}
            Create New
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
