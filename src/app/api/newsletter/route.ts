import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json(
        { success: false, message: "Email address is required." },
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

    // TODO: Add subscriber to mailing list
    // Option A — Mailchimp:
    // await fetch(`https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    //   method: "POST",
    //   headers: { Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}` },
    //   body: JSON.stringify({ email_address: email, status: "subscribed" }),
    // });

    // Option B — ConvertKit:
    // await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
    //   method: "POST",
    //   body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
    // });

    // Option C — Resend Audiences:
    // await resend.contacts.create({ email, audienceId: AUDIENCE_ID });

    console.log("[NEWSLETTER]", { email });

    return Response.json(
      { success: true, message: "You're subscribed! Welcome to the CG community." },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
