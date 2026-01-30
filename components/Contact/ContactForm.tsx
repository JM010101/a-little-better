"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSpring, animated } from "@react-spring/web";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

const RECAPTCHA_SITE_KEY = "6LeFG1osAAAAANmYQ51ZprcKziJC4JvLW5fp7REY";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    // Load reCAPTCHA v2 Checkbox script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsRecaptchaLoaded(true);
      // Render reCAPTCHA widget
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.ready(() => {
          if (recaptchaRef.current) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
              callback: (token: string) => {
                setRecaptchaToken(token);
              },
            });
          }
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isRecaptchaLoaded) {
      setSubmitStatus({
        type: "error",
        message: "reCAPTCHA is loading. Please wait a moment and try again."
      });
      return;
    }

    // Get fresh token right before submission to avoid expiration
    let currentToken = "";
    if (widgetIdRef.current !== null && window.grecaptcha) {
      try {
        // Get the current response token from the widget
        currentToken = window.grecaptcha.getResponse(widgetIdRef.current);
        if (!currentToken) {
          // If no token, check if we have a stored one
          currentToken = recaptchaToken;
        }
      } catch (error) {
        console.error("Error getting reCAPTCHA token:", error);
        // Fallback to stored token
        currentToken = recaptchaToken;
      }
    } else {
      // Fallback to stored token if widget isn't available
      currentToken = recaptchaToken;
    }

    if (!currentToken || currentToken.length === 0) {
      setSubmitStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification by checking the 'I'm not a robot' box."
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: currentToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. We'll get back to you soon."
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        // Reset reCAPTCHA
        setRecaptchaToken("");
        if (widgetIdRef.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetIdRef.current);
          } catch (resetError) {
            console.error("Error resetting reCAPTCHA:", resetError);
          }
        }
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again."
        });
        // Reset reCAPTCHA on error so user can try again
        setRecaptchaToken("");
        if (widgetIdRef.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetIdRef.current);
          } catch (resetError) {
            console.error("Error resetting reCAPTCHA:", resetError);
          }
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later."
      });
      // Reset reCAPTCHA on error
      setRecaptchaToken("");
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (resetError) {
          console.error("Error resetting reCAPTCHA:", resetError);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
    config: { tension: 100, friction: 50 }
  });

  const statusAnimation = useSpring({
    opacity: submitStatus.type ? 1 : 0,
    transform: submitStatus.type ? "translateY(0px)" : "translateY(-10px)",
    config: { tension: 200, friction: 25 }
  });

  return (
    <animated.form onSubmit={handleSubmit} style={formAnimation} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      {submitStatus.type && (
        <animated.div
          style={statusAnimation}
          className={`p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </animated.div>
      )}

      {/* reCAPTCHA v2 Checkbox */}
      <div className="flex justify-center">
        <div ref={recaptchaRef} id="recaptcha-container"></div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !recaptchaToken}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      
      {/* reCAPTCHA Notice */}
      <div className="text-xs text-neutral-500 text-center mt-2">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Terms of Service
        </a>{" "}
        apply.
      </div>
    </animated.form>
  );
}
