import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY || "6LeP4zEsAAAAAPd_r8vPXJeghMiESu358mWEAPwg";
    
    if (recaptchaToken) {
      try {
        const recaptchaResponse = await fetch(
          `https://www.google.com/recaptcha/api/siteverify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
          }
        );

        const recaptchaResult = await recaptchaResponse.json();

        if (!recaptchaResult.success) {
          console.error("reCAPTCHA verification failed:", recaptchaResult);
          return NextResponse.json(
            { error: "reCAPTCHA verification failed. Please try again." },
            { status: 400 }
          );
        }

        // Check score (reCAPTCHA v3 returns a score from 0.0 to 1.0)
        // Lower scores indicate suspicious activity
        if (recaptchaResult.score < 0.5) {
          console.warn("reCAPTCHA score too low:", recaptchaResult.score);
          return NextResponse.json(
            { error: "reCAPTCHA verification failed. Please try again." },
            { status: 400 }
          );
        }
      } catch (recaptchaError) {
        console.error("Error verifying reCAPTCHA:", recaptchaError);
        return NextResponse.json(
          { error: "reCAPTCHA verification error. Please try again." },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "reCAPTCHA token is missing. Please refresh the page and try again." },
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

    // Using Formspree (free tier available, works better with server-side requests)
    // Sign up at https://formspree.io and get your form endpoint
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    
    if (!formspreeEndpoint) {
      console.error("FORMSPREE_ENDPOINT is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 500 }
      );
    }
    
    try {
      // Formspree API payload
      const payload = {
        name: name,
        email: email,
        subject: subject,
        message: emailContent,
        _to: recipientEmail,
        _subject: `Contact Form: ${subject}`,
        _replyto: email,
      };

      const formspreeResponse = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!formspreeResponse.ok) {
        const errorText = await formspreeResponse.text();
        console.error("Formspree HTTP error:", {
          status: formspreeResponse.status,
          statusText: formspreeResponse.statusText,
          errorText,
        });
        
        return NextResponse.json(
          { error: "Failed to send message. Please try again." },
          { status: 500 }
        );
      }

      const result = await formspreeResponse.json();

      // Formspree returns success on 200 status
      if (formspreeResponse.ok) {
        return NextResponse.json(
          { message: "Message sent successfully!" },
          { status: 200 }
        );
      } else {
        console.error("Formspree API returned error:", result);
        return NextResponse.json(
          { error: result.error || "Failed to send message. Please try again." },
          { status: 500 }
        );
      }
    } catch (fetchError: any) {
      console.error("Error calling Formspree API:", {
        message: fetchError?.message,
        name: fetchError?.name,
      });
      
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
