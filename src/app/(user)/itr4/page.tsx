"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ITR4Request from "@/app/(user)/itr4/_components/ITR4Request";
import Navbar from "@/components/Navbar";

export default function Itr4() {
  const [showPending, setShowPending] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col p-4">
        <Navbar
          title="ITR - 4 (Sugam)"
          description="Simplified income tax return form for individuals and small businesses."
        />

        <main className="flex-1 flex flex-col">
          {showPending ? (
            <div className="flex-1">
              <ITR4Request />
            </div>
          ) : (
            <div className="flex flex-col flex-1 justify-between">
              <div className="flex flex-col gap-5">
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
              </div>

              <Button
                variant="default"
                size="lg"
                className="w-full rounded-xl font-semibold text-white text-base shadow-md mt-8 mb-5 h-11 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
                onClick={() => setShowPending(true)}
              >
                + Generate
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
