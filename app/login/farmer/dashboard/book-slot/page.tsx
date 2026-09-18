"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  MapPin, 
  Search, 
  Scale, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Calendar, 
  Clock, 
  ChevronDown, 
  AlertCircle,
  Building2,
  FileText,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------
// MOCK DATA
// ----------------------------------------------------------------------
const MOCK_CROPS = [
  { id: 'rice', name: 'Rice (Paddy)', img: '/crops/rice.jpg' },
  { id: 'wheat', name: 'Wheat', img: '/crops/wheat.jpg' },
  { id: 'maize', name: 'Maize', img: '/crops/maize.jpg' },
  { id: 'mustard', name: 'Mustard', img: '/crops/mustard.jpg' },
  { id: 'potato', name: 'Potato', img: '/crops/potato.jpg' },
];

const MOCK_CENTRES = [
  { 
    id: 'c1', 
    name: 'Main Mandi, Haldia', 
    location: 'Haldia, Purba Medinipur, WB', 
    distance: '4.2 km', 
    capacity: '12,500 kg', 
    slots: 8,
    img: 'https://images.unsplash.com/photo-1588534015690-34fa9b47e8bb?w=400&q=80',
    recommended: true
  },
  { 
    id: 'c2', 
    name: 'Nandakumar Mandi', 
    location: 'Nandakumar, Purba Medinipur', 
    distance: '12.1 km', 
    capacity: '8,000 kg', 
    slots: 5,
    img: 'https://images.unsplash.com/photo-1533621408892-9a3c94bb8bd6?w=400&q=80',
    recommended: false
  },
  { 
    id: 'c3', 
    name: 'Tamluk Mandi', 
    location: 'Tamluk, Purba Medinipur', 
    distance: '18.7 km', 
    capacity: '10,000 kg', 
    slots: 6,
    img: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&q=80',
    recommended: false
  },
];

const MOCK_TIME_SLOTS = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM"
];

