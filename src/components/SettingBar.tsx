"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function SettingsBar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-end items-center px-6 py-4 bg-transparent">
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-green-300 dark:bg-zinc-800 hover:bg-gradient-to-br from-green-400 to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
          title="Toggle Theme"
        >
          <span className="text-gray-800 dark:text-gray-200 transition-transform duration-300">
            {resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5 rotate-0 hover:rotate-90 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 rotate-0 hover:-rotate-90 transition-transform" />
            )}
          </span>
        </button>

        {/* Language Selector */}
        <select
          className="border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
      </div>
    </div>
  );
}
