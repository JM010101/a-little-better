import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/chatbot-knowledge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Get Cloudflare credentials
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      console.error("Cloudflare credentials not configured", {
        hasAccountId: !!accountId,
        hasApiToken: !!apiToken,
      });
      return NextResponse.json(
        { error: "AI service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Log token format (first few chars only for security)
    console.log("Cloudflare API setup:", {
      accountId: accountId ? `${accountId.substring(0, 8)}...` : "missing",
      tokenPrefix: apiToken ? `${apiToken.substring(0, 8)}...` : "missing",
      tokenLength: apiToken?.length || 0,
    });

    // Get system prompt
    const systemPrompt = getSystemPrompt();

    // Format messages for Cloudflare Workers AI
    // Convert our message format to Cloudflare's expected format
    const formattedMessages = [
      {
        role: "system",
        content: systemPrompt
      },
      ...messages.map((msg: { text: string; sender: string }) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }))
    ];

    // Call Cloudflare Workers AI
    // Note: The endpoint format is: /accounts/{account_id}/ai/run/{model_name}
    const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct-fast`;

    // Prepare request body - Cloudflare Workers AI expects messages array
    const requestBody = {
      messages: formattedMessages,
      max_tokens: 250, // Reduced from 500 to keep responses concise
      temperature: 0.7,
    };

    console.log("Making Cloudflare AI request:", {
      url: cloudflareUrl,
      method: "POST",
      messageCount: formattedMessages.length,
      hasSystemPrompt: formattedMessages.some((m: any) => m.role === "system"),
    });

    const aiResponse = await fetch(cloudflareUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = { error: errorText };
      }

      console.error("Cloudflare AI API error:", {
        status: aiResponse.status,
        statusText: aiResponse.statusText,
        error: errorDetails,
        accountIdSet: !!accountId,
        tokenSet: !!apiToken,
        tokenLength: apiToken?.length || 0,
      });

      // Provide specific error message for 401
      if (aiResponse.status === 401) {
        return NextResponse.json(
          { 
            error: "Authentication failed. Please check Cloudflare credentials.",
            response: "I apologize, but there's an authentication issue with the AI service. Please contact the administrator to verify the Cloudflare API credentials are correctly configured.",
            details: process.env.NODE_ENV === "development" ? {
              message: "Check that CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are set correctly. The API token needs 'Account' → 'Cloudflare Workers AI' → 'Read' permissions."
            } : undefined
          },
          { status: 500 }
        );
      }

      // Return friendly error message for other errors
      return NextResponse.json(
        { 
          error: "I'm having trouble processing your request right now. Please try again in a moment.",
          response: "I apologize, but I'm experiencing some technical difficulties. Could you please try asking your question again, or feel free to contact us directly at founder@a-little-better.com?"
        },
        { status: 500 }
      );
    }

    const aiData = await aiResponse.json();
    
    // Extract response text from Cloudflare's response format
    // Cloudflare Workers AI typically returns: { response: "..." } or { result: { response: "..." } }
    let responseText = "";
    
    // Try direct response field first (most common format)
    if (aiData.response && typeof aiData.response === "string") {
      responseText = aiData.response;
    }
    // Try result.response
    else if (aiData.result) {
      if (typeof aiData.result === "string") {
        responseText = aiData.result;
      } else if (aiData.result.response) {
        responseText = aiData.result.response;
      } else if (aiData.result.text) {
        responseText = aiData.result.text;
      } else if (aiData.result.choices && aiData.result.choices[0]) {
        responseText = aiData.result.choices[0].message?.content || aiData.result.choices[0].text || "";
      }
    }
    // Try other possible fields
    else if (aiData.text) {
      responseText = aiData.text;
    }

    if (!responseText) {
      console.error("Unexpected AI response format:", JSON.stringify(aiData, null, 2));
      return NextResponse.json(
        { 
          error: "Received an unexpected response format",
          response: "I apologize, but I'm having trouble generating a response. Please try rephrasing your question or contact us at founder@a-little-better.com for assistance."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      response: responseText.trim()
    });

  } catch (error: any) {
    console.error("Error processing chat request:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    });

    return NextResponse.json(
      { 
        error: "Failed to process your request",
        response: "I'm sorry, but I encountered an error while processing your message. Please try again, or feel free to contact us directly at founder@a-little-better.com."
      },
      { status: 500 }
    );
  }
}
