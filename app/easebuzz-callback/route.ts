import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const entries = Object.fromEntries(data.entries());
    console.log("📥 Easebuzz Callback Entries:", entries);

    // ✅ Forward callback to backend
    const res = await fetch("https://psmapi.thenoncoders.in/api/v1/confirm_payment_ezb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.PSM_API_KEY || "",
      },
      body: JSON.stringify(entries),
    });

    const backendResponse = await res.json();
    // console.log("📤 Backend confirm_payment_ezb Response:", backendResponse);

    // ✅ Determine payment status
    const txnid = entries.txnid || backendResponse?.data?.txnid || "";
    // 🧠 Normalize all possible fields from Easebuzz
    const paymentstatus =
      (entries.payment_status ||
        entries.status ||
        backendResponse?.data?.payment_status ||
        backendResponse?.data?.status ||
        "").toString().trim().toLowerCase();
  const orderid =
      (entries.order_id ||
        entries.order_id ||
        backendResponse?.data?.order_id ||
        backendResponse?.data?.order_id ||
        "").toString().trim().toLowerCase();
    console.log("🧾 Final Detected Payment Status:", paymentstatus);

    // ✅ Base URL safety (detect if env missing)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000/";

    // console.log("🌐 Using base URL:", baseUrl);
    // console.log("📦 Payment Status:", paymentstatus);
    //  window.location.href="http://localhost:3000/payment-failed"
    // ✅ Build redirect URL
    let redirectUrl = "";
    if (paymentstatus.toLowerCase() === "success") {
      redirectUrl = `${baseUrl}payment-success?id=${orderid}`;
    } else {
      redirectUrl = `${baseUrl}payment-failed`;
    }

    console.log("➡️ Redirecting to:", redirectUrl);

    // ✅ Validate before redirect
    // try {
    //   new URL(redirectUrl);
    // } catch (err) {
    //   console.error("❌ Invalid redirect URL generated:", redirectUrl);
    //   return NextResponse.json({ error: "Invalid redirect URL", redirectUrl, baseUrl });
    // }

    // Redirect to frontend page
    // return NextResponse.redirect(redirectUrl);
    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    });
  } catch (err) {
    console.error("🔥 Error in Easebuzz Callback:", err);
    return NextResponse.json({ error: "callback error" });
  }
}
