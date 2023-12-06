import dbClient from "@/db/dbClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(req){
    const client = await dbClient;
    const db = await client.db("nextjs_db")
    const collection = await db.collection("todos")

    const {id} = await req.json()
    const find_todo = await collection.findOne({_id: new ObjectId(id)})
    console.log("find todo---->",find_todo);

    if(!find_todo){
        return NextResponse.json({"Error": "Todo is not found!"})
    }
    await collection.deleteOne({_id: new ObjectId(id)})

    return NextResponse.json({
        "message": "Todo deleted successfully",
        "id": id
    })
}