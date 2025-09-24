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
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
                    <Button onClick={() => router.push("/auth/login")}>
                        Go to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-green-600 px-6 py-8 text-white">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Image
                                src={profilePicPreview || getUserProfilePicture(user.profile_pic)}
                                alt="Profile Picture"
                                width={80}
                                height={80}
                                className="rounded-full border-4 border-white object-cover"
                            />
                            {isEditing && (
                                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer">
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
                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-green-100">{user.email}</p>
                            <p className="text-green-200 text-sm">
                                Member since {new Date(user.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                        <div className="flex space-x-2">
                            {!isEditing ? (
                                <>
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                    <Button
                                        onClick={() => setShowDeleteConfirm(true)}
                                        variant="destructive"
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
                                        className="bg-green-600 hover:bg-green-700 text-white"
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
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>

                            {/* Password change section - separate from profile editing */}
                            {!isEditing && (
                                <div className="pt-4 border-t">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium">Password</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                                        >
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Change Password
                                        </Button>
                                    </div>

                                    {showPasswordForm && (
                                        <div className="space-y-4 p-4 border rounded-lg">
                                            <div>
                                                <Label htmlFor="currentPassword">Current Password</Label>
                                                <Input
                                                    id="currentPassword"
                                                    type="password"
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                    placeholder="Enter current password"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="newPassword">New Password</Label>
                                                <div className="relative mt-1">
                                                    <Input
                                                        id="newPassword"
                                                        type={showPassword ? "text" : "password"}
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                        placeholder="Enter new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                                                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                                                <Input
                                                    id="confirmNewPassword"
                                                    type={showPassword ? "text" : "password"}
                                                    value={passwordData.confirmNewPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                                                    placeholder="Confirm new password"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="flex space-x-2">
                                                <Button
                                                    type="button"
                                                    onClick={handlePasswordChange}
                                                    disabled={updateLoading}
                                                    className="flex-1"
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

                        <div className="space-y-4">
                            <div>
                                <Label>Account Type</Label>
                                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium">
                                        {user.is_admin ? "Administrator" : "Regular User"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <Label>Account Created</Label>
                                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm">
                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <Label>Last Updated</Label>
                                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm">
                                        {new Date(user.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Delete Account</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
                        </p>
                        <div className="flex space-x-4">
                            <Button
                                onClick={handleDeleteProfile}
                                disabled={updateLoading}
                                variant="destructive"
                                className="flex-1"
                            >
                                {updateLoading ? "Deleting..." : "Yes, Delete Account"}
                            </Button>
                            <Button
                                onClick={() => setShowDeleteConfirm(false)}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}