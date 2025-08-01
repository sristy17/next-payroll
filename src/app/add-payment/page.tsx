"use client";
import Sidebar from "@/components/sidebar";
import PaymentPage, { PaymentFormData } from "./_components/payment-page";
import { useState } from "react";
import PaymentSuccess from "./_components/payment-success";
import { Input } from "@/components/ui/input";
import { Bell, Plus, Search, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="flex justify-between w-full">
          <div className="relative md:w-1/5">
            <Input placeholder="Search..." className="peer ps-9" />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 pb-1 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <Search size={16} aria-hidden="true" />
            </div>
          </div>
          <div className="flex gap-4 md:w-1/3 items-center justify-between">
            <Button className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 rounded-lg" size={"lg"}>
              <Plus />
              Add Business
            </Button>
            <div className="flex gap-4">
              <span className="border rounded-full p-2 cursor-pointer">
                <Bell />
              </span>
              <span className="border rounded-full p-2 cursor-pointer">
                <User2 />
              </span>
            </div>
          </div>
        </div>
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
