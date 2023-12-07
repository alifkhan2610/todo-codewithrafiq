import dbClient from "@/db/dbClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(req){
    const client = await dbClient;
    const db = await client.db("nextjs_db")
    const collection = await db.collection("todos")

    const {id,title} = await req.json()
    let find_todo = await collection.findOne({_id: new ObjectId(id)})
    if(!find_todo){
        return NextResponse.json({"error": "todo not found for update"})
    }
    await collection.updateOne({_id: new ObjectId(id)},{
        $set:{
            title
        }
    })
    return NextResponse.json({
        "message":"Todo updated successfully",
        "id":id
    })
}