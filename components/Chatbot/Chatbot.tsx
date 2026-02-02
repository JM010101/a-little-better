"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";

interface ChatMessageProps {
  message: { text: string; sender: "user" | "bot" };
}

function ChatMessage({ message }: ChatMessageProps) {
  const messageAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      className={`flex items-end gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
      style={messageAnimation}
    >
      {message.sender === "bot" && (
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/chatbot_avatar.jpg"
            alt="Chatbot avatar"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          message.sender === "user"
            ? "bg-blue-600 text-white"
            : "bg-neutral-100 text-neutral-900"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </animated.div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([
    {
      text: "Hello! How can I help you today?",
      sender: "bot"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { text: inputValue.trim(), sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Prepare messages for API (excluding the initial greeting)
      const messagesForAPI = [
        ...messages.slice(1), // Skip initial greeting
        userMessage
      ].map(msg => ({
        text: msg.text,
        sender: msg.sender
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesForAPI,
        }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
      } else {
        // Use fallback response if available, otherwise show error
        const errorMessage = data.response || data.error || "I'm sorry, I couldn't process your request. Please try again or contact us at founder@a-little-better.com.";
        setMessages((prev) => [...prev, { text: errorMessage, sender: "bot" }]);
        if (data.error && !data.response) {
          setError("There was an issue connecting to the AI service.");
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to contact us directly at founder@a-little-better.com.", 
        sender: "bot" 
      }]);
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-white border-2 border-blue-600 rounded-full p-0 shadow-lg hover:shadow-xl transition-all z-[9999] flex items-center justify-center cursor-pointer pointer-events-auto overflow-hidden"
          aria-label="Open chatbot"
          type="button"
        >
          <Image
            src="/chatbot_avatar.jpg"
            alt="Chatbot avatar"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white border border-neutral-200 rounded-lg shadow-2xl flex flex-col z-[9999] pointer-events-auto">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                <Image
                  src="/chatbot_avatar.jpg"
                  alt="Chatbot avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">Chat with us</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 rounded-full p-1 transition-colors"
              aria-label="Close chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 text-neutral-900 rounded-lg px-4 py-2 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-xs text-red-500 text-center px-4">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-neutral-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700"
                size="icon"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-neutral-500 mt-2 text-center">
              AI-powered assistant • Available 24/7
            </p>
          </div>
        </div>
      )}
    </>
  );
}
