import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Thank You",
  description: "Thank You For Booking",
};


export default function ThankYouLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
          {children}
        </>
    )
}
