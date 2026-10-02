import { NextResponse } from "next/server";

// This is a Next.js App Router API Route.
// It runs securely on the backend (Server), not in the user's browser.
export async function POST(request: Request) {
  try {
    // 1. Parse the incoming JSON data from the frontend
    const data = await request.json();
    const { firstName, lastName, email, phone, message } = data;

    // 2. Validate the data (make sure required fields exist)
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required." },
        { status: 400 } // 400 Bad Request
      );
    }

    // 3. (FUTURE STEP) Save to Database!
    // For now, we will just log it to the server console to prove it works.
    console.log("=== NEW CONTACT SUBMISSION ===");
    console.log(`Name: ${firstName} ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${message}`);
    console.log("==============================");

    // 4. Send a success response back to the frontend
    return NextResponse.json(
      { success: true, message: "Form submitted successfully!" },
      { status: 200 } // 200 OK
    );

  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
