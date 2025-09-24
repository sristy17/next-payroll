"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProfileService } from "@/helpers/profileService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Edit3, Trash2, Upload, Eye, EyeOff, Save, X } from "lucide-react";
import { User as UserType } from "@/app/api/auth/types";
import { getUserProfilePicture } from "@/helpers/profilePictureUtils";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    // Password change states
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
    const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            // Quick check - if no localStorage data, redirect immediately
            if (typeof window !== "undefined") {
                const userId = localStorage.getItem("user_id");
                const userEmail = localStorage.getItem("user_email");

                if (!userId || !userEmail) {
                    router.push("/auth/login");
                    return;
                }
            }

            const userProfile = await ProfileService.getCurrentUserProfile();

            if (!userProfile) {
                router.push("/auth/login");
                return;
            }

            setUser(userProfile);
            setFormData({
                name: userProfile.name || "",
                email: userProfile.email || "",
            });
        } catch (error) {
            console.error("Error:", error);
            router.push("/auth/login");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfilePicFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadProfilePicture = async (file: File) => {
        if (!user?.id) throw new Error("User ID not found");
        return await ProfileService.uploadProfilePicture(file, user.id);
    };

    const handleUpdateProfile = async () => {
        if (!user) return;

        // Validation
        if (!formData.name.trim()) {
            alert("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            alert("Email is required");
            return;
        }

        // Password validation is now handled separately in handlePasswordChange

        setUpdateLoading(true);

        try {
            let profilePicUrl = user.profile_pic;

            // Upload new profile picture if selected
            if (profilePicFile) {
                const uploadedUrl = await uploadProfilePicture(profilePicFile);
                if (uploadedUrl) {
                    profilePicUrl = uploadedUrl;
                }
            }

            // Update user profile in database
            const updateResponse = await ProfileService.updateProfile({
                name: formData.name,
                email: formData.email,
                profile_pic: profilePicUrl || undefined,
            });

            if (updateResponse.error) {
                throw new Error(updateResponse.error.message);
            }

            // Refresh user data
            await fetchUserProfile();
            setIsEditing(false);
            setProfilePicFile(null);
            setProfilePicPreview(null);

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Please try again.");
        } finally {
            setUpdateLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
            alert("Please fill in all password fields");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            alert("New passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            alert("New password must be at least 6 characters long");
            return;
        }

        setUpdateLoading(true);

        try {
            const passwordResponse = await ProfileService.updatePassword(
                passwordData.currentPassword,
                passwordData.newPassword
            );

            if (passwordResponse.error) {
                throw new Error(passwordResponse.error);
            }

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });
            setShowPasswordForm(false);

            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Error updating password. Please check your current password and try again.");
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDeleteProfile = async () => {
        if (!user) return;

        try {
            setUpdateLoading(true);

            const deleteResponse = await ProfileService.deleteProfile();

            if (deleteResponse.error) {
                throw new Error(deleteResponse.error.message);
            }

            router.push("/auth/login");
        } catch (error) {
            console.error("Error deleting profile:", error);
            alert("Error deleting profile. Please try again.");
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Profile</h2>
                    <p className="text-gray-500">Please wait while we fetch your information...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
                        <p className="text-gray-600 mb-6">We couldn't find your profile. Please log in again.</p>
                        <Button
                            onClick={() => router.push("/auth/login")}
                            className="w-full bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            Go to Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-green-600 to-green-700 px-6 py-10 sm:px-8 sm:py-12">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <Image
                                        src={profilePicPreview || getUserProfilePicture(user.profile_pic)}
                                        alt="Profile Picture"
                                        width={112}
                                        height={112}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isEditing && (
                                    <label className="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200">
                                        <Upload className="w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{user.name}</h1>
                                <p className="text-green-100 text-lg mb-1">{user.email}</p>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-green-200 text-sm">
                                    <p>Member since {new Date(user.created_at).toLocaleDateString()}</p>
                                    <span className="hidden sm:inline">•</span>
                                    <p className="capitalize">{user.is_admin ? "Administrator" : "Regular User"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                                <p className="text-gray-600 mt-1">Manage your personal information and account settings</p>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                                {!isEditing ? (
                                    <>
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                        >
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                        <Button
                                            onClick={() => setShowDeleteConfirm(true)}
                                            variant="destructive"
                                            className="shadow-md hover:shadow-lg transition-all duration-200"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Profile
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handleUpdateProfile}
                                            disabled={updateLoading}
                                            className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {updateLoading ? "Saving..." : "Save Changes"}
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({
                                                    name: user.name || "",
                                                    email: user.email || "",
                                                });
                                                setProfilePicFile(null);
                                                setProfilePicPreview(null);
                                            }}
                                            variant="outline"
                                            className="shadow-md hover:shadow-lg transition-all duration-200"
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Profile Form */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="mt-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                disabled={!isEditing}
                                                className="mt-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Password change section - separate from profile editing */}
                                {!isEditing && (
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                                                <p className="text-sm text-gray-600 mt-1">Manage your password and security settings</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                                                className="shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                <Edit3 className="w-4 h-4 mr-2" />
                                                Change Password
                                            </Button>
                                        </div>

                                        {showPasswordForm && (
                                            <div className="space-y-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                                                <div>
                                                    <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">Current Password</Label>
                                                    <Input
                                                        id="currentPassword"
                                                        type="password"
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                        placeholder="Enter current password"
                                                        className="mt-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password</Label>
                                                    <div className="relative mt-2">
                                                        <Input
                                                            id="newPassword"
                                                            type={showPassword ? "text" : "password"}
                                                            value={passwordData.newPassword}
                                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                            placeholder="Enter new password (min. 6 characters)"
                                                            className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                                            ) : (
                                                                <Eye className="h-4 w-4 text-gray-400" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="confirmNewPassword" className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                                                    <Input
                                                        id="confirmNewPassword"
                                                        type={showPassword ? "text" : "password"}
                                                        value={passwordData.confirmNewPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                                                        placeholder="Confirm new password"
                                                        className="mt-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
                                                    <Button
                                                        type="button"
                                                        onClick={handlePasswordChange}
                                                        disabled={updateLoading}
                                                        className="flex-1 bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                                                    >
                                                        <Save className="w-4 h-4 mr-2" />
                                                        {updateLoading ? "Updating..." : "Update Password"}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setShowPasswordForm(false);
                                                            setPasswordData({
                                                                currentPassword: "",
                                                                newPassword: "",
                                                                confirmNewPassword: "",
                                                            });
                                                        }}
                                                        className="shadow-md hover:shadow-lg transition-all duration-200"
                                                    >
                                                        <X className="w-4 h-4 mr-2" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Account Type</Label>
                                                <p className="text-sm text-gray-600 mt-1">Your account permissions level</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.is_admin
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}>
                                                {user.is_admin ? "Administrator" : "Regular User"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Account Created</Label>
                                                <p className="text-sm text-gray-600 mt-1">When you joined our platform</p>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {new Date(user.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between py-3">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Last Updated</Label>
                                                <p className="text-sm text-gray-600 mt-1">Most recent profile changes</p>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {new Date(user.updated_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
                        <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Delete Account</h3>
                            <p className="text-gray-600 mb-6 text-center leading-relaxed">
                                Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, including your profile information and settings.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <Button
                                    onClick={handleDeleteProfile}
                                    disabled={updateLoading}
                                    variant="destructive"
                                    className="flex-1 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    {updateLoading ? "Deleting..." : "Yes, Delete Account"}
                                </Button>
                                <Button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    variant="outline"
                                    className="flex-1 shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}