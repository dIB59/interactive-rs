import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI!;
const dbName = "blogDB";

export async function GET() {
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
