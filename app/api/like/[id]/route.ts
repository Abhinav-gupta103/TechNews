import { NextApiRequest } from "next";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email as string;

  if (!postId || !userEmail) {
    return NextResponse.json(
      { error: "Invalid postId or userEmail" },
      { status: 400 }
    );
  }

  try {
    // Find the user's existing like for the post
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userEmail,
      },
    });

    if (existingLike) {
      // User has already liked the post, so we should remove the like
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Decrement the like count in the post
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });
      return NextResponse.json({ message: "Like removed" }, { status: 200 });
    } else {
      // User has not liked the post, so we should add a like
      await prisma.like.create({
        data: {
          user: { connect: { email: userEmail } },
          post: { connect: { id: postId } },
        },
      });

      // Increment the like count in the post
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({ message: "Like added" }, { status: 200 });
    }
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
