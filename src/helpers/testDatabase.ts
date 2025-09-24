import { supabase } from "./supabase";

export const testDatabaseConnection = async () => {
  try {
    console.log("Testing database connection...");
    
    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from("users")
      .select("count")
      .limit(1);
    
    if (connectionError) {
      console.error("Database connection error:", connectionError);
      return { success: false, error: connectionError.message };
    }
    
    // Test if users table exists and has the right structure
    const { data: tableTest, error: tableError } = await supabase
      .from("users")
      .select("id, name, email, is_admin, profile_pic, created_at, updated_at")
      .limit(1);
    
    if (tableError) {
      console.error("Table structure error:", tableError);
      return { success: false, error: tableError.message };
    }
    
    console.log("Database connection successful");
    return { success: true, error: null };
    
  } catch (error) {
    console.error("Database test failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};