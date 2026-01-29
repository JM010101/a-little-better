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
      // Web3Forms API payload format
      const payload = {
        access_key: web3formsAccessKey,
        subject: `Contact Form: ${subject}`,
        from_name: name,
        from_email: email,
        to_email: recipientEmail,
        message: emailContent,
        // Additional fields for better email formatting
        name: name,
        email: email,
      };

      console.log("Sending to Web3Forms:", {
        access_key: web3formsAccessKey ? `${web3formsAccessKey.substring(0, 8)}...` : "NOT SET",
        to_email: recipientEmail,
      });

      const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await web3formsResponse.text();
      let result;
      
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse Web3Forms response:", responseText);
        return NextResponse.json(
          { error: "Invalid response from email service." },
          { status: 500 }
        );
      }

      if (web3formsResponse.ok && result.success) {
        return NextResponse.json(
          { message: "Message sent successfully!" },
          { status: 200 }
        );
      } else {
        console.error("Web3Forms API error:", {
          status: web3formsResponse.status,
          result,
        });
        return NextResponse.json(
          { error: result.message || "Failed to send message. Please try again." },
          { status: 500 }
        );
      }
    } catch (fetchError: any) {
      console.error("Error calling Web3Forms API:", {
        message: fetchError?.message,
        stack: fetchError?.stack,
        name: fetchError?.name,
        cause: fetchError?.cause,
      });
      return NextResponse.json(
        { error: "Failed to connect to email service. Please try again later." },
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
