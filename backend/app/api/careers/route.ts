import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Career from "@/models/Career";

const SEED_CAREERS = [
  {
    title: "Flutter Developer",
    type: "Remote",
    department: "Engineering",
    description:
      "Build beautiful, high-performance cross-platform apps using Flutter and Dart. You'll work on client projects ranging from MVPs to enterprise applications, collaborating closely with our design and backend teams.",
    isActive: true,
  },
  {
    title: "Next.js Backend Developer",
    type: "Hybrid",
    department: "Engineering",
    description:
      "Design and build scalable API architectures using Next.js, Node.js, and MongoDB. You'll own the backend infrastructure for multiple client projects and internal tools.",
    isActive: true,
  },
  {
    title: "UI/UX Designer (Figma)",
    type: "Remote",
    department: "Design",
    description:
      "Craft pixel-perfect, user-centered designs in Figma. You'll lead the design process from wireframes to high-fidelity prototypes, working with clients and developers to ship beautiful products.",
    isActive: true,
  },
  {
    title: "Digital Marketing Specialist",
    type: "Remote",
    department: "Marketing",
    description:
      "Plan and execute full-funnel digital marketing campaigns across Google Ads, Meta, and SEO. You'll analyze performance data and optimize campaigns for maximum ROI.",
    isActive: true,
  },
  {
    title: "AI/ML Engineer",
    type: "Hybrid",
    department: "Engineering",
    description:
      "Develop intelligent systems using Python, TensorFlow, and modern ML pipelines. You'll build recommendation engines, NLP tools, and predictive models for client projects.",
    isActive: true,
  },
  {
    title: "Content Writer & Strategist",
    type: "Remote",
    department: "Content",
    description:
      "Create compelling content that ranks and converts. From blog posts and case studies to social media copy, you'll shape the voice of our agency and our clients.",
    isActive: true,
  },
];

async function seedCareers(): Promise<void> {
  const now = new Date();
  const careersWithDates = SEED_CAREERS.map((career, index) => ({
    ...career,
    createdAt: new Date(now.getTime() - index * 86400000), // stagger by 1 day each
  }));
  await Career.insertMany(careersWithDates);
}

export async function GET() {
  try {
    await connectToDatabase();

    let careers = await Career.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    if (careers.length === 0) {
      await seedCareers();
      careers = await Career.find({ isActive: true })
        .sort({ createdAt: -1 })
        .lean();
    }

    return NextResponse.json(
      { success: true, data: careers },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Careers fetch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
