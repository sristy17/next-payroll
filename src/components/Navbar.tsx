"use client";
import { useTheme } from "next-themes";

export default function Navbar({ title, description }: { 
  title: string, 
  description: string 
}) {
  const { theme } = useTheme();
  
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}