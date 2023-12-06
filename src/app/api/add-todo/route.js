import { NextResponse } from "next/server";
import dbClient from "@/db/dbClient";

export async function POST(req){
    const client = await dbClient;
    const db = await client.db("nextjs_db")
    const collection = await db.collection("todos")
    const {title} = await req.json();
   
    let todo = await collection.insertOne({"title":title})
    console.log(todo);

    return NextResponse.json({
        "message":"OK"
    });
}