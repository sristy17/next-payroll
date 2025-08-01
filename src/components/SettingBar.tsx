"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function SettingsBar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-end items-center px-6 py-4 bg-transparent">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          size="icon"
          title="Toggle Theme"
          className="rounded-full bg-green-600/90 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-colors"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="w-5 h-5 text-gray-100" />
          ) : (
            <Moon className="w-5 h-5 text-gray-100" />
          )}
        </Button>

        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="mr">Marathi</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
