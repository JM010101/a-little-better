import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  return NextResponse.json({
    hasKey: !!key,
    keyLength: key?.length || 0,
    keyPreview: key ? `${key.substring(0, 8)}...` : "NOT SET",
  });
}
