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
    const storedBooking = localStorage.getItem("KrishiSangam_booking");

    if (storedBooking) {
      try {
        setBooking(JSON.parse(storedBooking));
      } catch {
        setBooking(null);
      }
    }
  }, []);

  return (
  <div className="bg-white border border-[#E9DDBD] rounded-xl p-5 h-full w-full">

      {/* Procurement QR Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">📱</span>

        <h3 className="font-oldenburg text-lg text-[#351903]">
          Procurement QR
        </h3>
      </div>

      {/* Description */}
      <p className="font-onest text-base text-[#351903]/70 mb-6">
        Show this QR at the procurement center
      </p>

      {booking ? (
        <div className="flex flex-col items-center flex-1">

          {/* QR Code Box */}
          <div className="bg-white p-6 rounded-2xl border border-[#E9DDBD] flex items-center justify-center">
            <QRCodeCanvas
              value={JSON.stringify(booking)}
              size={150}
              level="H"
              marginSize={4}
            />
          </div>

          {/* Unique Booking ID */}
          <div className="mt-6 text-center">
            <p className="font-onest text-sm text-[#351903]/60 tracking-wide">
              UNIQUE BOOKING ID
            </p>

            <p className="font-onest text-xl font-bold text-[#365006] tracking-wider mt-1">
              {booking.uniqueId}
            </p>
          </div>

          {/* Booking Details */}
          <div className="w-full mt-7 space-y-4 font-onest text-base flex-1 flex flex-col justify-end pb-2">

            {booking.crop && (
              <div className="flex justify-between items-center">
                <span className="text-[#351903]/60">
                  Crop
                </span>

                <span className="font-medium text-[#351903]">
                  {booking.crop}
                </span>
              </div>
            )}

            {booking.date && (
              <div className="flex justify-between items-center">
                <span className="text-[#351903]/60">
                  Date
                </span>

                <span className="font-medium text-[#351903]">
                  {booking.date}
                </span>
              </div>
            )}

            {booking.time && (
              <div className="flex justify-between items-center">
                <span className="text-[#351903]/60">
                  Time
                </span>

                <span className="font-medium text-[#351903]">
                  {booking.time}
                </span>
              </div>
            )}

            {booking.center && (
              <div className="flex justify-between items-center">
                <span className="text-[#351903]/60">
                  Center
                </span>

                <span className="font-medium text-[#351903]">
                  {booking.center}
                </span>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="min-h-[300px] flex flex-col items-center justify-center text-center">

          <div className="text-6xl mb-4 opacity-40">
            📱
          </div>

          <p className="font-onest text-base text-[#351903]/60">
            No active slot booking
          </p>

          <p className="font-onest text-sm text-[#351903]/50 mt-2">
            Book a procurement slot to generate your QR
          </p>

        </div>
      )}

    </div>
  );
}