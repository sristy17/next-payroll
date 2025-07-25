"use client"
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { getSession } from "../api/auth/auth";
import GenerateButton from '@/components/GenerateButton';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Itr4() {

  const [username, setUserName] = useState<string | undefined>(undefined);
  const [showPending, setShowPending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const { session, error } = await getSession();
      if (session && error === null) {
        setUserName(session.name);
      }
    }
    fetchSession();
  }, []);
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="relative flex items-center w-80">
            <svg className="absolute left-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              className="bg-green-700 hover:bg-green-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
              onClick={() => router.push('/add-business')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m12 5 0 14m-7-7 14 0"/></svg> Add Business
            </Button>
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="flex items-center cursor-pointer">
              <Image src="/user-avatar.png" alt="User Avatar" width={32} height={32} className="rounded-full" />
            </div>
          </div>
        </header>
        <main className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {username ? `Hello, ${username}!` : "Hello!"}
          </h1>
          <p className="text-gray-600 mb-8">Send and receive funds with pleasure.</p>
          {showPending ? (
            <div className="w-full" style={{maxWidth: '100%'}}>
              <GenerateButton />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate ITR -4 (Sugam)</h2>
              <p className="text-gray-600 mb-6">
                ITR-4 (Sugam) is a simplified income tax return form for individuals, Hindu Undivided Families (HUFs), and small businesses with income under the presumptive taxation scheme (Section 44AD, 44ADA, 44AE). It is designed for taxpayers with straightforward income sources, such as small business profits or profession-related income.
              </p>
              <div className="flex items-center mb-4">
                <span className="text-xl mr-2">✅</span>
                <span className="font-semibold text-lg text-gray-900">Who Can File ITR-4?</span>
              </div>
              <p className="text-gray-600 mb-6">
                ITR-4 can be filed by individuals, Hindu Undivided Families (HUFs), and small businesses who have income under the presumptive taxation scheme, specifically under Sections 44AD, 44ADA, or 44AE of the Income Tax Act. This includes taxpayers with income from small business profits, profession-related income, or other specified sources. The form is applicable for those whose total income does not exceed Rs. 50 lakh, and who do not have income from capital gains, multiple house properties, or foreign assets. It is also for taxpayers whose business turnover is below Rs. 2 crore (for businesses) or those with gross receipts under Rs. 50 lakh (for professionals).
              </p>
              <p className="text-gray-600 mb-6">
                Next PAY simplifies the ITR-4 filing process by offering an AI-powered platform that auto-fills your income tax return with relevant data. You can easily upload your financial details, such as business income and expenses, and the system will extract and fill out the necessary sections for you. Next PAY also helps optimize your tax deductions by suggesting the best ways to minimize your tax liability, ensuring you take full advantage of available exemptions. With seamless tax calculation and payment integration, the platform allows you to file your taxes directly, ensuring compliance with government regulations while making the process fast and hassle-free.
              </p>
              <p className="text-gray-900 font-semibold mb-4">
                By using Next PAY to generate and file your ITR-4 (Sugam), you agree to the following terms and conditions:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>You confirm that you are eligible to file ITR-4 as per the Income Tax Department of India&apos;s rules.</li>
                <li>You acknowledge that the information you provide (such as business income, profession-related income, and tax payments) is accurate, complete, and truthful.</li>
                <li>Next PAY is not responsible for errors caused by incorrect or incomplete data provided by you.</li>
                <li>Your personal and financial data is processed securely and not shared with third parties except as required by law or for tax filing purposes.</li>
                <li>Next PAY does not store sensitive financial details such as your PAN, Aadhaar, or bank details beyond the session required for generating the ITR.</li>
              </ul>
              <Button
                className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mt-6"
                onClick={() => setShowPending(true)}
              >
                + Generate
              </Button>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
