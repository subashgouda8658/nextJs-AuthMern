import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
// import { z } from "zod"
// import { UsernameValidation } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
  await dbConnect();
  try {

    const { username, code } = await request.json();

    const decodeUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeUsername });

    if (!user) {
      return Response.json({
        success: false,
        message: "user not found"
      }, { status: 500 })
    }

    const isCodeValid = user.verifyCode === code

    const isCdoeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

    if (isCodeValid && isCdoeNotExpired) {
      user.isVerified = true;
      await user.save()

      return Response.json({
        success: true,
        message: "Account verified successfully"
      }, { status: 500 })
    } else if (!isCdoeNotExpired) {
      return Response.json({
        success:false,
        message: "virification code has expired please sigup again to get a new code"
      }, { status: 400 })

    }else{
      return Response.json({
        success:false,
        message: "Incorrect verification code"
      }, { status: 400 })

    }



  } catch (error) {

    console.error("error verifying user", error);
    return Response.json({
      success: false,
      message: "error verifying user"
    }, { status: 500 })
  }
}

