import { MongoClient } from "mongodb"

const url= "mongodb+srv://alifkhanbubt:MeekaGo@cluster0.0rdsrya.mongodb.net/nextjs_db?retryWrites=true&w=majority"
const mongoClient = new MongoClient(url,{})
const dbClient = mongoClient.connect()

export default dbClient;