import { NextResponse } from "next/server";

export async function POST() {
    console.log("Hello from the server ");
    return NextResponse.json({ success: true });
}