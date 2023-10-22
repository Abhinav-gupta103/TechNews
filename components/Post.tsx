import Image from "next/image";

interface PostProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category?: string;
  links?: string[];
  thumbnail?: string;
  authorEmail?: string;
}

const Post = ({
  id,
  author,
  date,
  thumbnail,
  authorEmail,
  title,
  content,
  links,
  category,
}: PostProps) => {
  return (
    <div>
      <div>
        Posted by: <span className="font-bold">{author}</span> on {date}
      </div>
      <div className="w-full h-72 relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover rounded-md object-center"
          />
        ) : (
          <Image src={"/thumbnail-placeholder.png"} alt={title} fill />
        )}
      </div>
    </div>
  );
};

export default Post;
