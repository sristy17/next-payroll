import { supabase } from "./supabase";
import { User, UpdateProfileRequest, UpdateProfileResponse, DeleteProfileResponse } from "@/app/api/auth/types";

export class ProfileService {
  /**
   * Get current user profile
   */
  static async getCurrentUserProfile(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        throw new Error("User not authenticated");
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      return userProfile;
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
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { user: null, error: { message: "User not authenticated" } };
      }

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data: updatedUser, error: updateError } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user.id)
        .select()
        .single();

      if (updateError) {
        return { user: null, error: { message: updateError.message } };
      }

      // Update auth email if changed
      if (updates.email) {
        const { error: authUpdateError } = await supabase.auth.updateUser({
          email: updates.email,
        });

        if (authUpdateError) {
          console.error("Error updating auth email:", authUpdateError);
        }
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
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error: error.message };
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
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
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { success: false, error: { message: "User not authenticated" } };
      }

      // Delete user from database
      const { error: deleteError } = await supabase
        .from("users")
        .delete()
        .eq("id", user.id);

      if (deleteError) {
        return { success: false, error: { message: deleteError.message } };
      }

      // Sign out user
      await supabase.auth.signOut();

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
      // Extract file path from URL
      const urlParts = profilePicUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `avatars/${fileName}`;

      const { error } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (error) {
        console.error("Error deleting old profile picture:", error);
      }
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  }
}