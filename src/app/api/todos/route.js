import { NextResponse } from "next/server";
import dbClient from "@/db/dbClient";

export async function GET(req){
    const client = await dbClient;
    const db = await client.db("nextjs_db")
    const collection = await db.collection("todos")
    const todos = await collection.find({}).toArray()

    return NextResponse.json(todos);
}