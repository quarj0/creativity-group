import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      website,
      interest,
      budget,
      message,
    } = body;

    if (!companyName || !contactName || !email || !interest) {
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

    // TODO: Store sponsorship inquiry in database
    // await db.insert(sponsorshipInquiries).values({
    //   companyName, contactName, email, phone, website,
    //   interest, budget, message, status: "new", createdAt: new Date(),
    // });

    // TODO: Notify partnerships team
    // await resend.emails.send({
    //   from: "noreply@creativitygroup.org",
    //   to: "partnerships@creativitygroup.org",
    //   subject: `Sponsorship Inquiry — ${companyName}`,
    //   html: `<p>${contactName} from ${companyName} is interested in sponsoring: ${interest}</p>
    //          <p>Budget: ${budget || "Not specified"}</p><p>${message}</p>`,
    // });

    console.log("[SPONSORSHIP]", { companyName, contactName, email, phone, website, interest, budget, message });

    return Response.json(
      {
        success: true,
        message: "Thank you for your interest! Our partnerships team will contact you within 2 business days.",
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
