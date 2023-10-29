import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { name: true } } },
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();
  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content must be provided" },
      { status: 500 }
    );
  }
  const id = params.id;
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: title,
        content: content,
        links: links,
        catName: selectedCategory,
        imageUrl: imageUrl,
        publicId: publicId,
      },
    });
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(deletedPost);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
