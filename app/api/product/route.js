import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const URI = "mongodb+srv://Sinister:9821719262@cluster0.wy49m3d.mongodb.net/";
  const client = new MongoClient(URI);
  try {
    const db = client.db("nextjs");
    const inventory = db.collection("inventory");
    const query = {};
    const stocks = await inventory.find(query).toArray();
    return NextResponse.json({ success: true, stocks });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  let body = await request.json();
  // console.log(body);
  const URI = "mongodb+srv://Sinister:9821719262@cluster0.wy49m3d.mongodb.net/";
  const client = new MongoClient(URI);
  try {
    const db = client.db("nextjs");
    const inventory = db.collection("inventory");
    const product = await inventory.insertOne(body);
    return NextResponse.json({ product, ok: true });
  } finally {
    await client.close();
  }
}
