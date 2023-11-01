import { TPost } from "@/app/types";
import Post from "@/components/Post";

async function getPosts(catName: string): Promise<TPost[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const cateogries = await res.json();
      const posts = cateogries.posts;
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export default async function CategoryPosts({
  params,
}: {
  params: { catName: string };
}) {
  const category = params.catName;
  const posts = await getPosts(category);

  return (
    <>
      <h1>
        <span className="font-normal">Category: </span>{" "}
        {decodeURIComponent(category)}
      </h1>
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
