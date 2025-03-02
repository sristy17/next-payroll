'use client'

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/logo.png';
import Link from 'next/link';

export default function Dashboard() {
  const pathname = usePathname(); 
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Left Sidebar */}
      <div className="w-[20%] bg-gradient-to-br rounded-3xl m-2 from-green-900 to-black flex items-left justify-start absolute top-0 bottom-0 flex-col">
        <div className="flex flex-row font-bold text-3xl text-white p-4 m-5">
          <div className="w-12 h-12 rounded-3 ">
            <Image src={logo} alt="logo" />
          </div>
          <div className="font-sans text-xl text-white absolute top-12 left-28 space-y-3">
            Next Payroll
          </div>
        </div>
        <div className="font-sans text-l text-white p-2 ml-5 mt-0 space-y-3">
          <Link href="/dashboard"
              className={`flex gap-2 ${isActive('/dashboard') ? 'bg-slate-200 text-black ' : ''} p-2 rounded-md`}
            >
              Dashboard
          </Link>
          <Link href="/addpayment"
              className={`flex gap-2 ${isActive('/addpayment') ? 'bg-slate-200 text-black' : ''} p-2 rounded-md`}
            >
              Add Payment
          </Link>
          <Link href="/itr1"
              className={`flex gap-2 ${isActive('/itr1') ? 'bg-slate-200 text-black' : ''} p-2 rounded-md`}
            >
              ITR-1
          </Link>
          <Link href="/itr4"
              className={`flex gap-2 ${isActive('/itr4') ? 'bg-slate-200 text-black' : ''} p-2 rounded-md`}
            >
              ITR-4
          </Link>
          <Link href="/gst-return"
              className={`flex gap-2 ${isActive('/gst-return') ? 'bg-slate-200 text-black' : ''} p-2 rounded-md`}
            >
              GST Return Filing
          </Link>
        </div>
      </div>
    </>
  );
}
