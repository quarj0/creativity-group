export const runtime = 'edge';

import { forwardBackendPost } from "@/lib/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return forwardBackendPost("/api/sponsorship/", {
      company_name: body.companyName,
      contact_name: body.contactName,
      email: body.email,
      phone: body.phone,
      website: body.website,
      interest: body.interest,
      budget: body.budget,
      message: body.message,
    });
  } catch {
    return Response.json(
      { success: false, message: "Please submit valid form data." },
      { status: 400 }
    );
  }
}
