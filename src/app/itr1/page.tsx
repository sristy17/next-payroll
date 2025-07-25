"use client"
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { getSession } from "../api/auth/auth";
import GenerateButton from '@/components/GenerateButton';

export default function Itr1() {
  const [username, setUserName] = useState<string | undefined>(undefined);
  const [showPending, setShowPending] = useState(false);

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
      <div className="flex-1 flex flex-col" style={{paddingLeft: 40, paddingRight: 32, paddingTop: 32, paddingBottom: 0}}>
        <header className="flex items-center w-full mb-8" style={{gap: 0}}>
          <div className="relative flex items-center w-80" style={{minWidth: 320}}>
            <svg className="absolute left-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 w-full bg-white text-gray-900 text-base shadow-sm"
              disabled
              style={{height: 44}}
            />
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-4 justify-end">
            <Button
              className="rounded-xl font-semibold text-white text-base shadow-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(90deg, #2B9348 0%, #00543C 100%)',
                minWidth: 200,
                height: 44,
                boxShadow: '0 2px 8px 0 rgba(0,127,95,0.10)'
              }}
            >
              + Add Business
            </Button>
            <Bell className="w-7 h-7 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <div className="flex items-center ml-2">
              <img src="/user-avatar.png" alt="User Avatar" width={44} height={44} className="rounded-full border-2 border-white shadow" />
            </div>
          </div>
        </header>
        <main className="flex-1 pb-2 flex flex-col justify-between" style={{paddingTop: 0, maxWidth: 'none'}}>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 mt-2">{username ? `Hello, ${username}!` : "Hello!"}</h1>
            <p className="text-gray-800 mb-2 text-sm">Send and receive funds with pleasure.</p>
            {showPending ? (
              <div className="w-full" style={{maxWidth: '100%'}}>
                <GenerateButton />
              </div>
            ) : (
              <>
                <h2 className="text-base font-bold text-gray-900 mb-1 mt-5">Generate ITR - 1 (Sahaj)</h2>
                <p className="text-gray-800 mb-14 text-sm">
                  ITR-1 (Sahaj) is a simplified income tax return (ITR) form used by salaried individuals in India to file their taxes. It is designed for taxpayers with basic income sources and fewer complexities.
                </p>
                <p className="text-gray-800 mb-5 text-sm">
                  Only resident individuals can file ITR-1. Those earning income from business or profession, multiple house properties, capital gains, or foreign assets are not eligible to use this form. Additionally, individuals who are directors in a company or hold unlisted equity shares must file other ITR forms, such as ITR-2 or ITR-3.
                </p>
                <p className="text-gray-800 mb-3 text-sm">
                  Next PAY can enhance the ITR-1 filing process by providing an AI-powered auto-fill feature, where users can simply upload their Form 16, and the system will extract relevant details automatically. Additionally, a deductions optimizer can suggest the best ways to minimize tax liability based on available exemptions. The platform can also integrate tax payment options, allowing users to calculate and pay taxes directly from the app while ensuring compliance with government regulations.
                </p>
              </>
            )}
          </div>
          {!showPending && (
            <Button
              className="w-full rounded-xl font-semibold text-white text-base shadow-md mt-4 mb-5"
              style={{
                background: 'linear-gradient(90deg, #2B9348 0%, #00543C 100%)',
                height: 44,
                boxShadow: '0 2px 8px 0 rgba(0,127,95,0.10)'
              }}
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
