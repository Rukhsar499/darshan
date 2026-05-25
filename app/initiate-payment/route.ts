import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id } = body;

    console.log("📥 Received order_id:", order_id);

    //const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://njportal.thenoncoders.in";
    const surl = `${process.env.NEXT_PUBLIC_APP_URL}/api/easebuzz-callback`;
    const furl = `${process.env.NEXT_PUBLIC_APP_URL}/api/easebuzz-callback`;

    console.log("🔗 Sending request to initiate payment API...");
    console.log("surl:", surl);
    console.log("furl:", furl);

    const response = await fetch(
      `https://psmapi.thenoncoders.in/api/v1/initiate_booking_payment_ezb`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.PSM_API_KEY || ""
        },
        body: JSON.stringify({
          order_id: order_id,
          surl: surl,
          furl: furl
        }),

      }
    );

    const result = await response.json();
    console.log("🔙 Easebuzz API Raw Response:", result);

    if (result?.data?.access_key?.data) {
      // console.log("✅ Access key received:", result.data.access_key.data);
      return NextResponse.json({
        success: true,
        redirect: `https://pay.easebuzz.in/pay/${result.data.access_key.data}`,
      });
    } else {
      console.log("❌ Payment initiation failed — no access key");
      return NextResponse.json({
        success: false,
        message: "Payment initiation failed",
        details: result,
      });
    }
  } catch (err) {
    console.error("🔥 Server error:", err);
    return NextResponse.json({
      success: false,
      message: "Server error while initiating payment",
    });
  }
}
