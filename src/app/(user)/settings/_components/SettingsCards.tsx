"use client";

import { useState,useEffect,useRef,useCallback} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { SaveAll, Shield } from "lucide-react";
import { supabase } from "@/helpers/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadPhotoMutation,useRemovePhotoMutation } from "@/app/api/auth/query";
import { getCroppedImg}  from "@/lib/utils";
import Cropper, { Area } from "react-easy-crop"

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

// ----------------- Upload avatar ---------------------
type ProfilePhotoFormProps = {
  userData: {
    id: string;
    profile_pic?: string | null;  // allow both undefined and null
  } | null;
};

export function ProfilePhotoForm({ userData }: ProfilePhotoFormProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadMutation = useUploadPhotoMutation();
  const removeMutation = useRemovePhotoMutation();

  // Load existing avatar from Supabase
  useEffect(() => {
    let isMounted = true;

    async function fetchAvatar() {
      if (userData?.profile_pic) {
        const { data, error } = await supabase.storage
          .from("profile_pictures")
          .createSignedUrl(userData.profile_pic, 60 * 60);
        if (!error && isMounted) {
          setAvatarUrl(data.signedUrl);
          setAvatarPath(userData.profile_pic);
        }
      } else {
        setAvatarUrl(null);
        setAvatarPath(null);
      }
    }

    fetchAvatar();
    return () => {
      isMounted = false;
    };
  }, [userData?.profile_pic]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Invalid file type.");
      return;
    }
    if (file.size / 1024 / 1024 > 1) {
      toast.error("File too large. Max 1 MB.");
      return;
    }

    if (imageUrl) URL.revokeObjectURL(imageUrl);

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setImageUrl(url);
    setShowCropModal(true);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirmCrop = async () => {
    if (!imageUrl || !croppedAreaPixels || !selectedFile || !userData?.id) return;

    try {
      const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
      const croppedFile = new File(
        [croppedBlob],
        `${userData.id}-${Date.now()}.${selectedFile.name.split(".").pop()}`,
        { type: croppedBlob.type }
      );

      uploadMutation.mutate({ userId: userData.id, file: croppedFile });

      setSelectedFile(null);
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
      setShowCropModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to crop image.");
    }
  };

  const handleRemove = () => {
    if (userData?.id && avatarPath) {
      removeMutation.mutate({ userId: userData.id, avatarPath });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />

      <div
        onClick={() => {
          if (avatarUrl) setShowPreviewModal(true);
          else fileInputRef.current?.click();
        }}
        className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-4xl font-bold">+</span>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          disabled={uploadMutation.isPending}
          onClick={() => fileInputRef.current?.click()}
          className="bg-green-600 text-white"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload Photo"}
        </Button>

        <Button
          type="button"
          disabled={removeMutation.isPending || !avatarUrl}
          onClick={handleRemove}
          className="bg-red-500 text-white"
        >
          {removeMutation.isPending ? "Removing..." : "Remove Photo"}
        </Button>
      </div>

      {/* Crop Modal */}
      {showCropModal && imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-96 h-96 relative flex flex-col items-center justify-center">
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={true}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              restrictPosition={false}
            />
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-3/4"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button onClick={handleConfirmCrop} disabled={uploadMutation.isPending} className="bg-green-600 text-white">
                {uploadMutation.isPending ? "Uploading..." : "Confirm"}
              </Button>
              <Button
                onClick={() => {
                  setShowCropModal(false);
                  setSelectedFile(null);
                  if (imageUrl) URL.revokeObjectURL(imageUrl);
                  setImageUrl(null);
                }}
                className="bg-red-500 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Preview Modal */}
      {showPreviewModal && avatarUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setShowPreviewModal(false)}
        >
          <img
            src={avatarUrl}
            alt="Avatar Preview"
            className="w-64 h-64 rounded-full object-cover shadow-xl hover:cursor-pointer"
          />
        </div>
      )}
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
