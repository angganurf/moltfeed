import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Simple file-based storage for newsletter signups
// TODO: Migrate to Resend Audiences or database in production
const SUBSCRIBERS_FILE = process.env.NODE_ENV === "production" 
  ? "/tmp/moltfeed-subscribers.json"
  : path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check for existing subscriber
    const subscribers = await getSubscribers();
    const exists = subscribers.some(s => s.email === normalizedEmail);
    
    if (exists) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 400 }
      );
    }
    
    // Add new subscriber
    const newSubscriber: Subscriber = {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      source: "website",
    };
    
    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);
    
    // Log for now (could trigger welcome email later)
    console.log(`📬 New subscriber: ${normalizedEmail}`);
    
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!",
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple endpoint to check subscriber count (protected in production)
  const subscribers = await getSubscribers();
  return NextResponse.json({
    count: subscribers.length,
    lastSignup: subscribers.length > 0 ? subscribers[subscribers.length - 1].subscribedAt : null,
  });
}
