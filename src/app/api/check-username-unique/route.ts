import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from "zod"
import { UsernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: UsernameValidation
})

export async function GET(request: Request) {
  
  await dbConnect()

  try {

    //* get the username from the url

    const { searchParams } = new URL(request.url)
    const queryParam = {
      username: searchParams.get("username")
    }

    //* validate with zod

    const result = UsernameQuerySchema.safeParse(queryParam);

    console.log(result);//todo remove

    //* if not success return the username errors

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || []
      return Response.json({
        success: false,
        message: usernameErrors?.length > 0 ? usernameErrors.join(",") : "Invalid query parameters"
      }, { status: 400 })
    }

    console.log(result.data);

    const { username } = result.data;

    const existingVerifiedUsername = await UserModel.findOne({ username, isVerified: true })

    if (existingVerifiedUsername) {
      return Response.json({
        success: false,
        message: "username is already taken"
      }, { status: 400 })
    }

    return Response.json({
      success: true,
      message: "username is unique",
    }, { status: 400 })


  } catch (error) {
    console.error("error checking username", error);
    return Response.json({
      success: false,
      message: "Error while checking username"
    },
      {
        status: 500
      }
    )


  }

}



