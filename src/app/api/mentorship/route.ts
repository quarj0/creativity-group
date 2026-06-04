export const runtime = 'edge';

import { forwardBackendPost } from "@/lib/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return forwardBackendPost("/api/mentorship/", {
      full_name: body.fullName,
      email: body.email,
      institution: body.institution,
      current_role: body.currentRole,
      area: body.area,
      goals: body.goals,
      linkedin: body.linkedin,
    });
  } catch {
    return Response.json(
      { success: false, message: "Please submit valid form data." },
      { status: 400 }
    );
  }
}
