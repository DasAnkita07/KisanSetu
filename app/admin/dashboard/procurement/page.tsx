"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Html5Qrcode } from "html5-qrcode";

interface ProcurementItem {
  id: string;
  time: string;
  farmer: string;
  crop: string;
  quantity: string;
  grade: string;
  centre: string;
  status: string;
}

interface BookingData {
  uniqueId: string;
  farmer: string;
  crop: string;
  quantity: string;
  grade: string;
  date: string;
  time: string;
  center: string;
}

const initialProcurementLog: ProcurementItem[] = [
  {
    id: "LOG-501",
    time: "10:15 AM",
    farmer: "Rohit Das",
    crop: "Potato (Jyoti)",
    quantity: "500 kg",
    grade: "Grade A (Moisture 12%)",
    centre: "Centre B",
    status: "Verified & Stored",
  },
  {
    id: "LOG-502",
    time: "09:48 AM",
    farmer: "Rajesh Kumar",
    crop: "Wheat (Sharbati)",
    quantity: "350 kg",
    grade: "Grade A (Moisture 10%)",
    centre: "Centre A",
    status: "Verified & Stored",
  },
  {
    id: "LOG-503",
    time: "09:12 AM",
    farmer: "Anita Devi",
    crop: "Potato (Chandramukhi)",
    quantity: "220 kg",
    grade: "Grade B (Moisture 14%)",
    centre: "Centre B",
    status: "Verified & Stored",
  },
  {
    id: "LOG-504",
    time: "08:40 AM",
    farmer: "Mohan Lal",
    crop: "Mustard Seed",
    quantity: "170 kg",
    grade: "Grade A (Oil content 41%)",
    centre: "Centre C",
    status: "Verified & Stored",
  },
];

