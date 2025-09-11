"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  TrendingUp,
  DollarSign,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  StatRow,
  AutoGSTData,
  InfoCard,
  StatusBadge,
} from "./_components/GSTCards";

export default function GstReturn() {
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

  const handleAutoFile = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setAutoGSTData((prev) => ({
        ...prev,
        filingStatus: "filed",
        lastFilingDate: new Date().toISOString().split("T")[0],
      }));
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <Navbar
          title="Automated GST Return Filing"
          description="Your GST returns are automatically calculated and filed based on your transaction data."
        />

        <main className="flex-1">
          <div className="flex items-center mb-6">
            <span className="text-xl mr-2">🤖</span>
            <span className="font-semibold text-lg text-gray-900">
              AI-Powered Automated Process
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Receipt className="w-5 h-5 mr-2 text-green-600" /> Current
                Month Summary
              </h3>
              <div className="space-y-4">
                <StatRow
                  label="Total Sales"
                  value={`₹${autoGSTData.totalSales.toLocaleString()}`}
                />
                <StatRow
                  label="Total Purchases"
                  value={`₹${autoGSTData.totalPurchases.toLocaleString()}`}
                />
                <StatRow
                  label="CGST Collected"
                  value={`₹${autoGSTData.cgstCollected.toLocaleString()}`}
                />
                <StatRow
                  label="SGST Collected"
                  value={`₹${autoGSTData.sgstCollected.toLocaleString()}`}
                />
                <StatRow
                  label="Input Tax Credit"
                  value={`₹${autoGSTData.inputTaxCredit.toLocaleString()}`}
                />
                <hr className="my-3" />
                <StatRow
                  label="Net Tax Liability"
                  value={`₹${autoGSTData.netTaxLiability.toLocaleString()}`}
                  highlight
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" /> Filing
                Status & Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Status</span>
                  <StatusBadge status={autoGSTData.filingStatus} />
                </div>
                <StatRow
                  label="Last Filing Date"
                  value={new Date(
                    autoGSTData.lastFilingDate
                  ).toLocaleDateString()}
                />
                <StatRow
                  label="Next Due Date"
                  value={new Date(autoGSTData.nextDueDate).toLocaleDateString()}
                />
                <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center">
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

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <TrendingUp className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-900 mb-2">
                  How Automated GST Filing Works
                </h4>
                <ul className="list-disc pl-4 text-green-800 text-sm space-y-2">
                  {[
                    "Real-time Transaction Tracking",
                    "Smart Tax Calculation",
                    "Compliance Monitoring",
                    "Automatic Filing",
                    "Real-time Updates",
                  ].map((point, i) => (
                    <li key={i}>
                      <strong>{point}:</strong>{" "}
                      {
                        [
                          "All sales, purchases, and payments are automatically recorded",
                          "AI calculates CGST, SGST, IGST, and input tax credits accurately",
                          "System ensures all transactions comply with GST regulations",
                          "Returns are prepared and filed automatically before due dates",
                          "Get instant notifications about filing status and tax liabilities",
                        ][i]
                      }
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard
              icon={DollarSign}
              color="text-green-600"
              title="Zero Manual Entry"
              text="All transaction data is captured automatically from your business operations"
            />
            <InfoCard
              icon={CheckCircle2}
              color="text-blue-600"
              title="100% Accurate"
              text="AI-powered calculations ensure error-free GST returns every time"
            />
            <InfoCard
              icon={Calendar}
              color="text-purple-600"
              title="Always On Time"
              text="Never miss a deadline with automatic filing before due dates"
            />
          </div>

          <div className="bg-blue-50 border rounded-lg p-4 mb-6">
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

          {autoGSTData.filingStatus === "pending" ? (
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
          ) : (
            <div className="bg-green-50 border rounded-lg p-4 text-center">
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
