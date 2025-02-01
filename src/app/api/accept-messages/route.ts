import { getServerSession } from "next-auth";
import { authOpations } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth"


export async function POST(request: Request) {
  await dbConnect()

  const session = await getServerSession(authOpations);
  const user: User = session?.user as User

  if (!session || !session.user) {
    return Response.json({ success: false, message: "Not authenticated" }, { status: 401 })
  }

  const userId = user._id;

  const { acceptMessage } = await request.json();

  try {

    const updatedUser = await UserModel.findByIdAndUpdate(userId, { isAcceptingMessage: acceptMessage }, { new: true });

    if (!updatedUser) {
      return Response.json({ success: false, message: "failed to upadate user status to accept message" }, { status: 401 });
    }

    return Response.json({ success: true, message: "message accepting successfully", updatedUser }, { status: 200 });


  } catch (error) {
    console.log("failed to upadate user status to accept message", error);
    return Response.json({ success: false, message: "failed to upadate user status to accept message" }, { status: 500 });
  }
}


export async function GET() {
  await dbConnect()



  const session = await getServerSession(authOpations);
  const user: User = session?.user as User


  if (!session || !session.user) {
    return Response.json({ success: false, message: "Not authenticated" }, { status: 401 })
  }

  const userId = user._id;

  try {
    const foundeUser = await UserModel.findById(userId);

    if (!foundeUser) {
      return Response.json(
        {
          success: false,
          message: "User not found"
        },
        {
          status: 404
        }
      )

    }
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundeUser.isAcceptingMessage,
      },
      {
        status: 200
      }
    )

  } catch (error) {
    console.log("Error in getting meessage acceptance status", error);
    return Response.json({ success: false, message: "Error in getting meessage acceptance status" }, { status: 500 });
  }



}