import { supabase } from "./supabase";
import { User, UpdateProfileRequest, UpdateProfileResponse, DeleteProfileResponse } from "@/app/api/auth/types";
import { getUser, getSession, signOut } from "@/app/api/auth/provider";

export class ProfileService {
  /**
   * Get current user profile
   */
  static async getCurrentUserProfile(): Promise<User | null> {
    try {
      const { user, error } = await getUser();
      
      if (error || !user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(updates: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    try {
      const { session, error: sessionError } = await getSession();
      
      if (sessionError || !session?.userId) {
        return { user: null, error: { message: "User not authenticated" } };
      }

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data: updatedUser, error: updateError } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", session.userId)
        .select()
        .single();

      if (updateError) {
        return { user: null, error: { message: updateError.message } };
      }

      // Update localStorage if email changed
      if (updates.email && typeof window !== "undefined") {
        localStorage.setItem("user_email", updates.email);
      }

      return { user: updatedUser, error: null };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { user: null, error: { message: "Failed to update profile" } };
    }
  }

  /**
   * Update user password
   */
  static async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      const { session, error: sessionError } = await getSession();
      
      if (sessionError || !session?.userId) {
        return { error: "User not authenticated" };
      }

      // Import bcrypt dynamically to avoid issues
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const { error: updateError } = await supabase
        .from("users")
        .update({ password: hashedPassword, updated_at: new Date().toISOString() })
        .eq("id", session.userId);

      if (updateError) {
        return { error: updateError.message };
      }

      return { error: null };
    } catch (error) {
      console.error("Error updating password:", error);
      return { error: "Failed to update password" };
    }
  }

  /**
   * Upload profile picture
   */
  static async uploadProfilePicture(file: File, userId: string): Promise<string | null> {
    try {
      // Validate file
      if (!file) {
        throw new Error("No file provided");
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error("File must be an image");
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `profile-${userId}-${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          upsert: false,
          cacheControl: '3600'
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      return null;
    }
  }

  /**
   * Delete user profile
   */
  static async deleteProfile(): Promise<DeleteProfileResponse> {
    try {
      const { session, error: sessionError } = await getSession();
      
      if (sessionError || !session?.userId) {
        return { success: false, error: { message: "User not authenticated" } };
      }

      // Delete user from database
      const { error: deleteError } = await supabase
        .from("users")
        .delete()
        .eq("id", session.userId);

      if (deleteError) {
        return { success: false, error: { message: deleteError.message } };
      }

      // Sign out user
      await signOut();

      return { success: true, error: null };
    } catch (error) {
      console.error("Error deleting profile:", error);
      return { success: false, error: { message: "Failed to delete profile" } };
    }
  }

  /**
   * Delete old profile picture from storage
   */
  static async deleteProfilePicture(profilePicUrl: string): Promise<void> {
    try {
      // Extract file path from URL - handle both old avatars bucket and new images bucket
      const url = new URL(profilePicUrl);
      const pathSegments = url.pathname.split('/');
      
      // Find the bucket and file path in the URL
      const bucketIndex = pathSegments.findIndex(segment => segment === 'images' || segment === 'avatars');
      if (bucketIndex !== -1 && bucketIndex < pathSegments.length - 1) {
        const bucket = pathSegments[bucketIndex];
        const filePath = pathSegments.slice(bucketIndex + 1).join('/');
        
        const { error } = await supabase.storage
          .from(bucket)
          .remove([filePath]);

        if (error) {
          console.error("Error deleting old profile picture:", error);
        }
      }
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  }
}