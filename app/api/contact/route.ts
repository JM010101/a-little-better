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
    // Note: Make sure RECAPTCHA_SECRET_KEY is set in Vercel environment variables
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!recaptchaToken) {
      console.error("reCAPTCHA token is missing");
      return NextResponse.json(
        { error: "reCAPTCHA token is missing. Please complete the reCAPTCHA verification." },
        { status: 400 }
      );
    }

    if (!recaptchaSecretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not configured in environment variables");
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    try {
      // URL encode the secret key and token to handle special characters
      const encodedSecret = encodeURIComponent(recaptchaSecretKey);
      const encodedToken = encodeURIComponent(recaptchaToken);
      
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${encodedSecret}&response=${encodedToken}`,
        }
      );

      if (!recaptchaResponse.ok) {
        console.error("reCAPTCHA API HTTP error:", {
          status: recaptchaResponse.status,
          statusText: recaptchaResponse.statusText,
        });
        return NextResponse.json(
          { error: "reCAPTCHA verification service error. Please try again." },
          { status: 500 }
        );
      }

      const recaptchaResult = await recaptchaResponse.json();

      console.log("reCAPTCHA verification result:", {
        success: recaptchaResult.success,
        "error-codes": recaptchaResult["error-codes"],
      });

      if (!recaptchaResult.success) {
        const errorCodes = recaptchaResult["error-codes"] || [];
        console.error("reCAPTCHA verification failed:", {
          success: recaptchaResult.success,
          errorCodes,
        });
        
        // Provide more specific error messages
        let errorMessage = "reCAPTCHA verification failed. Please try again.";
        if (errorCodes.includes("invalid-input-secret")) {
          errorMessage = "reCAPTCHA configuration error. Please contact support.";
        } else if (errorCodes.includes("invalid-input-response")) {
          errorMessage = "reCAPTCHA token is invalid. Please complete the verification again.";
        } else if (errorCodes.includes("timeout-or-duplicate")) {
          errorMessage = "reCAPTCHA token expired. Please complete the verification again.";
        }
        
        return NextResponse.json(
          { error: errorMessage },
          { status: 400 }
        );
      }

      // reCAPTCHA v2 Checkbox doesn't return a score, just success/failure
      // The success field indicates if verification passed
    } catch (recaptchaError: any) {
      console.error("Error verifying reCAPTCHA:", {
        message: recaptchaError?.message,
        name: recaptchaError?.name,
        stack: recaptchaError?.stack,
      });
      return NextResponse.json(
        { error: "reCAPTCHA verification error. Please try again." },
        { status: 500 }
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
