import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Slot from "@/models/Slot";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const farmerId = searchParams.get("farmerId");

    if (!farmerId) {
      return NextResponse.json({ error: "Farmer ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    const slots = await Slot.find({ farmerId }).sort({ createdAt: -1 });
    return NextResponse.json(slots);
  } catch (error: any) {
    console.error("Error fetching slots:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await connectToDatabase();
    
    // Generate a token number (e.g. TKN-2345)
    const count = await Slot.countDocuments();
    const tokenNumber = `TKN-${1000 + count}`;

    // Dummy queue position
    const queuePos = Math.floor(Math.random() * 20) + 1;

    const newSlot = new Slot({
      ...body,
      tokenNumber,
      queuePos,
      status: "Booked"
    });

    await newSlot.save();
    return NextResponse.json(newSlot, { status: 201 });
  } catch (error: any) {
    console.error("Error booking slot:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
