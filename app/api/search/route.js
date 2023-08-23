import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  //   console.log(query);
  const URI = "mongodb+srv://Sinister:9821719262@cluster0.wy49m3d.mongodb.net/";
  const client = new MongoClient(URI);
  try {
    const db = client.db("nextjs");
    const inventory = db.collection("inventory");

    const stocks = await inventory
      .aggregate([
        {
          $match: {
            $or: [{ slug: { $regex: query, $options: "i" } }],
          },
        },
      ])
      .toArray();
    return NextResponse.json({ success: true, stocks });
  } finally {
    await client.close();
  }
}
