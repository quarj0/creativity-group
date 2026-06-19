import { forwardBackendPost } from "@/lib/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return forwardBackendPost("/api/newsletter/", {
      email: body.email,
    });
  } catch {
    return Response.json(
      { success: false, message: "Please submit valid form data." },
      { status: 400 }
    );
  }
}
