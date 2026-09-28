"use client";

import { FarmerProfile, Crop, MarketPrice, Order, Payment, Notification, QueueStatus } from '../types';

const INITIAL_PROFILE: FarmerProfile = {
  id: 'FRM-26-048721',
  name: 'Ramesh Kumar',
  mobile: '******4821',
  village: 'Nandigram',
  district: 'Purba Medinipur',
  state: 'West Bengal',
  status: 'Verified',
};

const INITIAL_CROPS: Crop[] = [
  { id: '1', name: 'Rice', quantity: 500, unit: 'kg', harvestDate: '2026-09-12', status: 'Ready to Sell', currentPrice: 32 },
  { id: '2', name: 'Potato', quantity: 300, unit: 'kg', harvestDate: '2026-09-15', status: 'Listed', currentPrice: 24 },
  { id: '3', name: 'Wheat', quantity: 450, unit: 'kg', harvestDate: '2026-09-25', status: 'Growing', currentPrice: 28 },
  { id: '4', name: 'Tomato', quantity: 200, unit: 'kg', harvestDate: '2026-09-10', status: 'Sold', currentPrice: 35 },
  { id: '5', name: 'Maize', quantity: 350, unit: 'kg', harvestDate: '2026-09-20', status: 'Listed', currentPrice: 26 },
];

const INITIAL_MARKET: MarketPrice[] = [
  { id: 'm1', crop: 'Rice', currentPrice: 32, change: 2, demand: 'High' },
  { id: 'm2', crop: 'Potato', currentPrice: 24, change: 1, demand: 'Medium' },
  { id: 'm3', crop: 'Wheat', currentPrice: 28, change: -1, demand: 'High' },
  { id: 'm4', crop: 'Maize', currentPrice: 26, change: 1, demand: 'Medium' },
  { id: 'm5', crop: 'Tomato', currentPrice: 35, change: 3, demand: 'High' },
];

const INITIAL_ORDERS: Order[] = [
  { id: 'ORD1024', crop: 'Rice', quantity: 200, unit: 'kg', center: 'Haldia', amount: 6400, status: 'Processing', date: '2026-09-18' },
  { id: 'ORD1023', crop: 'Potato', quantity: 150, unit: 'kg', center: 'Haldia', amount: 3600, status: 'Completed', date: '2026-09-16' },
  { id: 'ORD1022', crop: 'Wheat', quantity: 250, unit: 'kg', center: 'Haldia', amount: 7000, status: 'Pending', date: '2026-09-14' },
  { id: 'ORD1021', crop: 'Tomato', quantity: 100, unit: 'kg', center: 'Haldia', amount: 3500, status: 'In Transit', date: '2026-09-10' },
];

const INITIAL_PAYMENTS: Payment[] = [
  { id: 'p1', date: '2026-09-18', crop: 'Rice', amount: 6400, status: 'Paid' },
  { id: 'p2', date: '2026-09-16', crop: 'Potato', amount: 3600, status: 'Paid' },
  { id: 'p3', date: '2026-09-14', crop: 'Wheat', amount: 5200, status: 'Pending' },
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', message: 'Payment of ₹6,400 received', time: '2 hours ago', read: false, type: 'Payment' },
  { id: 'n2', message: 'Your queue number #24 is approaching', time: '3 hours ago', read: false, type: 'Queue' },
  { id: 'n3', message: 'Rice market price increased by ₹2/kg', time: '5 hours ago', read: true, type: 'Market' },
  { id: 'n4', message: 'Order #ORD1024 is now In Transit', time: '1 day ago', read: true, type: 'Order' },
];

const INITIAL_QUEUE: QueueStatus = {
  queueNumber: 24,
  currentlyServing: 18,
  farmersAhead: 6,
  estimatedWaitMins: 35,
  status: 'Waiting'
};

const INITIAL_SLOTS: any[] = [
  { id: 'SLT-101', cropId: '1', date: '2026-09-22', timeSlot: '10:00 AM - 11:00 AM', center: 'Haldia APMC', status: 'Booked' }
];

export const initDb = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('ks_profile')) localStorage.setItem('ks_profile', JSON.stringify(INITIAL_PROFILE));
  if (!localStorage.getItem('ks_crops')) localStorage.setItem('ks_crops', JSON.stringify(INITIAL_CROPS));
  if (!localStorage.getItem('ks_market')) localStorage.setItem('ks_market', JSON.stringify(INITIAL_MARKET));
  if (!localStorage.getItem('ks_orders')) localStorage.setItem('ks_orders', JSON.stringify(INITIAL_ORDERS));
  if (!localStorage.getItem('ks_payments')) localStorage.setItem('ks_payments', JSON.stringify(INITIAL_PAYMENTS));
  if (!localStorage.getItem('ks_notifications')) localStorage.setItem('ks_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
  if (!localStorage.getItem('ks_queue')) localStorage.setItem('ks_queue', JSON.stringify(INITIAL_QUEUE));
  if (!localStorage.getItem('ks_slots')) localStorage.setItem('ks_slots', JSON.stringify(INITIAL_SLOTS));
};

export const getDb = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(`ks_${key}`);
  return data ? JSON.parse(data) : null;
};

export const setDb = <T>(key: string, data: T) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`ks_${key}`, JSON.stringify(data));
  // Dispatch custom event for cross-component reactivity if needed
  window.dispatchEvent(new Event('ks_db_update'));
};
