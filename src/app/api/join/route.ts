import { forwardBackendPost } from "@/lib/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return forwardBackendPost("/api/join/", {
      full_name: body.fullName,
      email: body.email,
      institution: body.institution,
      role: body.role,
      interests: body.interests,
      intro: body.intro,
    });
  } catch {
    return Response.json(
      { success: false, message: "Please submit valid form data." },
      { status: 400 }
    );
  }
}
