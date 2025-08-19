import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="bg-gradient-to-br h-full from-green-900 to-black rounded-xl md:p-8 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <CheckCircle2 className="size-32 stroke-white" />
        <h2 className="text-white font-bold text-3xl">
          Payment Added Successfully
        </h2>
      </div>

      <Button asChild className="bg-green-600 hover:bg-green-700 mt-10">
        <Link href={"/dashboard"}>Navigate to Dashboard</Link>
      </Button>
    </div>
  );
}
