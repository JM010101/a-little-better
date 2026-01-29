import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email configuration - emails will be sent to this address
    const recipientEmail = "founder@a-little-better.com";
    
    // Format the email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form on A Little Better website.
Reply to: ${email}
    `.trim();

    // Using Web3Forms (free, no signup required)
    // Get your access key from: https://web3forms.com
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
    
    if (!web3formsAccessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 500 }
      );
    }
    
    try {
      // Web3Forms API payload - simplified format
      const payload = {
        access_key: web3formsAccessKey,
        subject: `Contact Form: ${subject}`,
        name: name,
        email: email,
        message: emailContent,
      };

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      try {
        const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!web3formsResponse.ok) {
          const errorText = await web3formsResponse.text();
          console.error("Web3Forms HTTP error:", {
            status: web3formsResponse.status,
            statusText: web3formsResponse.statusText,
            errorText,
          });
          
          let errorMessage = "Failed to send message. Please try again.";
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorMessage;
          } catch {
            // Keep default error message
          }
          
          return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
          );
        }

        const result = await web3formsResponse.json();

        if (result.success) {
          return NextResponse.json(
            { message: "Message sent successfully!" },
            { status: 200 }
          );
        } else {
          console.error("Web3Forms API returned error:", result);
          return NextResponse.json(
            { error: result.message || "Failed to send message. Please try again." },
            { status: 500 }
          );
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          console.error("Web3Forms API timeout");
          return NextResponse.json(
            { error: "Request timed out. Please try again." },
            { status: 500 }
          );
        }
        
        throw fetchError; // Re-throw to be caught by outer catch
      }
    } catch (fetchError: any) {
      console.error("Error calling Web3Forms API:", {
        message: fetchError?.message,
        name: fetchError?.name,
        cause: fetchError?.cause,
      });
      
      // More specific error messages
      if (fetchError.message?.includes('fetch')) {
        return NextResponse.json(
          { error: "Network error. Please check your connection and try again." },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
