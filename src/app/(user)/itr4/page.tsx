"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSession } from "../../api/auth/auth";
import GenerateButton from "@/components/GenerateButton";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";

export default function Itr4() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const { session, error } = await getSession();
      if (session && error === null) {
        setUsername(session.name);
      }
    }
    fetchSession();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col pl-10 pr-8 pt-8">
        <Navbar
          title="ITR - 4 (Sugam)"
          description="Simplified income tax return form for individuals and small businesses."
        />
        <header className="flex items-center w-full mb-8 gap-0">
          <div className="relative flex items-center w-80 min-w-[320px]">
            <Search className="absolute left-3 text-gray-400 size-5" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 w-full bg-white text-gray-900 text-base shadow-sm h-11"
              disabled
            />
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-4 justify-end">
            <Button
              variant="default"
              size="lg"
              className="rounded-xl font-semibold text-white text-base shadow-md min-w-[200px] h-11 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
            >
              + Add Business
            </Button>
            <Bell className="size-7 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <div className="flex items-center ml-2">
              <Image
                src="/user-avatar.png"
                alt="User Avatar"
                width={44}
                height={44}
                className="rounded-full border-2 border-white shadow"
              />
            </div>
          </div>
        </header>
        <main className="flex-1 pb-2 pt-0 max-w-none">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {username ? `Hello, ${username}!` : "Hello!"}
            </h1>
            <p className="text-gray-800 text-sm">
              Send and receive funds with pleasure.
            </p>
            {showPending ? (
              <div className="w-full max-w-full">
                <GenerateButton />
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <h2 className="text-base font-semibold text-gray-900 mt-5">
                  Generate ITR -4 (Sugam)
                </h2>
                <p className="text-gray-800 text-sm">
                  ITR-4 (Sugam) is a simplified income tax return form for
                  individuals, Hindu Undivided Families (HUFs), and small
                  businesses with income under the presumptive taxation scheme
                  (Section 44AD, 44ADA, 44AE). It is designed for taxpayers with
                  straightforward income sources, such as small business profits
                  or profession-related income.
                </p>
                <div className="flex items-center mt-5">
                  <span className="text-xl mr-2">✅</span>
                  <span className="font-semibold text-base text-gray-900">
                    Who Can File ITR-4?
                  </span>
                </div>
                <p className="text-gray-800 text-sm">
                  ITR-4 can be filed by individuals, Hindu Undivided Families
                  (HUFs), and small businesses who have income under the
                  presumptive taxation scheme, specifically under Sections 44AD,
                  44ADA, or 44AE of the Income Tax Act. This includes taxpayers
                  with income from small business profits, profession-related
                  income, or other specified sources. The form is applicable for
                  those whose total income does not exceed Rs. 50 lakh, and who
                  do not have income from capital gains, multiple house
                  properties, or foreign assets. It is also for taxpayers whose
                  business turnover is below Rs. 2 crore (for businesses) or
                  those with gross receipts under Rs. 50 lakh (for
                  professionals).
                </p>
                <p className="text-gray-800 text-sm">
                  Next PAY simplifies the ITR-4 filing process by offering an
                  AI-powered platform that auto-fills your income tax return
                  with relevant data. You can easily upload your financial
                  details, such as business income and expenses, and the system
                  will extract and fill out the necessary sections for you. Next
                  PAY also helps optimize your tax deductions by suggesting the
                  best ways to minimize your tax liability, ensuring you take
                  full advantage of available exemptions. With seamless tax
                  calculation and payment integration, the platform allows you
                  to file your taxes directly, ensuring compliance with
                  government regulations while making the process fast and
                  hassle-free.
                </p>
                <p className="text-gray-800 mt-5 text-sm font-semibold">
                  By using Next PAY to generate and file your ITR-4 (Sugam), you
                  agree to the following terms and conditions:
                </p>
                <ul className="list-disc pl-6 text-gray-800 text-sm">
                  <li>
                    You confirm that you are eligible to file ITR-4 as per the
                    Income Tax Department of India&apos;s rules.
                  </li>
                  <li>
                    You acknowledge that the information you provide (such as
                    business income, profession-related income, and tax
                    payments) is accurate, complete, and truthful.
                  </li>
                  <li>
                    Next PAY is not responsible for errors caused by incorrect
                    or incomplete data provided by you.
                  </li>
                  <li>
                    Your personal and financial data is processed securely and
                    not shared with third parties except as required by law or
                    for tax filing purposes.
                  </li>
                  <li>
                    Next PAY does not store sensitive financial details such as
                    your PAN, Aadhaar, or bank details beyond the session
                    required for generating the ITR.
                  </li>
                </ul>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full rounded-xl font-semibold text-white text-base shadow-md mt-8 h-11 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
                  onClick={() => setShowPending(true)}
                >
                  + Generate
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
