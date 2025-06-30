import { NextResponse } from "next/server";
import { google } from "googleapis";

const {
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  SHEET_ID,
} = process.env;

if (
  !GOOGLE_SERVICE_ACCOUNT_EMAIL ||
  !GOOGLE_PRIVATE_KEY ||
  !SHEET_ID
) {
  throw new Error("Missing one of the required environment variables.");
}

export async function POST(req: Request) {
  const { name, email, uni, message } = await req.json();

  // Authentication
  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  try {
    // Columns A=email, B=timestamp
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "beta-users!A:E",            
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [name, email, uni, message, new Date().toLocaleString("pt-PT")],
        ],
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sheets API error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to append to sheet" },
      { status: 500 }
    );
  }
}
