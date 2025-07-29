"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import SettingBar from "@/components/SettingBar";
import { toast } from "react-hot-toast";
import { FileText } from "lucide-react";
import { SaveAll } from "lucide-react";
import { User } from "lucide-react";
import { Bell } from "lucide-react";
import { Shield } from "lucide-react";
import { Settings } from "lucide-react";

type NotificationKey = 'payroll' | 'itr' | 'gst';

const notificationItems: { key: NotificationKey; title: string; description: string }[] = [
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

    const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>({
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
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100  border-gray-200">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="flex gap-2 text-3xl font-bold text-gray-800 dark:text-white"><Settings className="mt-2" />Settings</h2>
                    <SettingBar />
                </div>

                {/* User Preferences */}
                <SectionCard
                    title="User Preferences"
                    subtitle="Manage your personal information and account details"
                    icon={<User className="w-6 h-6" />}
                >

                    {/* Input Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Full Name"
                            placeholder="Anna Sharma"
                            value={userData.fullName}
                            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                        />
                        <Input
                            label="Email Address"
                            placeholder="anna.sharma@email.com"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        <Input
                            label="Contact Number"
                            placeholder="+91-9876543210"
                            value={userData.contact}
                            onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleSaveUserData}
                            className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            <SaveAll className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </SectionCard>

                {/* Tax Settings */}
                <SectionCard
                    title="Tax Settings"
                    subtitle="Configure your tax-related information and preferences"
                    icon={<FileText className="w-6 h-6" />}
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">GSTIN</label>
                            <input
                                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 transition-all"
                                value={taxSettings.gstin}
                                onChange={(e) => setTaxSettings({ ...taxSettings, gstin: e.target.value })}
                                placeholder="27AAAPL1234C1ZV"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">PAN</label>
                            <input
                                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 transition-all"
                                value={taxSettings.pan}
                                onChange={(e) => setTaxSettings({ ...taxSettings, pan: e.target.value })}
                                placeholder="AAAPL1234C"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">TAN</label>
                            <input
                                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 transition-all"
                                value={taxSettings.tan}
                                onChange={(e) => setTaxSettings({ ...taxSettings, tan: e.target.value })}
                                placeholder="MUMA12345B"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Default Return Type</label>
                            <select
                                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white shadow-inner text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                value={taxSettings.defaultReturn}
                                onChange={(e) => setTaxSettings({ ...taxSettings, defaultReturn: e.target.value })}
                            >
                                <option>GST Monthly</option>
                                <option>GST Quarterly</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleSaveTaxSettings}
                            className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            <SaveAll className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </SectionCard>

                <SectionCard
                    title="Notification Preferences"
                    subtitle="Choose what notifications you want to receive"
                    icon={<Bell className="w-5 h-5" />}
                >
                    <div className="space-y-4">
                        {notificationItems.map((item) => (
                            <div
                                key={item.key}
                                className={`flex justify-between items-center bg-gray-50 rounded-xl p-4 border ${notifications[item.key] ? "border-green-500" : "border-gray-200"
                                    } shadow-sm hover:shadow transition`}
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-gray-500 text-sm">{item.description}</p>
                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifications[item.key]}
                                        onChange={() =>
                                            setNotifications((prev) => ({
                                                ...prev,
                                                [item.key]: !prev[item.key],
                                            }))
                                        }
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSaveNotifications}
                            className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            <SaveAll className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </SectionCard>


                <SectionCard title="Security Settings" subtitle="Update your password and security preferences" icon={<Shield className="w-6 h-6" />}>
                    <ResetPasswordForm />
                </SectionCard>
            </div>
        </div>
    );
}


function SectionCard({
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
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl px-8 py-6 mb-12">
            <div className="flex items-center mb-6">
                {icon && (
                    <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl w-12 h-12 mr-3 shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300 mt-5">
                        {icon}
                    </div>
                )}
                <div className="mt-5">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
                </div>
            </div>
            <div className="space-y-6">{children}</div>
        </div>
    );
}


function Input({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
}: {
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 transition-all duration-200"
            />
        </div>
    );
}


function ResetPasswordForm() {
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
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <input
                    type="password"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 transition-all duration-200"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 transition-all duration-200"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <button
                    onClick={handleReset}
                    disabled={loading}
                    className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300 disabled:opacity-60"
                >
                    <Shield className="w-5 h-5" />
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </div>
    );
}
