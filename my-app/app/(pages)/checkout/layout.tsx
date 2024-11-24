// app/(pages)/checkout/layout.tsx (Custom layout for /checkout without Header/Footer)
import React from "react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
