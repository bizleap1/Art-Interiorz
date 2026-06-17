// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer";

const allowedOrigins = [
  "http://localhost:4173",
  "https://artinteriorz.com",
  "https://www.artinteriorz.com"
];

serve(async (req) => {
  const origin = req.headers.get("Origin") || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  
  const corsHeaders = {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { full_name, email, phone, project_type, message } = await req.json();

    // 1. Validate required fields
    if (!full_name || !email || !phone || !project_type || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // 2. Initialize Supabase Client
    // We use service role key so the Edge Function has admin privileges to insert
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Save enquiry to Supabase
    const { error: dbError } = await supabase
      .from("enquiries")
      .insert([
        {
          full_name,
          email,
          phone,
          project_type,
          message,
          source: "website",
        },
      ]);

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Database error: " + dbError.message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // 4. Set up SMTP Mailer
    const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.gmail.com";
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "587");
    const smtpUser = Deno.env.get("SMTP_USER") || "";
    const smtpPass = Deno.env.get("SMTP_PASS") || "";
    const smtpFromEmail = Deno.env.get("SMTP_FROM_EMAIL") || smtpUser;
    const smtpFromName = Deno.env.get("SMTP_FROM_NAME") || "ArtInteriorz";
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "parthdeshmukh351@gmail.com";

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 5. Create HTML Email Template
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fcfbf9; margin: 0; padding: 0; color: #232323; }
          .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e2e2e2; border-radius: 4px; overflow: hidden; }
          .header { background-color: #fcfbf9; padding: 30px; text-align: center; border-bottom: 1px solid #e2e2e2; }
          .header h1 { margin: 0; color: #232323; font-size: 24px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
          .content { padding: 40px 30px; }
          .intro { font-size: 16px; margin-bottom: 30px; color: #666666; line-height: 1.6; }
          .details-card { background-color: #faf9f6; border: 1px solid #ecebea; padding: 25px; border-radius: 4px; }
          .detail-row { margin-bottom: 15px; border-bottom: 1px solid #ecebea; padding-bottom: 15px; }
          .detail-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #888888; margin-bottom: 5px; display: block; }
          .value { font-size: 16px; color: #232323; font-weight: 500; }
          .message-box { background-color: #ffffff; border: 1px solid #ecebea; padding: 20px; border-left: 3px solid #b89c62; font-style: italic; margin-top: 10px; color: #444444; line-height: 1.6; }
          .footer { background-color: #232323; color: #ffffff; text-align: center; padding: 20px; font-size: 12px; letter-spacing: 1px; }
          .accent { color: #b89c62; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Art<span class="accent">Interiorz</span></h1>
          </div>
          <div class="content">
            <p class="intro">A new project enquiry has been submitted from the ArtInteriorz website.</p>
            
            <div class="details-card">
              <div class="detail-row">
                <span class="label">Full Name</span>
                <span class="value">${full_name}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email</span>
                <span class="value">${email}</span>
              </div>
              <div class="detail-row">
                <span class="label">Phone</span>
                <span class="value">${phone}</span>
              </div>
              <div class="detail-row">
                <span class="label">Project Type</span>
                <span class="value">${project_type}</span>
              </div>
              <div class="detail-row">
                <span class="label">Submission Date</span>
                <span class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</span>
              </div>
              <div class="detail-row">
                <span class="label">Source</span>
                <span class="value">Website</span>
              </div>
            </div>

            <h3 style="margin-top: 30px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Project Message</h3>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ArtInteriorz. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    // 6. Send the email
    await transporter.sendMail({
      from: `"${smtpFromName}" <${smtpFromEmail}>`,
      to: adminEmail,
      subject: "New Project Enquiry - ArtInteriorz",
      html: htmlEmail,
    });

    // 7. Return success
    return new Response(
      JSON.stringify({ success: true, message: "Enquiry submitted successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error: any) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: "Function error: " + (error.message || String(error)) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  }
});
