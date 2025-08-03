"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Plus,
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  TrendingUp,
  DollarSign,
  Receipt,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getSession } from "@/app/api/auth/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AutoGSTData {
  totalSales: number;
  totalPurchases: number;
  cgstCollected: number;
  sgstCollected: number;
  igstCollected: number;
  inputTaxCredit: number;
  netTaxLiability: number;
  lastFilingDate: string;
  nextDueDate: string;
  filingStatus: "pending" | "filed" | "overdue";
}

export default function GstReturn() {
  const [username, setUserName] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoGSTData, setAutoGSTData] = useState<AutoGSTData>({
    totalSales: 125000,
    totalPurchases: 75000,
    cgstCollected: 11250,
    sgstCollected: 11250,
    igstCollected: 0,
    inputTaxCredit: 6750,
    netTaxLiability: 15750,
    lastFilingDate: "2024-12-20",
    nextDueDate: "2025-01-20",
    filingStatus: "pending",
  });
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

  const handleAutoFile = () => {
    setIsProcessing(true);

    setTimeout(() => {
      console.log("Auto-filing GST return with tracked data:", autoGSTData);
      alert("GST Return filed automatically based on your transaction data!");
      setAutoGSTData((prev) => ({
        ...prev,
        filingStatus: "filed",
        lastFilingDate: new Date().toISOString().split("T")[0],
      }));
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="relative flex items-center w-80">
            <svg
              className="absolute left-3 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              className="bg-green-700 hover:bg-green-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
              onClick={() => router.push("/add-business")}
            >
              <Plus className="w-4 h-4" /> Add Business
            </Button>
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="flex items-center cursor-pointer">
              <Image
                src="/user-avatar.png"
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {username ? `Hello, ${username}!` : "Hello!"}
          </h1>
          <p className="text-gray-600 mb-8">
            Your GST returns are automatically calculated and filed based on
            your transaction data.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Automated GST Return Filing
          </h2>
          <p className="text-gray-600 mb-6">
            Next PAY automatically tracks all your business transactions and
            calculates your GST liabilities in real-time. No manual data entry
            required - we handle everything from invoice tracking to tax
            calculations and filing.
          </p>

          <div className="flex items-center mb-6">
            <span className="text-xl mr-2">🤖</span>
            <span className="font-semibold text-lg text-gray-900">
              AI-Powered Automated Process
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Receipt className="w-5 h-5 mr-2 text-green-600" />
                Current Month Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sales</span>
                  <span className="font-semibold text-lg">
                    ₹{autoGSTData.totalSales.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Purchases</span>
                  <span className="font-semibold text-lg">
                    ₹{autoGSTData.totalPurchases.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">CGST Collected</span>
                  <span className="font-semibold text-lg">
                    ₹{autoGSTData.cgstCollected.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SGST Collected</span>
                  <span className="font-semibold text-lg">
                    ₹{autoGSTData.sgstCollected.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Input Tax Credit</span>
                  <span className="font-semibold text-lg">
                    ₹{autoGSTData.inputTaxCredit.toLocaleString()}
                  </span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">
                    Net Tax Liability
                  </span>
                  <span className="font-bold text-xl text-green-600">
                    ₹{autoGSTData.netTaxLiability.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Filing Status & Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      autoGSTData.filingStatus === "filed"
                        ? "bg-green-100 text-green-800"
                        : autoGSTData.filingStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {autoGSTData.filingStatus === "filed"
                      ? "Filed"
                      : autoGSTData.filingStatus === "pending"
                      ? "Pending"
                      : "Overdue"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Filing Date</span>
                  <span className="font-semibold">
                    {new Date(autoGSTData.lastFilingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Due Date</span>
                  <span className="font-semibold text-blue-600">
                    {new Date(autoGSTData.nextDueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-blue-800 text-sm">
                      {autoGSTData.filingStatus === "pending"
                        ? "Ready for automatic filing"
                        : autoGSTData.filingStatus === "filed"
                        ? "Successfully filed this month"
                        : "Overdue - file immediately"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <TrendingUp className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-900 mb-2">
                  How Automated GST Filing Works
                </h4>
                <ul className="list-disc pl-4 text-green-800 text-sm space-y-2">
                  <li>
                    <strong>Real-time Transaction Tracking:</strong> All sales,
                    purchases, and payments are automatically recorded
                  </li>
                  <li>
                    <strong>Smart Tax Calculation:</strong> AI calculates CGST,
                    SGST, IGST, and input tax credits accurately
                  </li>
                  <li>
                    <strong>Compliance Monitoring:</strong> System ensures all
                    transactions comply with GST regulations
                  </li>
                  <li>
                    <strong>Automatic Filing:</strong> Returns are prepared and
                    filed automatically before due dates
                  </li>
                  <li>
                    <strong>Real-time Updates:</strong> Get instant
                    notifications about filing status and tax liabilities
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Zero Manual Entry
              </h4>
              <p className="text-gray-600 text-sm">
                All transaction data is captured automatically from your
                business operations
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">
                100% Accurate
              </h4>
              <p className="text-gray-600 text-sm">
                AI-powered calculations ensure error-free GST returns every time
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Always On Time
              </h4>
              <p className="text-gray-600 text-sm">
                Never miss a deadline with automatic filing before due dates
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Important Information
                </h4>
                <ul className="list-disc pl-4 text-blue-800 text-sm space-y-1">
                  <li>
                    All transaction data is monitored in real-time for GST
                    compliance
                  </li>
                  <li>
                    Returns are automatically filed 2 days before the due date
                  </li>
                  <li>
                    You&apos;ll receive email and SMS notifications for all
                    filing activities
                  </li>
                  <li>
                    Historical data is available for audit and review purposes
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-900 font-semibold mb-4">
            By using Next PAY&apos;s automated GST filing, you benefit from:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-8">
            <li>Complete elimination of manual GST return preparation</li>
            <li>
              Real-time visibility into your tax liabilities and compliance
              status
            </li>
            <li>
              Automatic integration with all your business payment systems
            </li>
            <li>AI-powered accuracy that reduces audit risks and penalties</li>
            <li>
              24/7 monitoring and automatic filing to ensure you never miss
              deadlines
            </li>
          </ul>

          {autoGSTData.filingStatus === "pending" && (
            <Button
              className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg"
              onClick={handleAutoFile}
              disabled={isProcessing}
            >
              <FileText className="w-5 h-5 mr-2" />
              {isProcessing
                ? "Processing Auto-Filing..."
                : "File GST Return Automatically"}
            </Button>
          )}

          {autoGSTData.filingStatus === "filed" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-900 mb-2">
                GST Return Filed Successfully
              </h3>
              <p className="text-green-700">
                Your GST return for this month has been automatically filed and
                submitted.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
