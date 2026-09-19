import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Farmer from "@/models/Farmer";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mobile = searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    // Find farmer by mobile
    const farmer = await Farmer.findOne({ mobile });

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
    }

    return NextResponse.json(farmer);
  } catch (error: any) {
    console.error("Error fetching farmer profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await connectToDatabase();
    
    // Auto-generate farmerId if not provided
    if (!body.farmerId) {
      const count = await Farmer.countDocuments();
      body.farmerId = `FAR-${(count + 1).toString().padStart(3, '0')}`;
    }

    // Check if farmer already exists
    const existingFarmer = await Farmer.findOne({ mobile: body.mobile });
    if (existingFarmer) {
      return NextResponse.json({ error: "Farmer with this mobile number already exists" }, { status: 400 });
    }

    const farmer = new Farmer(body);
    await farmer.save();

    return NextResponse.json(farmer, { status: 201 });
  } catch (error: any) {
    console.error("Error creating farmer profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
