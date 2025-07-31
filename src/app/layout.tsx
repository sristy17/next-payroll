import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppThemeProvider } from "../components/ThemeProvider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next-Payroll",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }}>
      <body className={`${raleway.variable} antialiased`}>
        <AppThemeProvider>
          {children}
          <Toaster position="top-center" />
        </AppThemeProvider>
      </body>
    </html>
  );
}
