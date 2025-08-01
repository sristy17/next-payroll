"use client";
import Sidebar from "@/components/sidebar";
import PaymentPage, { PaymentFormData } from "./_components/payment-page";
import { useState } from "react";
import PaymentSuccess from "./_components/payment-success";

export default function AddPayment() {
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (data: PaymentFormData) => {
    console.log(data);
    setSuccess(true);
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="container mx-auto flex-1 p-6 md:p-8">
        <div className="flex flex-col gap-y-2 my-4">
          <h1 className="font-bold text-xl md:text-3xl">Hello, Anna!</h1>
          <p className="text-muted-foreground">
            Send and recieve funds with pleasure.
          </p>
        </div>
        {success ? (
          <PaymentSuccess />
        ) : (
          <PaymentPage handleSubmit={handleSubmit} />
        )}
      </main>
    </div>
  );
}
