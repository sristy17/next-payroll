"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSession } from "../../api/auth/auth";
import GenerateButton from "@/components/GenerateButton";
import Navbar from "@/components/Navbar";

export default function Itr1() {
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
          title="ITR - 1 (Sahaj)"
          description="Generate your ITR-1 (Sahaj) form easily."
        />
        <main className="flex-1 pb-2 flex flex-col justify-between pt-0 max-w-none">
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
              <div className="flex flex-col gap-6">
                <h2 className="text-base font-bold text-gray-900 mt-5">
                  Generate ITR - 1 (Sahaj)
                </h2>
                <p className="text-gray-800 text-sm">
                  ITR-1 (Sahaj) is a simplified income tax return (ITR) form
                  used by salaried individuals in India to file their taxes. It
                  is designed for taxpayers with basic income sources and fewer
                  complexities.
                </p>
                <p className="text-gray-800 text-sm">
                  Only resident individuals can file ITR-1. Those earning income
                  from business or profession, multiple house properties,
                  capital gains, or foreign assets are not eligible to use this
                  form. Additionally, individuals who are directors in a company
                  or hold unlisted equity shares must file other ITR forms, such
                  as ITR-2 or ITR-3.
                </p>
                <p className="text-gray-800 text-sm">
                  Next PAY can enhance the ITR-1 filing process by providing an
                  AI-powered auto-fill feature, where users can simply upload
                  their Form 16, and the system will extract relevant details
                  automatically. Additionally, a deductions optimizer can
                  suggest the best ways to minimize tax liability based on
                  available exemptions. The platform can also integrate tax
                  payment options, allowing users to calculate and pay taxes
                  directly from the app while ensuring compliance with
                  government regulations.
                </p>
              </div>
            )}
          </div>
          {!showPending && (
            <Button
              variant="default"
              size="lg"
              className="w-full rounded-xl font-semibold text-white text-base shadow-md mt-4 mb-5 h-11 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
              onClick={() => setShowPending(true)}
            >
              + Generate
            </Button>
          )}
        </main>
      </div>
    </div>
  );
}
