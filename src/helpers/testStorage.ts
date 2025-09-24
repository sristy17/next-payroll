import { supabase } from "./supabase";

/**
 * Test if the images storage bucket exists and is accessible
 */
export const testStorageBucket = async () => {
  try {
    console.log("Testing storage bucket 'images'...");
    
    // First, try to access the bucket directly instead of listing all buckets
    // This is more likely to work with standard permissions
    const { data: files, error: filesError } = await supabase.storage
      .from('images')
      .list('', { limit: 1 });
    
    if (filesError) {
      console.error("Error accessing 'images' bucket:", filesError);
      
      // If we can't access the bucket, try listing all buckets for debugging
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      let bucketInfo = "Could not list buckets";
      if (!bucketsError && buckets) {
        bucketInfo = buckets.length > 0 
          ? buckets.map(b => b.name).join(", ")
          : "No buckets found";
      }
      
      return { 
        success: false, 
        error: `Cannot access 'images' bucket: ${filesError.message}. Available buckets: ${bucketInfo}` 
      };
    }
    
    console.log("Successfully accessed 'images' bucket, files:", files);
    return { success: true, error: null };
    
  } catch (error) {
    console.error("Storage test failed:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown storage error" 
    };
  }
};

/**
 * Test storage with a simple upload/delete to verify write permissions
 */
export const testStorageUpload = async () => {
  try {
    const testFileName = `test-${Date.now()}.txt`;
    const testContent = new Blob(['test'], { type: 'text/plain' });
    
    // Try to upload a test file
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(`test/${testFileName}`, testContent);
    
    if (uploadError) {
      return { 
        success: false, 
        error: `Upload test failed: ${uploadError.message}` 
      };
    }
    
    // Clean up - delete the test file
    const { error: deleteError } = await supabase.storage
      .from('images')
      .remove([`test/${testFileName}`]);
    
    if (deleteError) {
      console.warn("Could not clean up test file:", deleteError);
    }
    
    return { success: true, error: null };
    
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown upload test error" 
    };
  }
};