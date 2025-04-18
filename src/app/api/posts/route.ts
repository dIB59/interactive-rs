import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI!;
const dbName = "blogDB";
const env = process.env.NODE_ENV || "production";

export async function GET() {
  if (env !== "production") {
    return new NextResponse(
      // defailt posts for development
      JSON.stringify([
        {
          id: 1,
          title: "Sample Post 1",
          content: "This is the content of Sample Post 1.",
        },
        {
          id: 2,
          title: "Sample Post 2",
          content: "This is the content of Sample Post 2.",
        },
      ]),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const client = await new MongoClient(uri).connect();
    const db = client.db(dbName);
    const posts = await db.collection("posts").find().toArray();

    client.close();
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch posts", { status: 500 });
  }
}

export async function POST(req: Request) {
  if (env !== "production") {
    // defailt posts for development
    const { title, content } = await req.json();
    const newPost = {
      id: Math.floor(Math.random() * 1000),
      title,
      content,
    };
    return new NextResponse(JSON.stringify(newPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { title, content } = await req.json();
    const client = await new MongoClient(uri).connect();
    const db = client.db(dbName);

    const result = await db.collection("posts").insertOne({ title, content });
    const newPost = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(result.insertedId) });

    client.close();
    return NextResponse.json(newPost);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to create post", { status: 500 });
  }
}
