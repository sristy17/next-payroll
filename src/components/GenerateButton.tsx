import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ClockFading } from "lucide-react";

export default function GenerateButton() {
  const router = useRouter();
  return (
    <div className="w-full min-h-[520px] py-16 flex flex-col items-center justify-center bg-gradient-to-br from-[#0A2416] to-[#11432D] rounded-3xl shadow-2xl shadow-black/20">
      <ClockFading size={120} strokeWidth={2.5} className="mb-12 text-white/80" />
      <div className="text-center">
        <div className="text-white font-bold text-lg md:text-xl mb-8">
          You’ve requested for the generation of GST Return Filling Report
        </div>
        <div className="text-gray-200 text-sm mb-20">
          Please wait for Administrator Review
        </div>
        <Button
          className="w-full rounded-xl font-semibold text-white text-base shadow-md"
          style={{
            background: 'linear-gradient(90deg, #2B9348 0%, #00543C 100%)',
            height: 44,
            boxShadow: '0 2px 8px 0 rgba(0,127,95,0.10)'
          }}
          onClick={() => router.push("/dashboard")}
        >
          Navigate to Dashboard
        </Button>
      </div>
    </div>
  );
} 