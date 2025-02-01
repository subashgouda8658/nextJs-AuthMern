import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
  try {

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to:email,
      subject: ' Mystry message | verifiaction code',
      react: VerificationEmail({username,otp:verifyCode}),
    });

    return { success: true, message: "send verification email send successfully" }

  } catch (emailError) {
    console.error("Error sinding verification email", emailError);
    return { success: false, message: "failed to send verification email", }

  }
}