export default function ProcurementManagementPage() {
  const [logs, setLogs] = useState<ProcurementItem[]>(
    initialProcurementLog
  );

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedLot, setSelectedLot] =
    useState<ProcurementItem | null>(null);

  /* =====================================================
     QR STATES
  ===================================================== */

  const [showQRScanner, setShowQRScanner] =
    useState(false);

  const [scannedBooking, setScannedBooking] =
    useState<BookingData | null>(null);

  const [manualBooking, setManualBooking] =
    useState<BookingData | null>(null);

  const [bookingId, setBookingId] =
    useState("");

  /* =====================================================
     INTAKE FORM
  ===================================================== */

  const [newLot, setNewLot] = useState({
    bookingId: "",
    bookingDate: "",
    bookingTime: "",
    farmer: "",
    crop: "Potato",
    quantity: "",
    grade: "Grade A",
    centre: "Centre A",
  });

  /* =====================================================
     ADD LOT
  ===================================================== */

  const handleAddLot = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !newLot.farmer ||
      !newLot.quantity
    ) {
      return;
    }

    const item: ProcurementItem = {
      id: `LOG-${500 + logs.length + 1}`,
      time: "Just now",
      farmer: newLot.farmer,
      crop: newLot.crop,
      quantity: `${newLot.quantity} kg`,
      grade: newLot.grade,
      centre: newLot.centre,
      status: "Verified & Stored",
    };

    setLogs((previousLogs) => [
      item,
      ...previousLogs,
    ]);

    setNewLot({
      bookingId: "",
      bookingDate: "",
      bookingTime: "",
      farmer: "",
      crop: "Potato",
      quantity: "",
      grade: "Grade A",
      centre: "Centre A",
    });

    setShowAddModal(false);
  };

  /* =====================================================
     QR SCANNER
  ===================================================== */

  useEffect(() => {
    if (
      !showQRScanner ||
      scannedBooking ||
      manualBooking
    ) {
      return;
    }

    const scanner =
      new Html5Qrcode("qr-reader");

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        (decodedText) => {
          try {
            const data =
              JSON.parse(decodedText) as BookingData;

            setScannedBooking(data);

            try {
              scanner.stop();
              scanner.clear();
            } catch {
              // Already stopped
            }
          } catch {
            console.error(
              "Invalid QR code"
            );
          }
        },
        () => {}
      )
      .catch((error) => {
        console.error(
          "Unable to start QR scanner:",
          error
        );
      });

    return () => {
      try {
        scanner.stop();
        scanner.clear();
      } catch {
        // Already stopped
      }
    };
  }, [
    showQRScanner,
    scannedBooking,
    manualBooking,
  ]);

  /* =====================================================
     MANUAL BOOKING ID
  ===================================================== */

  const handleManualBookingId = () => {
    if (!bookingId.trim()) {
      return;
    }

    const savedBooking =
      localStorage.getItem(
        "kisansetu_booking"
      );

    if (!savedBooking) {
      alert("Booking ID not found.");
      return;
    }

    try {
      const booking =
        JSON.parse(
          savedBooking
        ) as BookingData;

      if (
        booking.uniqueId !==
        bookingId.trim()
      ) {
        alert("Invalid Booking ID.");
        return;
      }

      setManualBooking(booking);
    } catch {
      alert(
        "Unable to read booking details."
      );
    }
  };

  /* =====================================================
     CLOSE QR
  ===================================================== */

  const closeQRScanner = () => {
    setShowQRScanner(false);
    setScannedBooking(null);
    setManualBooking(null);
    setBookingId("");
  };

  /* =====================================================
     USE BOOKING
  ===================================================== */

  const handleUseBooking = () => {
    const booking =
      scannedBooking || manualBooking;

    if (!booking) {
      return;
    }

    /*
     * THIS IS THE IMPORTANT PART.
     *
     * Every actual form field is populated
     * from the booking.
     */

    setNewLot({
      bookingId:
        booking.uniqueId || "",

      bookingDate:
        booking.date || "",

      bookingTime:
        booking.time || "",

      farmer:
        booking.farmer || "",

      crop:
        booking.crop || "Potato",

      quantity:
        booking.quantity || "",

      grade:
        booking.grade || "Grade A",

      centre:
        booking.center || "Centre A",
    });

    setScannedBooking(null);
    setManualBooking(null);
    setBookingId("");

    setShowQRScanner(false);

    /*
     * Open the form AFTER setting all
     * the booking values.
     */
    setShowAddModal(true);
  };

  /* =====================================================
     OPEN MANUAL FORM
  ===================================================== */

  const openManualForm = () => {
    setNewLot({
      bookingId: "",
      bookingDate: "",
      bookingTime: "",
      farmer: "",
      crop: "Potato",
      quantity: "",
      grade: "Grade A",
      centre: "Centre A",
    });

    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#1E293B] font-sans pb-12 select-none">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="w-full bg-[#344E06] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">

        <div className="flex items-center gap-3">

          <Link
            href="/login/admin/dashboard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-sm"
          >
            ←
          </Link>

          <div>
            <h1 className="text-xl font-bold font-oldenburg">
              Procurement Records
            </h1>

            <p className="text-[11px] text-[#E9DF87]">
              Live intake logs, quality grading inspection &amp; warehouse storage
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2">

          {/* SCAN */}

          <button
            type="button"
            onClick={() => {
              setScannedBooking(null);
              setManualBooking(null);
              setBookingId("");
              setShowQRScanner(true);
            }}
            className="text-xs bg-[#E9DDBD] hover:bg-white text-[#344E06] font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            📷 Scan Farmer QR
          </button>

          {/* MANUAL */}

          <button
            type="button"
            onClick={openManualForm}
            className="text-xs bg-[#EAF3D8] hover:bg-white text-[#344E06] font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            + Record Intake Lot
          </button>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">

        {/* METRICS */}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">

            <p className="text-xs text-gray-500 font-semibold uppercase">
              Today&apos;s Total
            </p>

            <h3 className="text-3xl font-bold text-[#1F2937] font-oldenburg mt-1">
              1,240 kg
            </h3>

            <span className="text-xs text-green-700 font-semibold">
              ↗ +22% from yesterday
            </span>

          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">

            <p className="text-xs text-gray-500 font-semibold uppercase">
              Top Crop Today
            </p>

            <h3 className="text-3xl font-bold text-[#D97706] font-oldenburg mt-1">
              Potato
            </h3>

            <span className="text-xs text-amber-700 font-semibold">
              720 kg procured
            </span>

          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">

            <p className="text-xs text-gray-500 font-semibold uppercase">
              Grade A Quality
            </p>

            <h3 className="text-3xl font-bold text-[#16A34A] font-oldenburg mt-1">
              94.2%
            </h3>

            <span className="text-xs text-green-700 font-semibold">
              Above MSP benchmark
            </span>

          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">

            <p className="text-xs text-gray-500 font-semibold uppercase">
              Lots Weighed
            </p>

            <h3 className="text-3xl font-bold text-[#2563EB] font-oldenburg mt-1">
              {logs.length} Lots
            </h3>

            <span className="text-xs text-blue-700 font-semibold">
              Across all centres
            </span>

          </div>

        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="bg-white rounded-2xl border border-[#E7E2D2] shadow-xs overflow-x-auto">

          <table className="w-full text-left text-xs">

            <thead className="bg-[#FAF8F3] border-b border-[#E7E2D2] text-gray-600 font-semibold uppercase text-[10px]">

              <tr>

                <th className="p-4">
                  Lot ID
                </th>

                <th className="p-4">
                  Arrival Time
                </th>

                <th className="p-4">
                  Farmer
                </th>

                <th className="p-4">
                  Crop Variety
                </th>

                <th className="p-4">
                  Weighed Quantity
                </th>

                <th className="p-4">
                  Quality Grade
                </th>

                <th className="p-4">
                  Mandi Centre
                </th>

                <th className="p-4">
                  Intake Status
                </th>

                <th className="p-4">
                  Receipt
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {logs.map((log) => (

                <tr
                  key={log.id}
                  className="hover:bg-gray-50/80 transition"
                >

                  <td className="p-4 font-mono font-bold text-[#344E06]">
                    {log.id}
                  </td>

                  <td className="p-4 text-gray-600 font-medium">
                    {log.time}
                  </td>

                  <td className="p-4 font-bold text-gray-900">
                    {log.farmer}
                  </td>

                  <td className="p-4 text-gray-700 font-medium">
                    {log.crop}
                  </td>

                  <td className="p-4 font-extrabold text-[#1F2937] text-sm">
                    {log.quantity}
                  </td>

                  <td className="p-4">

                    <span className="px-2 py-0.5 rounded bg-green-50 text-green-800 border border-green-200 font-medium text-[11px]">
                      {log.grade}
                    </span>

                  </td>

                  <td className="p-4 font-semibold text-gray-700">
                    {log.centre}
                  </td>

                  <td className="p-4">

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                      {log.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedLot(log)
                      }
                      className="text-[#344E06] hover:underline font-semibold text-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>📄</span>
                      Slip
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

      {/* =====================================================
          QR MODAL
      ===================================================== */}

      <AnimatePresence>

        {showQRScanner && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >

              <div className="flex items-center justify-between pb-3 border-b">

                <div>

                  <h3 className="text-base font-bold text-[#1F2937] font-oldenburg">
                    Verify Farmer Booking
                  </h3>

                  <p className="text-[11px] text-gray-500 mt-1">
                    Scan QR or enter Booking ID
                  </p>

                </div>

                <button
                  type="button"
                  onClick={closeQRScanner}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-lg cursor-pointer"
                >
                  ✕
                </button>

              </div>

              {/* VERIFIED */}

              {(scannedBooking || manualBooking) ? (

                <div className="py-5">

                  <div className="bg-[#F4F8EA] border border-[#D8E6B8] rounded-xl p-4 space-y-3">

                    <div className="text-center mb-4">

                      <div className="text-3xl">
                        ✅
                      </div>

                      <h4 className="font-bold text-[#344E06]">
                        Booking Verified
                      </h4>

                    </div>

                    <div className="flex justify-between text-xs border-b border-[#D8E6B8] pb-2">

                      <span className="text-gray-500">
                        Booking ID
                      </span>

                      <span className="font-bold">
                        {(scannedBooking || manualBooking)?.uniqueId}
                      </span>

                    </div>

                    <div className="flex justify-between text-xs border-b border-[#D8E6B8] pb-2">

                      <span className="text-gray-500">
                        Farmer
                      </span>

                      <span className="font-bold">
                        {(scannedBooking || manualBooking)?.farmer}
                      </span>

                    </div>

                    <div className="flex justify-between text-xs border-b border-[#D8E6B8] pb-2">

                      <span className="text-gray-500">
                        Crop
                      </span>

                      <span className="font-bold">
                        {(scannedBooking || manualBooking)?.crop}
                      </span>

                    </div>

                    <div className="flex justify-between text-xs border-b border-[#D8E6B8] pb-2">

                      <span className="text-gray-500">
                        Quantity
                      </span>

                      <span className="font-bold">
                        {(scannedBooking || manualBooking)?.quantity} kg
                      </span>

                    </div>

                    <div className="flex justify-between text-xs border-b border-[#D8E6B8] pb-2">

                      <span className="text-gray-500">
                        Grade
                      </span>

                      <span className="font-bold">
                        {(scannedBooking || manualBooking)?.grade}
                      </span>

                    </div>

                    <div className="flex justify-between text-xs border-b border-[#D8E6B8] pb-2">

                      <span className="text-gray-500">
                        Date
                      </span>

                      <span className="font-bold">
                        {(scannedBooking || manualBooking)?.date}
                      </span>

                    </div>

                    <div className="flex justify-between text-xs border-b border-[#D8E6B8] pb-2">

                      <span className="text-gray-500">
                        Time
                      </span>

                      <span className="font-bold">
                        {(scannedBooking || manualBooking)?.time}
                      </span>

                    </div>

                    <div className="flex justify-between text-xs">

                      <span className="text-gray-500">
                        Centre
                      </span>

                      <span className="font-bold">
                        {(scannedBooking || manualBooking)?.center}
                      </span>

                    </div>

                  </div>

                  <div className="flex gap-2 pt-4">

                    <button
                      type="button"
                      onClick={() => {
                        setScannedBooking(null);
                        setManualBooking(null);
                        setBookingId("");
                      }}
                      className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 cursor-pointer text-xs"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleUseBooking}
                      className="flex-1 py-2.5 rounded-xl bg-[#344E06] text-white font-bold hover:bg-[#283C04] cursor-pointer text-xs"
                    >
                      Use Booking →
                    </button>

                  </div>

                </div>

              ) : (

                <div className="py-5">

                  {/* CAMERA */}

                  <div
                    id="qr-reader"
                    className="w-full overflow-hidden rounded-xl"
                  />

                  <p className="text-center text-[10px] text-gray-400 mt-2">
                    Point the camera at the farmer&apos;s QR code
                  </p>

                  {/* OR */}

                  <div className="flex items-center gap-3 my-5">

                    <div className="flex-1 h-px bg-gray-200" />

                    <span className="text-[10px] text-gray-400 font-bold">
                      OR
                    </span>

                    <div className="flex-1 h-px bg-gray-200" />

                  </div>

                  {/* ID */}

                  <label className="block text-gray-700 font-semibold text-xs mb-1">
                    Enter Booking ID
                  </label>

                  <div className="flex gap-2">

                    <input
                      type="text"
                      placeholder="e.g. KS-12345678"
                      value={bookingId}
                      onChange={(e) =>
                        setBookingId(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter"
                        ) {
                          handleManualBookingId();
                        }
                      }}
                      className="flex-1 h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06] text-xs"
                    />

                    <button
                      type="button"
                      onClick={
                        handleManualBookingId
                      }
                      className="px-4 h-10 rounded-lg bg-[#344E06] text-white font-bold cursor-pointer text-xs"
                    >
                      Verify
                    </button>

                  </div>

                </div>

              )}

            </motion.div>

          </div>

        )}

      </AnimatePresence>

      {/* =====================================================
          INTAKE FORM
      ===================================================== */}

      <AnimatePresence>

        {showAddModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">

            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >

              {/* FORM HEADER */}

              <div className="flex items-center justify-between pb-3 border-b">

                <div>

                  <h3 className="text-base font-bold text-[#1F2937] font-oldenburg">
                    Record Produce Intake Lot
                  </h3>

                  {newLot.bookingId && (

                    <p className="text-[10px] text-[#344E06] font-semibold mt-1">
                      Booking: {newLot.bookingId}
                    </p>

                  )}

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  ✕
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleAddLot}
                className="py-4 space-y-3 text-xs"
              >

                {/* BOOKING ID */}

                {newLot.bookingId && (

                  <div>

                    <label className="block text-gray-700 font-semibold mb-1">
                      Booking ID
                    </label>

                    <input
                      type="text"
                      value={newLot.bookingId}
                      readOnly
                      className="w-full h-10 px-3 rounded-lg border border-[#BFD18F] bg-[#F4F8EA] text-[#344E06] font-bold outline-none"
                    />

                  </div>

                )}

                {/* BOOKING DATE */}

                {newLot.bookingDate && (

                  <div className="grid grid-cols-2 gap-2">

                    <div>

                      <label className="block text-gray-700 font-semibold mb-1">
                        Booking Date
                      </label>

                      <input
                        type="text"
                        value={
                          newLot.bookingDate
                        }
                        readOnly
                        className="w-full h-10 px-3 rounded-lg border border-[#BFD18F] bg-[#F4F8EA] text-gray-800 font-semibold outline-none"
                      />

                    </div>

                    <div>

                      <label className="block text-gray-700 font-semibold mb-1">
                        Booking Time
                      </label>

                      <input
                        type="text"
                        value={
                          newLot.bookingTime
                        }
                        readOnly
                        className="w-full h-10 px-3 rounded-lg border border-[#BFD18F] bg-[#F4F8EA] text-gray-800 font-semibold outline-none"
                      />

                    </div>

                  </div>

                )}

                {/* FARMER */}

                <div>

                  <label className="block text-gray-700 font-semibold mb-1">
                    Farmer Name *
                  </label>

                  <input
                    type="text"
                    required
                    value={newLot.farmer}
                    onChange={(e) =>
                      setNewLot({
                        ...newLot,
                        farmer:
                          e.target.value,
                      })
                    }
                    placeholder="Farmer name"
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                  />

                </div>

                {/* CROP + QUANTITY */}

                <div className="grid grid-cols-2 gap-2">

                  <div>

                    <label className="block text-gray-700 font-semibold mb-1">
                      Crop
                    </label>

                    <select
                      value={newLot.crop}
                      onChange={(e) =>
                        setNewLot({
                          ...newLot,
                          crop:
                            e.target.value,
                        })
                      }
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                    >

                      <option>
                        Potato
                      </option>

                      <option>
                        Wheat
                      </option>

                      <option>
                        Paddy
                      </option>

                      <option>
                        Mustard
                      </option>

                    </select>

                  </div>

                  <div>

                    <label className="block text-gray-700 font-semibold mb-1">
                      Quantity (kg) *
                    </label>

                    <input
                      type="number"
                      required
                      value={
                        newLot.quantity
                      }
                      onChange={(e) =>
                        setNewLot({
                          ...newLot,
                          quantity:
                            e.target.value,
                        })
                      }
                      placeholder="Quantity"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                    />

                  </div>

                </div>

                {/* GRADE + CENTRE */}

                <div className="grid grid-cols-2 gap-2">

                  <div>

                    <label className="block text-gray-700 font-semibold mb-1">
                      Inspection Grade
                    </label>

                    <select
                      value={newLot.grade}
                      onChange={(e) =>
                        setNewLot({
                          ...newLot,
                          grade:
                            e.target.value,
                        })
                      }
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                    >

                      <option>
                        Grade A
                      </option>

                      <option>
                        Grade B
                      </option>

                      <option>
                        Grade C
                      </option>

                    </select>

                  </div>

                  <div>

                    <label className="block text-gray-700 font-semibold mb-1">
                      Mandi Centre
                    </label>

                    <select
                      value={
                        newLot.centre
                      }
                      onChange={(e) =>
                        setNewLot({
                          ...newLot,
                          centre:
                            e.target.value,
                        })
                      }
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                    >

                      <option>
                        Centre A
                      </option>

                      <option>
                        Centre B
                      </option>

                      <option>
                        Centre C
                      </option>

                    </select>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="pt-2 flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setShowAddModal(
                        false
                      )
                    }
                    className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#344E06] text-white font-bold hover:bg-[#283C04] cursor-pointer"
                  >
                    Record &amp; Verify
                  </button>

                </div>

              </form>

            </motion.div>

          </div>

        )}

      </AnimatePresence>

      {/* =====================================================
          RECEIPT
      ===================================================== */}

      <AnimatePresence>

        {selectedLot && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">

            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >

              <div className="text-center pb-3 border-b">

                <span className="text-xl">
                  🌾
                </span>

                <h3 className="text-lg font-bold text-[#344E06] font-oldenburg">
                  KisanSetu Weighbridge Slip
                </h3>

                <p className="text-[11px] text-gray-500">
                  Government Mandi Procurement Receipt
                </p>

              </div>

              <div className="py-4 space-y-2 text-xs font-mono">

                <div className="flex justify-between py-1 border-b">
                  <span className="text-gray-500">
                    Receipt ID:
                  </span>

                  <span className="font-bold">
                    {selectedLot.id}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b">
                  <span className="text-gray-500">
                    Farmer:
                  </span>

                  <span className="font-bold">
                    {selectedLot.farmer}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b">
                  <span className="text-gray-500">
                    Crop:
                  </span>

                  <span className="font-bold">
                    {selectedLot.crop}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b">
                  <span className="text-gray-500">
                    Quantity:
                  </span>

                  <span className="font-bold text-[#344E06]">
                    {selectedLot.quantity}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b">
                  <span className="text-gray-500">
                    Grade:
                  </span>

                  <span className="font-bold">
                    {selectedLot.grade}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b">
                  <span className="text-gray-500">
                    Centre:
                  </span>

                  <span className="font-bold">
                    {selectedLot.centre}
                  </span>
                </div>

                <div className="flex justify-between py-1">

                  <span className="text-gray-500">
                    Status:
                  </span>

                  <span className="font-bold text-green-700">
                    {selectedLot.status}
                  </span>

                </div>

              </div>

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedLot(null)
                  }
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedLot(null)
                  }
                  className="flex-1 py-2.5 rounded-xl bg-[#344E06] text-white font-bold"
                >
                  🖨️ Print Slip
                </button>

              </div>

            </motion.div>

          </div>

        )}

      </AnimatePresence>

    </div>
  );
}