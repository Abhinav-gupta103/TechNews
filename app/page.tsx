import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import { TPost } from "./types";

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <CategoriesList />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author.name}
            date={post.updatedAt}
            authorEmail={post.authorEmail}
            thumbnail={post.imageUrl}
            category={post.catName}
            links={post.links || []}
          />
        ))
      ) : (
        <div className="py-6">No Posts</div>
      )}
    </>
  );
}