// ----------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------
export default function BookSlotPage() {
  // Form State
  const [crop, setCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [grade, setGrade] = useState('Common');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [centreId, setCentreId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  // UI State
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  const selectedCentre = MOCK_CENTRES.find(c => c.id === centreId);
  const selectedCropObj = MOCK_CROPS.find(c => c.id === crop);

  const filteredCentres = MOCK_CENTRES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!crop) newErrors.push("Please select a crop to procure.");
    if (!quantity || Number(quantity) <= 0) newErrors.push("Please enter a valid quantity greater than 0.");
    if (!date) newErrors.push("Please select a preferred date.");
    if (!timeSlot) newErrors.push("Please select a preferred time slot.");
    if (!centreId) newErrors.push("Please select a procurement centre.");
    if (!isConfirmed) newErrors.push("Please check the confirmation box.");
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleConfirmBooking = () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setBookingSuccess({
        id: `TKN-${Math.floor(1000 + Math.random() * 9000)}`,
        cropName: selectedCropObj?.name,
        quantity: quantity,
        centreName: selectedCentre?.name,
        date: date,
        timeSlot: timeSlot,
        status: "Confirmed"
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  // SUCCESS STATE VIEW
  if (bookingSuccess) {
    return (
      <div className="max-w-3xl mx-auto pb-12 font-onest pt-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-[#D8C867]/60 text-center relative overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "cover" }}
          />
          <div className="relative z-10">
            <div className="w-24 h-24 bg-[#EAF3D8] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md">
              <CheckCircle2 className="w-12 h-12 text-[#365006]" />
            </div>
            <h2 className="text-3xl font-bold text-[#351903] font-oldenburg mb-2">Slot Booked Successfully!</h2>
            <p className="text-[#8A7B58] font-medium mb-8">Your procurement slot is secured. Show this summary at the gate.</p>
            
            <div className="bg-[#FAF9F6] rounded-2xl border border-[#D8C867]/40 shadow-sm relative overflow-hidden text-left mb-8">
              <div className="bg-[#365006] px-6 py-4 flex justify-between items-center text-white">
                 <span className="font-bold uppercase tracking-wider text-sm">Booking ID</span>
                 <span className="text-2xl font-black font-oldenburg text-[#F0E383]">{bookingSuccess.id}</span>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-[#8A7B58] font-bold uppercase tracking-wider mb-1">Crop Details</p>
                  <p className="text-lg font-bold text-[#351903]">{bookingSuccess.cropName} ({bookingSuccess.quantity} kg)</p>
                </div>
                <div>
                  <p className="text-xs text-[#8A7B58] font-bold uppercase tracking-wider mb-1">Status</p>
                  <p className="text-lg font-bold text-[#365006] flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#365006] animate-pulse"></span> {bookingSuccess.status}
                  </p>
                </div>
                <div className="sm:col-span-2 pt-4 border-t border-[#D8C867]/30">
                  <p className="text-xs text-[#8A7B58] font-bold uppercase tracking-wider mb-1">Procurement Centre</p>
                  <p className="text-lg font-bold text-[#351903]">{bookingSuccess.centreName}</p>
                </div>
                <div className="pt-4 border-t border-[#D8C867]/30">
                  <p className="text-xs text-[#8A7B58] font-bold uppercase tracking-wider mb-1">Date</p>
                  <p className="text-lg font-bold text-[#351903]">{new Date(bookingSuccess.date).toLocaleDateString('en-IN', { dateStyle: 'medium'})}</p>
                </div>
                <div className="pt-4 border-t border-[#D8C867]/30">
                  <p className="text-xs text-[#8A7B58] font-bold uppercase tracking-wider mb-1">Time Slot</p>
                  <p className="text-lg font-bold text-[#351903]">{bookingSuccess.timeSlot}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3.5 bg-white border-2 border-[#D8C867]/60 text-[#351903] font-bold rounded-xl hover:bg-[#FAF9F6] transition shadow-sm flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" /> Download Slip
              </button>
              <Link href="/login/farmer/dashboard/queue" className="px-8 py-3.5 bg-[#365006] text-white font-bold rounded-xl hover:bg-[#2c4205] transition shadow-lg shadow-[#365006]/20">
                Go to My Queue
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // FORM VIEW
  return (
    <div className="max-w-7xl mx-auto pb-12 font-onest">
      
      {/* 1. TOP HERO BANNER */}
      <div className="bg-[#EAF3D8] rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden border border-[#b4d374]/50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none w-1/2 h-full">
          <img src="/bgsketch.png" alt="sketch" className="w-full h-full object-cover mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 w-full md:w-2/3">
          <div className="flex items-center gap-2 text-[#365006] font-bold text-xs uppercase tracking-wider mb-2">
            <LeafIcon className="w-4 h-4" /> Book Slot
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#351903] font-oldenburg leading-tight mb-2">
            From Your Fields to a <span className="text-[#365006]">Brighter Tomorrow</span>
          </h1>
          <p className="text-[#5B4A3D] font-medium mb-8 max-w-lg">
            Schedule your crop drop-off at a nearby procurement centre with ease
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 sm:gap-4 max-w-md">
            {[
              { num: 1, label: "Enter Details", active: true },
              { num: 2, label: "Select Centre", active: !!centreId },
              { num: 3, label: "Choose Slot", active: !!date && !!timeSlot },
              { num: 4, label: "Confirm", active: isConfirmed }
            ].map((step, i) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${step.active ? 'bg-[#365006] text-white' : 'bg-white text-[#C9C4B2] border border-[#D8C867]'}`}>
                    {step.num}
                  </div>
                  <span className={`text-[9px] sm:text-[11px] font-bold whitespace-nowrap text-center ${step.active ? 'text-[#365006]' : 'text-[#8A7B58]'}`}>{step.label}</span>
                </div>
                {i < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 border-t-2 border-dashed ${step.active ? 'border-[#365006]' : 'border-[#D8C867]/50'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 hidden md:block">
           {/* Replace farmer image with generic local illustration if needed, reusing onboardingFarmer */}
           <img src="/onboardingFarmer.png" alt="Farmer" className="w-full h-full object-contain scale-125 origin-bottom" />
           <div className="absolute top-0 right-0 rotate-12 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-[#D8C867] shadow-sm transform translate-x-4 -translate-y-4">
             <p className="text-xs font-bold text-[#351903] font-oldenburg italic">"Support today for a<br/>better harvest tomorrow."</p>
           </div>
        </div>
      </div>

      {errors.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-center gap-2 text-red-800 font-bold mb-2">
            <AlertCircle className="w-5 h-5" /> Please fix the following errors:
          </div>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </motion.div>
      )}

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6 lg:space-y-8">
          
          {/* CROP DETAILS CARD */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#D8C867]/40 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#EAF3D8] text-[#365006] flex items-center justify-center">
                <LeafIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#351903] font-oldenburg">1. Enter Crop Details</h2>
            </div>
            <p className="text-[#8A7B58] text-sm font-medium mb-6 ml-11">Tell us what you want to sell</p>

            <div className="space-y-6">
              {/* Crop Selection */}
              <div>
                <label className="block text-sm font-bold text-[#351903] mb-3">Select Crop <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {MOCK_CROPS.map((c) => {
                    const isSelected = crop === c.id;
                    return (
                      <div 
                        key={c.id}
                        onClick={() => setCrop(c.id)}
                        className={`p-2 rounded-xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all relative group ${isSelected ? 'border-[#365006] bg-[#F8F6ED] shadow-sm' : 'border-gray-100 bg-white hover:border-[#D8C867]/50'}`}
                      >
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden transition-transform ${isSelected ? 'scale-105 border-4 border-white shadow-md' : 'group-hover:scale-105'}`}>
                          <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[11px] sm:text-xs font-bold text-center w-full leading-tight ${isSelected ? 'text-[#365006]' : 'text-gray-600'}`}>{c.name}</span>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-[#365006] rounded-full flex items-center justify-center shadow-sm z-10">
                            <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* Quantity and Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#351903] mb-2">Quantity (in kg) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#365006]" />
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 500" 
                      className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#365006] focus:ring-1 focus:ring-[#365006] outline-none transition-all text-sm font-bold text-[#351903] bg-white" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">kg</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#351903] mb-2">Grade <span className="text-gray-400 font-normal">(optional)</span></label>
                  <div className="relative">
                    <select 
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#365006] focus:ring-1 focus:ring-[#365006] outline-none transition-all text-sm font-bold text-[#351903] appearance-none bg-white cursor-pointer"
                    >
                      <option value="Common">Common</option>
                      <option value="Grade A">Grade A</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#351903] mb-2">Preferred Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#365006] pointer-events-none" />
                    <input 
                      type="date" 
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#365006] focus:ring-1 focus:ring-[#365006] outline-none transition-all text-sm font-bold text-[#351903] bg-white cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#351903] mb-2">Preferred Time Slot <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#365006]" />
                    <select 
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#365006] focus:ring-1 focus:ring-[#365006] outline-none transition-all text-sm font-bold text-[#351903] appearance-none bg-white cursor-pointer"
                    >
                      <option value="" disabled>Select Time</option>
                      {MOCK_TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="bg-[#EAF3D8]/60 p-4 rounded-xl border border-[#b4d374]/30 flex items-center gap-3">
                 <div className="bg-[#365006] p-2 rounded-lg text-white">
                   <LeafIcon className="w-4 h-4" />
                 </div>
                 <div>
                   <p className="font-bold text-[#351903] text-sm">Fair Price. Secure Process. Direct Payment.</p>
                   <p className="text-xs text-[#8A7B58] mt-0.5">Get the best value for your produce through authorised procurement centres.</p>
                 </div>
              </div>

            </div>
          </div>

          {/* REVIEW & CONFIRM CARD */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#D8C867]/40 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#365006] text-white flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#351903] font-oldenburg">3. Review & Confirm</h2>
            </div>
            <p className="text-[#8A7B58] text-sm font-medium mb-6 ml-11">Please review your details before confirming</p>

            <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#D8C867]/30 mb-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div className="flex items-center gap-2">
                  <LeafIcon className="w-4 h-4 text-[#8A7B58]" />
                  <span className="text-xs text-[#8A7B58]">Crop</span>
                </div>
                <div className="font-bold text-sm text-[#351903]">{selectedCropObj?.name || '-'}</div>

                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#8A7B58]" />
                  <span className="text-xs text-[#8A7B58]">Quantity</span>
                </div>
                <div className="font-bold text-sm text-[#351903]">{quantity ? `${quantity} kg` : '-'}</div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8A7B58]" />
                  <span className="text-xs text-[#8A7B58]">Date</span>
                </div>
                <div className="font-bold text-sm text-[#351903]">{date ? new Date(date).toLocaleDateString('en-IN', { dateStyle: 'medium'}) : '-'}</div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8A7B58]" />
                  <span className="text-xs text-[#8A7B58]">Time Slot</span>
                </div>
                <div className="font-bold text-sm text-[#351903]">{timeSlot || '-'}</div>

                <div className="col-span-2 border-t border-[#D8C867]/30 my-2"></div>

                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#8A7B58]" />
                  <span className="text-xs text-[#8A7B58]">Procurement Centre</span>
                </div>
                <div className="font-bold text-sm text-[#351903]">{selectedCentre?.name || '-'}</div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8A7B58]" />
                  <span className="text-xs text-[#8A7B58]">Distance</span>
                </div>
                <div className="font-bold text-sm text-[#351903]">{selectedCentre?.distance || '-'}</div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8A7B58]" />
                  <span className="text-xs text-[#8A7B58]">Available Slots</span>
                </div>
                <div className="font-bold text-sm text-[#351903]">{selectedCentre?.slots || '-'} slots</div>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mb-6 group">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input 
                  type="checkbox" 
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border-2 border-[#D8C867] rounded bg-white checked:bg-[#365006] checked:border-[#365006] transition-colors cursor-pointer"
                />
                <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className="text-sm text-[#5B4A3D] font-medium leading-snug group-hover:text-[#351903] transition-colors">
                I confirm that the above details are correct and I will bring the specified quantity on the selected date and time.
              </span>
            </label>

            <button 
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className="w-full py-4 bg-[#365006] text-white font-bold text-lg rounded-xl hover:bg-[#2c4205] transition-all shadow-lg flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="animate-pulse">PROCESSING...</span>
              ) : (
                <>
                  <Calendar className="w-5 h-5" /> Confirm Booking
                </>
              )}
            </button>
          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6 lg:space-y-8">
          
          {/* PROCUREMENT CENTRE SELECTION */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#D8C867]/40 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#EAF3D8] text-[#365006] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#351903] font-oldenburg">2. Select Procurement Centre</h2>
            </div>
            <p className="text-[#8A7B58] text-sm font-medium mb-6 ml-11">Choose a nearby centre for drop-off</p>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search centre by name or location..." 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#365006] focus:ring-1 focus:ring-[#365006] outline-none transition-all text-sm font-medium text-[#351903] bg-white" 
              />
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredCentres.map(c => {
                const isSelected = centreId === c.id;
                return (
                  <label 
                    key={c.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-[#365006] bg-[#F8F6ED]' : 'border-gray-100 bg-white hover:border-[#D8C867]'}`}
                  >
                    <div className="relative flex items-center justify-center shrink-0 mt-3">
                      <input 
                        type="radio" 
                        name="centre"
                        value={c.id}
                        checked={isSelected}
                        onChange={() => setCentreId(c.id)}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full bg-white checked:border-[#365006] transition-colors cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 bg-[#365006] rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`font-bold ${isSelected ? 'text-[#351903]' : 'text-gray-800'}`}>{c.name}</span>
                        {c.recommended && (
                          <span className="bg-[#365006] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommended</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <MapPin className="w-3 h-3 text-[#365006]" /> {c.location}
                      </div>
                      <div className="flex items-center gap-4 text-xs font-medium">
                        <span className="text-[#8A7B58]">{c.distance} from your location</span>
                        <span className="text-[#351903]">Capacity: {c.capacity}</span>
                      </div>
                      <div className="text-xs font-bold text-[#351903] mt-1 bg-white inline-block px-2 py-1 rounded border border-gray-100">
                        Slots Available: {c.slots}
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
            
            <button className="w-full text-center text-sm font-bold text-[#8A7B58] hover:text-[#365006] mt-4 flex justify-center items-center gap-1 transition-colors">
              View More Centres <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* DYNAMIC CENTRE INFORMATION */}
          <AnimatePresence>
            {selectedCentre && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-[#D8C867]/40 p-6 sm:p-8 overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF3D8] text-[#365006] flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#351903] font-oldenburg">Centre Information</h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="w-full sm:w-1/3 h-32 rounded-xl overflow-hidden relative shadow-sm border border-gray-100 shrink-0">
                    <img src={selectedCentre.img} alt={selectedCentre.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-bold text-[#351903] text-lg">{selectedCentre.name}</h3>
                      <span className="inline-flex items-center gap-1 bg-[#EAF3D8] text-[#365006] text-[10px] font-bold px-2 py-0.5 rounded border border-[#b4d374]">
                        <Building2 className="w-3 h-3" /> Government Centre
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <MapPin className="w-4 h-4 text-[#365006]" /> {selectedCentre.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <TrendingUp className="w-4 h-4 text-[#365006]" /> {selectedCentre.distance} from your location
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Scale className="w-4 h-4 text-[#365006]" /> <span className="font-bold text-[#351903]">{selectedCentre.capacity}</span> (per day)
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-[#365006]" /> Slots Available: <span className="font-bold text-[#351903]">{selectedCentre.slots}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Clock className="w-4 h-4 text-[#365006]" /> Working Hours: 8:00 AM - 5:00 PM
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-6 border-t border-gray-100">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#D8C867]/50 flex items-center justify-center text-[#365006] shadow-sm">
                      <Scale className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#8A7B58] leading-tight">Weighing<br/>Facility</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#D8C867]/50 flex items-center justify-center text-[#365006] shadow-sm">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#8A7B58] leading-tight">Quality<br/>Check</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#D8C867]/50 flex items-center justify-center text-[#365006] shadow-sm">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#8A7B58] leading-tight">Secure<br/>Payment</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#D8C867]/50 flex items-center justify-center text-[#365006] shadow-sm">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#8A7B58] leading-tight">Farmer<br/>Support</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}

// Helper Leaf Icon (since Lucide doesn't have the exact leaf from the design)
function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}
