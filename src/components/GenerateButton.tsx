import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GenerateButton() {
  const router = useRouter();
  return (
    <div className="w-full min-h-[520px] py-16 flex flex-col items-center justify-center bg-gradient-to-br from-[#0A2416] to-[#11432D] rounded-3xl shadow-2xl shadow-black/20">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-12">
        {/* Left semicircle broken into arcs */}
        <path d="M60 20 A40 40 0 0 0 20 60" stroke="#fff" strokeWidth="8" fill="none" opacity="0.3" strokeDasharray="18 14" />
        <path d="M20 60 A40 40 0 0 0 60 100" stroke="#fff" strokeWidth="8" fill="none" opacity="0.3" strokeDasharray="18 14" />
        {/* Right semicircle solid */}
        <path d="M60 100 A40 40 0 0 0 100 60 A40 40 0 0 0 60 20" stroke="#fff" strokeWidth="8" fill="none" />
        {/* Clock hand */}
        <line x1="60" y1="60" x2="60" y2="38" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <line x1="60" y1="60" x2="80" y2="70" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <circle cx="60" cy="60" r="6" fill="#fff" />
      </svg>
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