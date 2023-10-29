import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();
  const authorEmail = "ag0537269@gmail.com";
  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content must be provided" },
      { status: 500 }
    );
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        links: links,
        catName: selectedCategory,
        imageUrl: imageUrl,
        publicId: publicId,
        authorEmail,
      },
    });
    console.log("Post Created");
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
