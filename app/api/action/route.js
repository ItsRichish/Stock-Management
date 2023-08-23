import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  let { action, slug, initial } = await request.json();
  // console.log(initial)
  // console.log(body);
  const URI = "mongodb+srv://Sinister:9821719262@cluster0.wy49m3d.mongodb.net/";
  const client = new MongoClient(URI);
  try {
    const db = client.db("nextjs");
    const inventory = db.collection("inventory");
    const filter = { slug: slug };

    const initalQuantity = parseInt(initial);
    let newQuantity =
      action == "plus" ? initalQuantity + 1 : initalQuantity - 1;
    // console.log(newQuantity);
    const updateDoc = {
      $set: {
        quantity: newQuantity,
      },
    };
    const result = await inventory.updateOne(filter, updateDoc, {});

    return NextResponse.json({
      success: true,
      message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    });
  } finally {
    await client.close();
  }
}
