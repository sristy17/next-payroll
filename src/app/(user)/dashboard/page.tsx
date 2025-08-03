"use client";

import Link from "next/link";
import StatisticsSection from "./StatisticsSection";
import {
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Dot,
  MoreHorizontal,
} from "lucide-react";
import { getSession } from "@/app/api/auth/auth";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const mockTransactions = [
  {
    id: "t1",
    name: "Netflix Subscription",
    amount: -15.49,
    date: "Apr 05 2023 at 21:46",
    type: "expense",
  },
  {
    id: "t2",
    name: "Spotify Subscription Renew",
    amount: 135.49,
    date: "Mar 14 2023 at 08:30",
    type: "income",
  },
  {
    id: "t3",
    name: "Figma Plugin Deduction",
    amount: -75.0,
    date: "Feb 20 2023 at 19:24",
    type: "expense",
  },
  {
    id: "t4",
    name: "Shopify Share Credit",
    amount: 934.29,
    date: "Jan 07 2023 at 08:58",
    type: "income",
  },
];

const mockTaxFilings = [
  {
    id: "tf1",
    name: "ITR-1 (Sahaj)",
    date: "Apr 05 2023 at 21:46",
    status: "Filed on 12th Jan 25",
  },
  {
    id: "tf2",
    name: "ITR-1 (Sahaj)",
    date: "Apr 05 2023 at 21:46",
    status: "Filed on Tuesday",
  },
  {
    id: "tf3",
    name: "ITR-1 (Sahaj)",
    date: "Apr 05 2023 at 21:46",
    status: "Not Filed for this year",
  },
];

export default function DashboardPage() {
  const [username, setUsername] = useState<string | undefined>(undefined);

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
    <>
      <Navbar
        title="Dashboard"
        description="Send and receive funds with pleasure."
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Hello, {username} !
      </h1>
      <p className="text-gray-600 mb-8">
        Send and receive funds with pleasure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Income
          </h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gray-900">$974,99</span>
            <span className="text-green-500 flex items-center text-sm font-medium">
              <ChevronUp className="w-4 h-4 mr-0.5" /> 7.85%
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1">from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Expense
          </h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gray-900">$425,30</span>
            <span className="text-red-500 flex items-center text-sm font-medium">
              <ChevronDown className="w-4 h-4 mr-0.5" /> 22.30%
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1">from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Savings
          </h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gray-900">$549,61</span>
            <span className="text-green-500 flex items-center text-sm font-medium">
              <ChevronUp className="w-4 h-4 mr-0.5" /> 9.50%
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1">from last week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Tax Filing Status
            </h2>
            <div className="flex items-center space-x-4 text-gray-500 text-sm">
              <Link href="#" className="hover:underline">
                Reports
              </Link>
              <Link href="#" className="hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {mockTaxFilings.map((filing) => (
              <div
                key={filing.id}
                className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-800">{filing.name}</p>
                  <p className="text-xs text-gray-500">{filing.date}</p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    filing.status.includes("Not Filed")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {filing.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Transactions
            </h2>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Link href="#" className="hover:underline">
                Upcoming Bills
              </Link>
              <Link href="#" className="hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-bold uppercase">
                    {transaction.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.name}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-semibold ${
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "expense" ? "-" : "+"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h2>
        <StatisticsSection />
        <div className="flex justify-center items-center space-x-6 mt-4 text-sm">
          <div className="flex items-center">
            <Dot className="w-6 h-6 text-purple-600" />
            <span className="text-gray-700">Money Income</span>
          </div>
          <div className="flex items-center">
            <Dot className="w-6 h-6 text-green-500" />
            <span className="text-gray-700">Current State</span>
          </div>
        </div>
      </div>
    </>
  );
}
