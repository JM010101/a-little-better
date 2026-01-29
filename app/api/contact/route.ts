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
    // It's free and takes 30 seconds to set up
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
    
    if (web3formsAccessKey) {
      const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: `Contact Form: ${subject}`,
          from_name: name,
          from_email: email,
          to_email: recipientEmail,
          message: emailContent,
        }),
      });

      const result = await web3formsResponse.json();

      if (web3formsResponse.ok && result.success) {
        return NextResponse.json(
          { message: "Message sent successfully!" },
          { status: 200 }
        );
      } else {
        console.error("Web3Forms error:", result);
        return NextResponse.json(
          { error: result.message || "Failed to send message. Please try again." },
          { status: 500 }
        );
      }
    }

    // Fallback: Log the submission (for development/testing)
    // To enable email sending, get a free Web3Forms access key from https://web3forms.com
    // Then add WEB3FORMS_ACCESS_KEY=your_key_here to your .env.local file
    console.log("Contact form submission (logged - configure WEB3FORMS_ACCESS_KEY to enable email):", {
      to: recipientEmail,
      from: email,
      name,
      subject,
      message,
    });

    // Return success in development, but remind to configure email service
    return NextResponse.json(
      { 
        message: "Message received! (Email service not configured - see console for details)",
        note: "Get a free Web3Forms access key from https://web3forms.com and add WEB3FORMS_ACCESS_KEY to .env.local"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
