import { Button } from "@/components/ui/button";
import { ClockFading } from "lucide-react";
import Link from "next/link";

export default function ITR1Request() {
  return (
    <div className="bg-gradient-to-br from-green-900 to-black rounded-xl flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center gap-6 text-center">
        <ClockFading className="size-32 stroke-white" strokeWidth={2.5} />
        <h2 className="text-white font-bold text-2xl md:text-3xl">
          You’ve requested for the generation of ITR 1 Filing Report
        </h2>
        <p className="text-gray-300 text-base">
          Please wait for Administrator Review
        </p>
      </div>

      <Button asChild className="bg-green-600 hover:bg-green-700 mt-10">
        <Link href={"/dashboard"}>Navigate to Dashboard</Link>
      </Button>
    </div>
  );
}
