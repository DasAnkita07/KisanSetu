import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Slot from "@/models/Slot";
import Farmer from "@/models/Farmer";
// Normally you'd import Notification too, but we can return mock notifications or empty array for now

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mobile = searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    // 1. Get Farmer
    const farmer = await Farmer.findOne({ mobile });
    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
    }

    // 2. Get Upcoming Slot
    const upcomingSlot = await Slot.findOne({ 
      farmerId: farmer.farmerId, 
      status: { $in: ["Booked", "Arrived"] } 
    }).sort({ date: 1 });

    // 3. Get total procurement weight (completed slots)
    const completedSlots = await Slot.find({
      farmerId: farmer.farmerId,
      status: { $in: ["Procurement Completed", "Payment Processing", "Completed"] }
    });
    const totalProcurementKg = completedSlots.reduce((acc, slot) => acc + (slot.weightKg || 0), 0);

    // 4. Get recent payment status
    // For now, check if any slot is in Payment Processing
    const pendingPaymentSlot = await Slot.findOne({
      farmerId: farmer.farmerId,
      status: "Payment Processing"
    });

    const paymentStatus = pendingPaymentSlot 
      ? { status: "Processing", amount: pendingPaymentSlot.amountDue || 0 }
      : { status: "Completed", amount: 0 };

    return NextResponse.json({
      farmer,
      upcomingSlot,
      stats: {
        totalProcurementKg,
        paymentStatus
      },
      notifications: [
        { id: 1, text: "Aadhaar e-KYC Verification Completed Successfully.", type: "success" },
        { id: 2, text: "Your Paddy quality grading resulted in Grade A. Premium MSP applied.", type: "info" }
      ]
    });
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
