'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function HelpCenterPage() {

  const helpTopics = [
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
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {helpTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
              <p className="text-gray-600 text-sm">{topic.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto my-10">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Popular Help Articles</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqArticles.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
