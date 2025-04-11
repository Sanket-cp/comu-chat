
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if user exists
    const { data: userData, error: userError } = await supabase
      .from("auth")
      .select("users")
      .eq("email", email)
      .single();
    
    if (userError || !userData) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "If a user with that email exists, we've sent a password reset link." 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200 
        }
      );
    }
    
    // Generate a random token
    const token = Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30); // Token valid for 30 minutes
    
    // Store the reset token in the database
    const { data: tokenData, error: tokenError } = await supabase
      .from("password_reset_tokens")
      .insert({
        user_id: userData.id,
        token: token,
        expires_at: expiresAt.toISOString(),
      })
      .select();
      
    if (tokenError) {
      console.error("Error storing token:", tokenError);
      throw new Error("Failed to create reset token");
    }
    
    // In a real application, you would send an email here
    // For now, we'll return the token in the response
    console.log(`Reset token for ${email}: ${token}`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Password reset instructions sent", 
        debug: { token } 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
