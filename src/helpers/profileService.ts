import { supabase } from "./supabase";
import { User, UpdateProfileRequest, UpdateProfileResponse, DeleteProfileResponse } from "@/app/api/auth/types";
import { getUser, getSession, signOut } from "@/app/api/auth/provider";
import { testDatabaseConnection } from "./testDatabase";

export class ProfileService {
  /**
   * Get current user profile
   */
  static async getCurrentUserProfile(): Promise<User | null> {
    try {
      // Test database connection first
      console.log("Testing database connection...");
      const dbTest = await testDatabaseConnection();
      if (!dbTest.success) {
        console.error("Database connection failed:", dbTest.error);
        throw new Error(`Database error: ${dbTest.error}`);
      }
      console.log("Database connection OK");

      // Check localStorage directly
      if (typeof window !== "undefined") {
        const userId = localStorage.getItem("user_id");
        const userEmail = localStorage.getItem("user_email");
        console.log("LocalStorage check:", { userId, userEmail });
        
        if (!userId || !userEmail) {
          console.log("No authentication data in localStorage");
          return null;
        }
      }

      // First check if we have session data
      console.log("Checking session...");
      const { session, error: sessionError } = await getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        return null;
      }
      
      if (!session?.userId) {
        console.log("No session found - user not logged in");
        return null;
      }
      
      console.log("Session found:", session);
      
      // Now try to get the user
      const { user, error } = await getUser();
      
      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
      
      if (!user) {
        console.log("No user found in database");
        return null;
      }

      console.log("User profile loaded successfully:", user);
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