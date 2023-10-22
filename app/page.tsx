import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import { postsData } from "@/data";

export default function Home() {
  return (
    <>
      <CategoriesList />
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
        <div>No Posts</div>
      )}
    </>
  );
}
