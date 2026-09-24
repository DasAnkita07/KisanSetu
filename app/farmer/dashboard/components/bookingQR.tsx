"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface BookingData {
  uniqueId: string;
  crop?: string;
  date?: string;
  time?: string;
  center?: string;
}

export default function BookingQR() {
  const [booking, setBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    const storedBooking = localStorage.getItem("kisansetu_booking");

    if (storedBooking) {
      try {
        setBooking(JSON.parse(storedBooking));
      } catch {
        setBooking(null);
      }
    }
  }, []);

  return (
    <div className="bg-[#F9FAF6] rounded-xl border border-[#D5D0BD] shadow-sm p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">📱</span>

        <h3 className="font-oldenburg text-xl text-[#351903]">
          Procurement QR
        </h3>
      </div>

      <p className="font-onest text-sm text-[#351903]/70 mb-4">
        Show this QR at the procurement center
      </p>

      {booking ? (
        <div className="flex flex-col items-center">

          <div className="bg-white p-3 rounded-xl border border-[#E9DDBD]">
            <QRCodeCanvas
              value={booking.uniqueId}
              size={150}
              level="H"
              includeMargin
            />
          </div>

          <div className="mt-4 text-center">
            <p className="font-onest text-xs text-[#351903]/60">
              UNIQUE BOOKING ID
            </p>

            <p className="font-onest text-lg font-bold text-[#365006] tracking-wider">
              {booking.uniqueId}
            </p>
          </div>

          <div className="w-full mt-4 space-y-1 text-sm font-onest text-[#351903]">

            {booking.crop && (
              <div className="flex justify-between">
                <span className="text-[#351903]/60">Crop</span>
                <span>{booking.crop}</span>
              </div>
            )}

            {booking.date && (
              <div className="flex justify-between">
                <span className="text-[#351903]/60">Date</span>
                <span>{booking.date}</span>
              </div>
            )}

            {booking.time && (
              <div className="flex justify-between">
                <span className="text-[#351903]/60">Time</span>
                <span>{booking.time}</span>
              </div>
            )}

            {booking.center && (
              <div className="flex justify-between">
                <span className="text-[#351903]/60">Center</span>
                <span>{booking.center}</span>
              </div>
            )}

          </div>
        </div>
      ) : (
        <div className="min-h-[230px] flex flex-col items-center justify-center text-center">

          <div className="text-5xl mb-3 opacity-40">
            📱
          </div>

          <p className="font-onest text-sm text-[#351903]/60">
            No active slot booking
          </p>

          <p className="font-onest text-xs text-[#351903]/50 mt-1">
            Book a procurement slot to generate your QR
          </p>

        </div>
      )}
    </div>
  );
}