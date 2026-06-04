import { forwardBackendPost } from "@/lib/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return forwardBackendPost("/api/contact/", {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });
  } catch {
    return Response.json(
      { success: false, message: "Please submit valid form data." },
      { status: 400 }
    );
  }
}
