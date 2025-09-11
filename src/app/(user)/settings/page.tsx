"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FileText, User, Bell, Shield } from "lucide-react";
import {
  SectionCard,
  ResetPasswordForm,
  FormInput,
  SaveButton,
} from "./_components/SettingsCards";
import Navbar from "@/components/Navbar";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type NotificationKey = "payroll" | "itr" | "gst";

const notificationItems: {
  key: NotificationKey;
  title: string;
  description: string;
}[] = [
  {
    key: "payroll",
    title: "Payroll Alerts",
    description: "Get notified about payroll processing and updates",
  },
  {
    key: "itr",
    title: "ITR Deadline Reminders",
    description: "Receive reminders for income tax return deadlines",
  },
  {
    key: "gst",
    title: "GST Filing Alerts",
    description: "Get alerts for GST filing deadlines and updates",
  },
];

export default function SettingsPage() {
  const [userData, setUserData] = useState({
    fullName: "Anna Sharma",
    email: "anna.sharma@email.com",
    contact: "+91-9876543210",
  });

  const [taxSettings, setTaxSettings] = useState({
    gstin: "27AAAPL1234C1ZV",
    pan: "AAAPL1234C",
    tan: "MUMA12345B",
    defaultReturn: "GST Monthly",
  });

  const [notifications, setNotifications] = useState<
    Record<NotificationKey, boolean>
  >({
    payroll: true,
    itr: true,
    gst: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUserData = localStorage.getItem("userData");
      const savedTaxSettings = localStorage.getItem("taxSettings");
      const savedNotifications = localStorage.getItem("notifications");

      if (savedUserData) setUserData(JSON.parse(savedUserData));
      if (savedTaxSettings) setTaxSettings(JSON.parse(savedTaxSettings));
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const handleSaveUserData = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    toast.success("User preferences saved!");
  };

  const handleSaveTaxSettings = () => {
    localStorage.setItem("taxSettings", JSON.stringify(taxSettings));
    toast.success("Tax settings saved!");
  };

  const handleSaveNotifications = () => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    toast.success("Notification preferences saved!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <Navbar
          title="Settings"
          description={`Update or Change settings for your profile.`}
        />

        <main className="flex-1">
          {/* User Preferences */}
          <SectionCard
            title="User Preferences"
            subtitle="Manage your personal information and account details"
            icon={<User className="w-6 h-6" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
              />
              <FormInput
                label="Email Address"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <FormInput
                label="Contact Number"
                value={userData.contact}
                onChange={(e) =>
                  setUserData({ ...userData, contact: e.target.value })
                }
              />
            </div>

            <SaveButton onClick={handleSaveUserData} />
          </SectionCard>

          {/* Tax Settings */}
          <SectionCard
            title="Tax Settings"
            subtitle="Configure your tax-related information and preferences"
            icon={<FileText className="w-6 h-6" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <FormInput
                label="GSTIN"
                value={taxSettings.gstin}
                onChange={(e) =>
                  setTaxSettings({ ...taxSettings, gstin: e.target.value })
                }
              />
              <FormInput
                label="PAN"
                value={taxSettings.pan}
                onChange={(e) =>
                  setTaxSettings({ ...taxSettings, pan: e.target.value })
                }
              />
              <FormInput
                label="TAN"
                value={taxSettings.tan}
                onChange={(e) =>
                  setTaxSettings({ ...taxSettings, tan: e.target.value })
                }
              />
              <div>
                <Label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Default Return Type
                </Label>
                <Select
                  value={taxSettings.defaultReturn}
                  onValueChange={(value) =>
                    setTaxSettings({ ...taxSettings, defaultReturn: value })
                  }
                >
                  <SelectTrigger className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 shadow-inner bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 transition-all">
                    <SelectValue placeholder="Select return type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GST Monthly">GST Monthly</SelectItem>
                    <SelectItem value="GST Quarterly">GST Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SaveButton onClick={handleSaveTaxSettings} />
          </SectionCard>

          {/* Notifications */}
          <SectionCard
            title="Notification Preferences"
            subtitle="Choose what notifications you want to receive"
            icon={<Bell className="w-6 h-6" />}
          >
            <div className="space-y-4">
              {notificationItems.map((item) => (
                <div
                  key={item.key}
                  className={`flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border ${
                    notifications[item.key]
                      ? "border-green-500"
                      : "border-gray-200 dark:border-gray-700"
                  } shadow-sm hover:shadow transition`}
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {item.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key],
                      }))
                    }
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                  />
                </div>
              ))}
            </div>

            <SaveButton onClick={handleSaveNotifications} />
          </SectionCard>

          {/* Security */}
          <SectionCard
            title="Security Settings"
            subtitle="Update your password and security preferences"
            icon={<Shield className="w-6 h-6" />}
          >
            <ResetPasswordForm />
          </SectionCard>
        </main>
      </div>
    </div>
  );
}
