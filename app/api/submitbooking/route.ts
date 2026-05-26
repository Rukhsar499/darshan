import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse incoming data from frontend
    const bookingData = await req.json();

    // Pretty-print incoming data
    console.log("Booking Data Received:\n", JSON.stringify(bookingData, null, 2));

    // Forward to external API
    const response = await fetch("https://psmapi.thenoncoders.in/api/v1/submit_booking_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.PSM_API_KEY || "",
      },
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();
    console.log("External API Response:\n", JSON.stringify(result, null, 2));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { status: false, message: "Server error while submitting booking." },
      { status: 500 }
    );
  }
}
