"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";

export default function Invoice() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  interface OrderMaster {
    Customer_Name: string;
    Customer_MobileNo: string;
    Customer_Emailid: string;
    mcategory_detail: string;
    state_name: string;
    category_detail: string;
    Location: string;
    order_id: string;
    slot_name: string;
  }

  interface OrderDetail {
    slot_name: string;
    booked_slot_rate: number;
    booking_date: string;
  }

  interface InvoiceData {
    status: boolean;
    ordermaster: OrderMaster[];
    orderdetail: OrderDetail[];
  }

  const [orderData, setOrderData] = React.useState<InvoiceData | null>(null);

  useEffect(() => {
    if (!orderData) return;

    const tbody = document.getElementById("itemsBody") as HTMLTableSectionElement;
    if (!tbody) return;

    let subtotal = 0;
    for (let r = 0; r < tbody.rows.length; r++) {
      // FIX: cell index changed 3 -> 2 because 3 columns only
      const amtText = tbody.rows[r].cells[2].innerText.replace(/[^0-9.-]+/g, "");
      const val = parseFloat(amtText) || 0;
      subtotal += val;
    }

    const discount = 0;
    const total = subtotal;

    document.getElementById("discount")!.innerText = "-₹" + discount.toFixed(2);
    document.getElementById("totalPay")!.innerText = "₹" + total.toFixed(2);

  }, [orderData]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/invoice?id=${orderId}`);
      const json = await res.json();

      if (json.status) {
        setOrderData(json);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <style>{`
        @page { size: A4; margin: 20mm; }
        html,body{height:100%;margin:0;padding:0;font-family: Arial, Helvetica, sans-serif;color:#222;}
        .invoice-wrap{max-width:800px;margin:20px auto;padding:20px;border:1px solid #e3e3e3;border-radius:6px;}
        header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;}
        .brand{display:flex;flex-direction:column;}
        .brand .title{font-size:20px;font-weight:700;color:#1f7a2f;}
        .brand .sub{font-size:12px;color:#555;margin-top:4px;}
        .invoice-meta{text-align:right;}
        .invoice-meta .inv-title{font-weight:700;font-size:18px;}
        .invoice-meta .small{font-size:12px;color:#555;}
        .grid{display:flex;justify-content:space-between;gap:16px;margin-bottom:18px;}
        .box{flex:1;padding:10px;border:1px solid #f0f0f0;border-radius:4px;background:#fff;}
        .box h4{margin:0 0 8px 0;font-size:13px;color:#333;}
        .box p{margin:2px 0;font-size:13px;color:#111;}
        table{width:100%;border-collapse:collapse;margin-top:10px;}
        th,td{padding:10px 8px;border:1px solid #e6e6e6;font-size:14px;text-align:left;}
        th{background:#f6f6f6;font-weight:600;}
        .text-right{text-align:right;}
        .summary{margin-top:12px;display:flex;justify-content:flex-end;}
        .summary .totals{width:320px;border:1px solid #e9e9e9;border-radius:4px;padding:10px;background:#fafafa;}
        .totals .row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px;}
        .totals .row.total{font-weight:700;font-size:16px;border-top:1px dashed #ddd;padding-top:10px;margin-top:6px;}
        .terms{margin-top:16px;font-size:12px;color:#444;line-height:1.45;}
        .actions{margin-top:16px;display:flex;gap:8px;justify-content:flex-end;}
        .btn{padding:8px 12px;border-radius:4px;background:#1f7a2f;color:#fff;border:none;cursor:pointer;font-weight:600;}
        .btn.secondary{background:#555;}
        @media print{header, footer, nav {display:none;} .actions{display:none;} .invoice-wrap{border:none;box-shadow:none;margin:0;padding:0;} body{margin:0;} }
        @media (max-width:520px){header{flex-direction:column;align-items:flex-start;gap:10px;} .invoice-meta{text-align:left;} .grid{flex-direction:column;} .summary{justify-content:flex-start} .totals{width:100%}}
      `}</style>

      <div className="invoice-wrap" id="invoice">
     
          <div className="brand">
            <div className="">
              <Image
                src="/assets/img/logo.webp"
                alt="baseball turf"
                width="70"
                height="150"
              />
            </div>
            <div className="title">PSM Turf – Premium Turf </div>
            <div className="sub">Plot No IIF/11, Unit No. ESNTB0202, Ecospace Business Park, Rajarhat, New Town, South Twenty Four Parganas, West Bengal, 700156</div>
            <div><strong>GST Number:</strong> 19AAOCP7544H1ZT</div>
          </div>
       

        <div className="grid">
          <div className="box">
            <h4>Billed To</h4>
            <p><strong>Name: </strong>{orderData?.ordermaster[0]?.Customer_Name}</p>
            <p><strong>Phone No: </strong>{orderData?.ordermaster[0]?.Customer_MobileNo}</p>
            <p><strong>Email: </strong>{orderData?.ordermaster[0]?.Customer_Emailid}</p>
            <p><strong>Address: </strong>{orderData?.ordermaster[0]?.Location}</p>
          </div>

          <div className="box">
            <h4>Booking Details</h4>
            <p><strong>Turf Type:</strong> {orderData?.ordermaster[0]?.mcategory_detail}</p>
            <p><strong>State Name:</strong> {orderData?.ordermaster[0]?.state_name}</p>
            <p><strong>City:</strong> {orderData?.ordermaster[0]?.category_detail}</p>
            <p><strong>Booking Date:</strong> {orderData?.orderdetail[0]?.booking_date?.split("T")[0]}</p>
            <p><b>OrderId: </b>PSM-{orderData?.ordermaster[0]?.order_id}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr className="text-center">
              <th style={{ width: "30%" }}>Description</th>
              <th style={{ width: "30%" }}>Rate (₹)</th>
              <th style={{ width: "30%" }}>Amount (₹)</th>
            </tr>
          </thead>

          <tbody id="itemsBody">
            {orderData?.orderdetail?.map((item: OrderDetail, index: number) => (
              <tr key={index}>
                <td>{item.slot_name}</td>
                <td className="text-right">{item.booked_slot_rate}</td>
                <td className="text-right">{item.booked_slot_rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary">
          <div className="totals">
            <div className="row"><div>Discount</div><div id="discount">-₹0.00</div></div>
            <div className="row total"><div>Total Payable</div><div id="totalPay">₹0.00</div></div>
          </div>
        </div>

        <div className="actions">
          <button className="btn" onClick={() => window.print()}>Print / Save PDF</button>
        </div>
      </div>
    </>
  );
}
