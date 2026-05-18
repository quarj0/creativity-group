import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
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

    if (message.length < 10) {
      return Response.json(
        { success: false, message: "Message is too short." },
        { status: 400 }
      );
    }

    // TODO: Send email notification to CG team
    // await resend.emails.send({
    //   from: "noreply@creativitygroup.org",
    //   to: "hello@creativitygroup.org",
    //   replyTo: email,
    //   subject: `Contact: ${subject}`,
    //   html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    // });

    // TODO: Send confirmation email to sender
    // await resend.emails.send({
    //   from: "hello@creativitygroup.org",
    //   to: email,
    //   subject: "We got your message — Creativity Group",
    //   html: `<p>Hi ${name}, thanks for reaching out. We'll get back to you shortly.</p>`,
    // });

    console.log("[CONTACT]", { name, email, subject, message });

    return Response.json(
      { success: true, message: "Message sent! We'll get back to you within 24 hours." },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
