import { supabase } from "./supabase";

/**
 * Emergency function to create storage bucket if it doesn't exist
 * This requires service_role key, so it won't work with anon key
 */
export const createStorageBucketIfNeeded = async () => {
  try {
    // Try to create the bucket - this will fail silently if it already exists
    const { data, error } = await supabase.storage.createBucket('images', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 50 * 1024 * 1024, // 50MB
    });
    
    if (error && !error.message.includes('already exists')) {
      console.error("Could not create bucket:", error);
      return { success: false, error: error.message };
    }
    
    console.log("Bucket created or already exists");
    return { success: true, error: null };
    
  } catch (error) {
    console.error("Error creating bucket:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};