"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { SaveAll, Shield } from "lucide-react";

export function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl px-8 py-6 mb-12">
      <div className="flex items-center mb-6">
        {icon && (
          <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl w-12 h-12 mr-3 shadow-md">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function FormInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <Label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 shadow-inner bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 transition-all"
      />
    </div>
  );
}

export function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end mt-8">
      <Button
        onClick={onClick}
        className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
      >
        <SaveAll className="w-5 h-5" />
        Save Changes
      </Button>
    </div>
  );
}

// ----------------- ResetPasswordForm -----------------
export function ResetPasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Password reset successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <FormInput
        label="Current Password"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <FormInput
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleReset}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300 disabled:opacity-60"
        >
          <Shield className="w-5 h-5" />
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
}
