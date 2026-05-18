import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, institution, currentRole, area, goals, linkedin } = body;

    if (!fullName || !email || !currentRole || !area || !goals) {
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

    // TODO: Store application in database
    // await db.insert(mentorshipApplications).values({
    //   fullName, email, institution, currentRole, area, goals, linkedin,
    //   status: "pending", createdAt: new Date(),
    // });

    // TODO: Notify mentorship coordinator
    // await resend.emails.send({
    //   from: "noreply@creativitygroup.org",
    //   to: "mentorship@creativitygroup.org",
    //   subject: `New Mentorship Application — ${fullName}`,
    //   html: `<p>${fullName} (${email}) applied for mentorship in: ${area}</p><p>${goals}</p>`,
    // });

    console.log("[MENTORSHIP]", { fullName, email, institution, currentRole, area, goals, linkedin });

    return Response.json(
      {
        success: true,
        message: "Application submitted! Our mentorship team will reach out within 5 business days.",
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
