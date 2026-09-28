export interface FarmerProfile {
  id: string;
  name: string;
  mobile: string;
  village: string;
  district: string;
  state: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

export interface Crop {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  harvestDate: string;
  status: 'Growing' | 'Ready to Sell' | 'Listed' | 'Sold';
  expectedPrice?: number;
  currentPrice?: number;
}

export interface MarketPrice {
  id: string;
  crop: string;
  currentPrice: number;
  change: number;
  demand: 'High' | 'Medium' | 'Low';
}

export interface Order {
  id: string;
  crop: string;
  quantity: number;
  unit: string;
  center: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'In Transit' | 'Completed';
  date: string;
}

export interface Payment {
  id: string;
  date: string;
  crop: string;
  amount: number;
  status: 'Paid' | 'Pending';
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: 'Payment' | 'Queue' | 'Market' | 'Order' | 'System';
}

export interface QueueStatus {
  queueNumber: number;
  currentlyServing: number;
  farmersAhead: number;
  estimatedWaitMins: number;
  status: 'Waiting' | 'Called' | 'Processing' | 'Completed';
}

export interface SlotBooking {
  id: string;
  cropId: string;
  date: string;
  timeSlot: string; // e.g., "10:00 AM - 11:00 AM"
  center: string;
  status: 'Booked' | 'Completed' | 'Cancelled';
}
