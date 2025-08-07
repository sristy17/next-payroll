"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import PaymentPage, { PaymentFormData } from "./_components/payment-page";
import PaymentSuccess from "./_components/payment-success";

export default function AddPayment() {
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (data: PaymentFormData) => {
    console.log(data);
    setSuccess(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col pl-10 pr-8 pt-8">
        <Navbar
          title="Add Payment"
          description="Manage your payments efficiently."
        />
        {success ? (
          <PaymentSuccess />
        ) : (
          <PaymentPage handleSubmit={handleSubmit} />
        )}

      </div>
    </div>
  );
}
