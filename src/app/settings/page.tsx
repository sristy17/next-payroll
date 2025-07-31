"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import SettingBar from "@/components/SettingBar";
import { toast } from "react-hot-toast";
import { FileText, SaveAll, User, Bell, Shield, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type NotificationKey = "payroll" | "itr" | "gst";

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
            <div className="w-64 bg-gray-100 border-gray-200">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="flex gap-2 text-3xl font-bold text-gray-800 dark:text-white">
                        <Settings className="mt-2" /> Settings
                    </h2>
                    <SettingBar />
                </div>

                {/* User Preferences */}
                <SectionCard title="User Preferences" subtitle="Manage your personal information and account details" icon={<User className="w-6 h-6" />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</Label>
                            <Input
                                placeholder="Anna Sharma"
                                value={userData.fullName}
                                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</Label>
                            <Input
                                placeholder="anna.sharma@email.com"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</Label>
                            <Input
                                placeholder="+91-9876543210"
                                value={userData.contact}
                                onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <Button
                            onClick={handleSaveUserData}
                            className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            <SaveAll className="w-5 h-5" />
                            Save Changes
                        </Button>
                    </div>
                </SectionCard>

                {/* Tax Settings */}
                <SectionCard title="Tax Settings" subtitle="Configure your tax-related information and preferences" icon={<FileText className="w-6 h-6" />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">GSTIN</Label>
                            <Input
                                placeholder="27AAAPL1234C1ZV"
                                value={taxSettings.gstin}
                                onChange={(e) => setTaxSettings({ ...taxSettings, gstin: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">PAN</Label>
                            <Input
                                placeholder="AAAPL1234C"
                                value={taxSettings.pan}
                                onChange={(e) => setTaxSettings({ ...taxSettings, pan: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">TAN</Label>
                            <Input
                                placeholder="MUMA12345B"
                                value={taxSettings.tan}
                                onChange={(e) => setTaxSettings({ ...taxSettings, tan: e.target.value })}
                                className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Default Return Type</Label>
                            <Select value={taxSettings.defaultReturn} onValueChange={(value) => setTaxSettings({ ...taxSettings, defaultReturn: value })}>
                                <SelectTrigger className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all">
                                    <SelectValue placeholder="Select return type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GST Monthly">GST Monthly</SelectItem>
                                    <SelectItem value="GST Quarterly">GST Quarterly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <Button
                            onClick={handleSaveTaxSettings}
                            className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            <SaveAll className="w-5 h-5" />
                            Save Changes
                        </Button>
                    </div>
                </SectionCard>

                {/* Notification Preferences */}
                <SectionCard title="Notification Preferences" subtitle="Choose what notifications you want to receive" icon={<Bell className="w-5 h-5" />}>
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
                                <Switch
                                    checked={notifications[item.key]}
                                    onCheckedChange={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                                />

                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button
                            onClick={handleSaveNotifications}
                            className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            <SaveAll className="w-5 h-5" />
                            Save Changes
                        </Button>
                    </div>
                </SectionCard>

                {/* Security Settings */}
                <SectionCard title="Security Settings" subtitle="Update your password and security preferences" icon={<Shield className="w-6 h-6" />}>
                    <ResetPasswordForm />
                </SectionCard>
            </div>
        </div>
    );
}

function SectionCard({ title, subtitle, icon, children }: { title: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode }) {
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
                <Label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</Label>
                <Input
                    type="password"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">New Password</Label>
                    <Input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</Label>
                    <Input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
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
