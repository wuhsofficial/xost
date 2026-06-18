import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Insight from "@/models/Insight";

const SEED_INSIGHTS = [
  {
    title: "Why Flutter Is the Future of Cross-Platform Development",
    category: "Development",
    excerpt:
      "Flutter has evolved from a mobile SDK to a full cross-platform framework. Here's why forward-thinking teams are betting on it for web, desktop, and mobile.",
    content:
      "Flutter has rapidly evolved from a mobile-only SDK into a comprehensive cross-platform framework that targets mobile, web, desktop, and embedded devices from a single codebase. Its widget-based architecture provides pixel-perfect control over every element on screen, while the Dart language offers a productive development experience with hot reload, strong typing, and ahead-of-time compilation for near-native performance.\n\nOne of Flutter's greatest strengths is its rendering engine. Unlike frameworks that rely on platform-native UI components, Flutter draws every pixel itself using Skia (and now Impeller), ensuring consistent behavior and appearance across all platforms. This eliminates the common \"write once, debug everywhere\" problem that plagues other cross-platform solutions.\n\nFor teams building MVPs, Flutter's speed of development is unmatched. A single team can ship to iOS, Android, and web simultaneously, cutting development costs by up to 60%. The ecosystem has matured significantly, with packages available for state management (Riverpod, Bloc), navigation (GoRouter), and backend integration (Dio, GraphQL).\n\nLooking ahead, Flutter's adoption in enterprise environments is accelerating. Companies like BMW, Google Pay, and Alibaba have shipped production apps with Flutter, validating its readiness for large-scale applications. With the Dart language continuing to evolve and the framework's community growing rapidly, Flutter is positioned to become the default choice for cross-platform development in the coming years.",
    author: "Founder 1",
    readTime: "5 min read",
    imageGradient: "linear-gradient(135deg, #00D4FF, #0066FF)",
  },
  {
    title: "The SEO Playbook for Pakistani Tech Startups in 2025",
    category: "SEO",
    excerpt:
      "Local SEO, technical audits, and content strategy tailored for the Pakistani market. A comprehensive guide for startups looking to dominate search.",
    content:
      "The Pakistani tech ecosystem is booming, but most startups are leaving massive organic traffic on the table by neglecting SEO. In a market where paid acquisition costs are rising and competition is intensifying, a solid SEO strategy can be the difference between sustainable growth and burning through runway.\n\nStart with technical SEO fundamentals. Ensure your site loads in under 3 seconds on Pakistani mobile networks (3G/4G), implement proper schema markup, and fix crawl errors. Most Pakistani startup websites score below 50 on Google PageSpeed Insights — fixing this alone can boost rankings significantly.\n\nLocal SEO is critical for B2B startups targeting the Pakistani market. Claim and optimize your Google Business Profile, build citations on Pakistani directories (PakBiz, Jaidad), and create location-specific landing pages for major cities: Lahore, Karachi, Islamabad, and Faisalabad.\n\nContent strategy should focus on Urdu-English bilingual content where appropriate, targeting long-tail keywords that international competitors ignore. Topics like 'best software house in Lahore' or 'mobile app development Pakistan' have significant search volume with relatively low competition.\n\nLink building in the Pakistani context requires creative approaches: guest posting on Dawn Tech, Express Tribune's tech section, and collaborating with local tech bloggers. University partnerships and event sponsorships can also generate valuable backlinks.\n\nFinally, track everything. Set up Google Search Console and Analytics, monitor keyword rankings weekly, and iterate on your strategy monthly. SEO is a compounding investment — the earlier you start, the greater the returns.",
    author: "Founder 2",
    readTime: "7 min read",
    imageGradient: "linear-gradient(135deg, #00FFB3, #00D4FF)",
  },
  {
    title: "AI/ML in Business: Beyond the Hype",
    category: "AI",
    excerpt:
      "Separating signal from noise in the AI revolution. Practical applications of machine learning that deliver real ROI for businesses of every size.",
    content:
      "Artificial intelligence and machine learning have moved beyond the hype cycle into practical business applications that deliver measurable ROI. However, many organizations still struggle to identify where AI can genuinely add value versus where it's an expensive distraction.\n\nThe most impactful AI applications in business today fall into three categories: automation of repetitive tasks, predictive analytics, and personalization. Customer service chatbots powered by large language models can handle 70-80% of routine inquiries, freeing human agents for complex cases. Predictive maintenance models in manufacturing can reduce downtime by 30-50%. And recommendation engines in e-commerce consistently boost average order value by 15-25%.\n\nFor businesses starting their AI journey, the key is to begin with well-defined problems and clean data. A simple logistic regression model trained on quality data will outperform a complex neural network fed garbage inputs every time. Start small, prove value, then scale.\n\nThe build-vs-buy decision is crucial. Pre-trained models and AI-as-a-service platforms (OpenAI, Google Cloud AI, AWS SageMaker) have dramatically lowered the barrier to entry. For most businesses, customizing existing models is far more cost-effective than training from scratch.\n\nData privacy and ethical considerations cannot be afterthoughts. Implement robust data governance frameworks, audit models for bias regularly, and maintain transparency about how AI influences business decisions. Companies that get this right will build lasting competitive advantages while avoiding regulatory pitfalls.\n\nThe bottom line: AI is not magic, it's mathematics applied strategically. Focus on problems worth solving, invest in data quality, and measure results rigorously.",
    author: "Founder 3",
    readTime: "6 min read",
    imageGradient: "linear-gradient(135deg, #7B61FF, #00D4FF)",
  },
  {
    title: "UI/UX Principles That Increased Conversion by 40%",
    category: "Design",
    excerpt:
      "Design isn't decoration — it's strategy. Learn the UX principles we applied to triple a client's conversion rate in just 8 weeks.",
    content:
      "When a client approached us with a beautifully designed website that wasn't converting, we knew the problem wasn't aesthetics — it was usability. Over 8 weeks, we applied evidence-based UX principles that increased their conversion rate by 40% and tripled their monthly leads.\n\nThe first principle: reduce cognitive load. We simplified their navigation from 12 top-level items to 5, implemented a clear visual hierarchy with F-pattern layout, and removed every element that didn't directly support the user's journey toward conversion. Hick's Law tells us that more choices mean slower decisions — and slower decisions mean more bounces.\n\nSecond, we optimized the call-to-action strategy. The original site had 3 competing CTAs above the fold. We reduced it to one primary CTA with high contrast and action-oriented copy ('Get Your Free Quote' instead of 'Submit'). This single change increased click-through rate by 28%.\n\nThird, we leveraged social proof strategically. Instead of burying testimonials on a separate page, we placed relevant client quotes next to each service offering. We added real metrics ('Increased revenue by 200% in 6 months') rather than generic praise. Trust badges and client logos were moved above the fold.\n\nFourth, we addressed mobile UX specifically. With 73% of their traffic coming from mobile devices, we redesigned the mobile experience from scratch: larger touch targets (minimum 48px), thumb-friendly navigation, and a sticky mobile CTA bar. Mobile conversions increased by 55%.\n\nFinally, we implemented micro-interactions and loading state feedback to create a sense of responsiveness and quality. Every form submission shows progress, every button responds to hover and press, and error messages are helpful rather than accusatory.\n\nThe lesson: great UX isn't about making things pretty — it's about removing friction between your user and their goal.",
    author: "Founder 1",
    readTime: "4 min read",
    imageGradient: "linear-gradient(135deg, #FF6B6B, #FFE66D)",
  },
  {
    title: "How Digital Marketing Transformed a Local Brand's Reach",
    category: "Marketing",
    excerpt:
      "From 500 to 50,000 monthly visitors. The full-funnel digital marketing strategy that turned a Lahore-based brand into a national presence.",
    content:
      "When a Lahore-based lifestyle brand came to us, they had a loyal local following of about 500 monthly website visitors and strong word-of-mouth in their neighborhood. Twelve months later, they were reaching 50,000 monthly visitors and shipping nationwide. Here's the full-funnel strategy that made it happen.\n\nPhase 1: Foundation (Months 1-2). We audited their digital presence and found critical gaps: no Google Analytics, inconsistent branding across social platforms, and a website that loaded in 8 seconds on mobile. We fixed the technical foundation first — site speed optimization, proper tracking setup, and unified brand guidelines.\n\nPhase 2: Awareness (Months 3-5). We launched a content-first strategy on Instagram and TikTok, creating behind-the-scenes manufacturing content, styling guides, and user-generated content campaigns. Organic reach grew from 2,000 to 25,000 monthly impressions. Simultaneously, we ran top-of-funnel Facebook ads targeting lookalike audiences based on their existing customer list.\n\nPhase 3: Consideration (Months 6-8). As the audience grew, we implemented email marketing with a lead magnet (a style guide PDF) and a 5-email welcome sequence. We launched Google Search ads targeting high-intent keywords ('buy [product category] online Pakistan'). Blog content targeting informational queries started ranking on page 1.\n\nPhase 4: Conversion (Months 9-12). With a warm audience established, we deployed retargeting campaigns across Meta and Google Display Network. We optimized the checkout flow (reducing cart abandonment from 78% to 45%), implemented WhatsApp Business for instant customer support, and launched a referral program that turned existing customers into advocates.\n\nThe results: 100x traffic growth, 15x increase in online sales, and a customer acquisition cost that decreased by 60% as organic channels matured. The key insight: digital marketing is not about any single channel — it's about building a system where every channel reinforces the others.",
    author: "Founder 2",
    readTime: "8 min read",
    imageGradient: "linear-gradient(135deg, #00D4FF, #00FFB3)",
  },
  {
    title: "Building Your Final Year Project: A Complete Guide",
    category: "Academic",
    excerpt:
      "Choosing the right topic, structuring your documentation, and building a project that impresses your panel and your future employers.",
    content:
      "Your final year project (FYP) is more than an academic requirement — it's your first portfolio piece and often your first real engineering challenge. Having mentored dozens of FYP teams, here's a comprehensive guide to building a project that earns top marks and opens career doors.\n\nChoosing Your Topic: The sweet spot is at the intersection of three circles: what you're genuinely interested in, what's technically feasible in your timeline, and what solves a real problem. Avoid overly ambitious AI projects that require datasets you don't have, and steer clear of simple CRUD apps that won't impress anyone. Good FYP ideas include: a smart attendance system using face recognition, a healthcare appointment platform with ML-based doctor matching, or an e-commerce platform with real-time analytics.\n\nTechnology Stack: Choose technologies you can learn quickly and that have strong community support. For web apps, Next.js + MongoDB or Django + PostgreSQL are solid choices. For mobile, Flutter or React Native. For ML projects, Python with scikit-learn or TensorFlow. Don't use obscure frameworks just to seem innovative — reliability matters more.\n\nProject Planning: Break your project into 4 sprints of 3-4 weeks each. Sprint 1: Requirements, architecture design, and environment setup. Sprint 2: Core feature development. Sprint 3: Secondary features and integration. Sprint 4: Testing, documentation, and presentation prep. Use GitHub for version control from day one — this is non-negotiable.\n\nDocumentation: Your SRS (Software Requirements Specification) should include: project scope, functional and non-functional requirements, use case diagrams, ER diagrams, system architecture, and wireframes. Write documentation as you build, not after — future you will thank present you.\n\nThe Presentation: Your panel has limited time and sees dozens of projects. Lead with the problem and your solution's impact, demo the working application (rehearse this!), show your technical architecture briefly, and be prepared for questions about design decisions and trade-offs.\n\nFinal tip: Deploy your project on a live server (Vercel, Railway, or AWS free tier). A live demo is worth ten times more than a localhost presentation, and you'll learn invaluable DevOps skills in the process.",
    author: "Founder 3",
    readTime: "10 min read",
    imageGradient: "linear-gradient(135deg, #FF9A9E, #FECFEF)",
  },
];

async function seedInsights(): Promise<void> {
  const now = new Date();
  const insightsWithDates = SEED_INSIGHTS.map((insight, index) => ({
    ...insight,
    createdAt: new Date(now.getTime() - index * 86400000), // stagger by 1 day each
  }));
  await Insight.insertMany(insightsWithDates);
}

export async function GET() {
  try {
    await connectToDatabase();

    let insights = await Insight.find({}).sort({ createdAt: -1 }).lean();

    if (insights.length === 0) {
      await seedInsights();
      insights = await Insight.find({}).sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json(
      { success: true, data: insights },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Insights fetch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
