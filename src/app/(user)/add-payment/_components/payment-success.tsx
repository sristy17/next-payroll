import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="bg-gradient-to-br from-green-900 md:h-3/4 to-black rounded-xl p-4 md:p-8">
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col h-3/4 justify-center items-center gap-6">
          <CheckCircle2 className="size-32 stroke-white" />
          <h2 className="text-white font-bold text-3xl">
            Payment Added Successfully
          </h2>
        </div>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href={"/dashboard"}>Navigate to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
