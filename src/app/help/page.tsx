'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqArticles = [
    {
      question: 'How to onboard a new tenant or business account',
      answer:
        'To onboard a new tenant, go to Settings > Tenant > Add New. Fill out the business details, select tax preferences, and invite users.',
    },
    {
      question: 'Filing ITR-1 and ITR-2 using Gemini AI',
      answer:
        'Gemini AI simplifies ITR filing by auto-fetching income details and recommending deductions. Access via Dashboard > ITR Filing.',
    },
    {
      question: 'Setting up automated payroll schedules',
      answer:
        'Navigate to Payroll > Schedules and set cycle frequency (monthly, bi-weekly, etc). Enable auto-run for salary processing.',
    },
    {
      question: 'Steps to file monthly/quarterly GST returns',
      answer:
        'Go to GST > Returns. Select month/quarter, review sales and purchase data, reconcile ITC, then click File GSTR.',
    },
    {
      question: 'Understanding your AI-powered tax report',
      answer:
        'Your tax report includes income breakdown, AI-suggested deductions, and compliance flags. Available under Reports > AI Insights.',
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-900">How Can We Assist You?</h1>
        <p className="text-gray-700 mt-2">
          Explore answers about payroll, tax filing, and system features — or contact our team.
        </p>
        <div className="mt-6 max-w-xl mx-auto">
          <Input placeholder="🔍 Search payroll, GST, ITR, AI tools..." className="p-4 rounded-lg" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">Explore Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {[
            {
              title: 'System Onboarding',
              desc: 'Set up your business, add users, and start managing payroll with ease.',
            },
            {
              title: 'Payroll & Tax Filing',
              desc: 'Automate salary disbursement, ITR-1/2, and GST returns with smart workflows.',
            },
            {
              title: 'AI Assistant & Insights',
              desc: 'Using Gemini AI for personalized tax-saving tips and anomaly detection.',
            },
          ].map((item, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">{item.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto my-10">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Popular Help Articles</h2>
        <ul className="space-y-2">
          {faqArticles.map((faq, index) => (
            <li key={index} className="border-b pb-2">
              <div
                onClick={() => toggle(index)}
                className="flex justify-between items-center cursor-pointer py-2 text-gray-800 hover:text-green-700 transition"
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-green-600" />
                )}
              </div>
              {openIndex === index && (
                <p className="text-sm text-gray-600 mt-1 px-1">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-12 bg-white py-10 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-green-800">Need More Assistance?</h3>
        <p className="text-gray-600 mb-4">
          Reach out to our team for support on setup, filings, or tailored automation.
        </p>
        <Button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2">Contact Us</Button>
      </div>
    </div>
  );
}
