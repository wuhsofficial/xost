import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { fullName, email, phone, position, portfolioUrl, coverLetter } = body;

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!position || !position.trim()) {
      return NextResponse.json(
        { success: false, error: "Position is required" },
        { status: 400 }
      );
    }

    if (!coverLetter || !coverLetter.trim()) {
      return NextResponse.json(
        { success: false, error: "Cover letter is required" },
        { status: 400 }
      );
    }

    if (coverLetter.trim().length < 300) {
      return NextResponse.json(
        {
          success: false,
          error: `Cover letter must be at least 300 characters. Currently ${coverLetter.trim().length} characters.`,
        },
        { status: 400 }
      );
    }

    const application = await Application.create({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      position: position.trim(),
      portfolioUrl: portfolioUrl?.trim() || "",
      coverLetter: coverLetter.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your application has been submitted successfully. We'll review it and get back to you!",
        data: { id: application._id },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Application submission error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
