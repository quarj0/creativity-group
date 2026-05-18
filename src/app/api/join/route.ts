import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, institution, role, interests, intro } = body;

    // Validate required fields
    if (!fullName || !email || !institution || !role) {
      return Response.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // TODO: Persist to database
    // e.g. await db.insert(members).values({ fullName, email, institution, role, interests, intro, createdAt: new Date() })

    // TODO: Send welcome email via Resend / Nodemailer
    // await resend.emails.send({
    //   from: "welcome@creativitygroup.org",
    //   to: email,
    //   subject: "Welcome to Creativity Group!",
    //   html: `<p>Hi ${fullName}, you're in!</p>`,
    // });

    // TODO: Add to mailing list (Mailchimp, ConvertKit, etc.)

    console.log("[JOIN]", { fullName, email, institution, role, interests, intro });

    return Response.json(
      {
        success: true,
        message: "Application received! We'll be in touch within 48 hours.",
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
