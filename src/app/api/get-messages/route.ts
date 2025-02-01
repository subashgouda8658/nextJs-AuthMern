import { getServerSession } from "next-auth";
import { authOpations } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth"
import mongoose from "mongoose";


export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOpations);
  const user: User = session?.user as User


  if (!session || !session.user) {
    return Response.json({ success: false, message: "Not authenticated" }, { status: 401 })
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ])

    if (!user || user.length === 0) {
      return Response.json({ success: false, message: "user not found" }, { status: 401 })
    }

    return Response.json({ success: true, messages: user[0].messages }, { status: 200 })

  } catch (error) {
    console.log("error while get messages", error);
    return Response.json({ success: false, message: "error while get messages" }, { status: 500 })


  }



}