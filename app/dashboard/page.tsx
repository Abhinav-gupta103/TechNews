import Post from "@/components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from "../types";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/author/${email}`);
    if (res.ok) {
      const { posts } = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if (!session) redirect("/sign-in");
  if (email) {
    posts = await getPosts(email);
  }

  return (
    <div>
      <h1>My Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={""}
            date={post.updatedAt}
            authorEmail={post.authorEmail}
            thumbnail={post.imageUrl}
            category={post.catName}
            links={post.links || []}
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
