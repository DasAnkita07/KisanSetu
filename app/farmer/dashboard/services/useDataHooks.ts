"use client";

import { useState, useEffect, useCallback } from 'react';
import { getDb, setDb, initDb } from './localStorageDb';
import { FarmerProfile, Crop, MarketPrice, Order, Payment, Notification, QueueStatus } from '../types';

export function useKisanData() {
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [market, setMarket] = useState<MarketPrice[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [queue, setQueue] = useState<QueueStatus | null>(null);
  const [slots, setSlots] = useState<any[]>([]);

  const loadData = useCallback(() => {
    initDb();
    setProfile(getDb<FarmerProfile>('profile'));
    setCrops(getDb<Crop[]>('crops') || []);
    setMarket(getDb<MarketPrice[]>('market') || []);
    setOrders(getDb<Order[]>('orders') || []);
    setPayments(getDb<Payment[]>('payments') || []);
    setNotifications(getDb<Notification[]>('notifications') || []);
    setQueue(getDb<QueueStatus>('queue'));
    setSlots(getDb<any[]>('slots') || []);
  }, []);

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('ks_db_update', handleUpdate);
    return () => window.removeEventListener('ks_db_update', handleUpdate);
  }, [loadData]);

  // Actions
  const addCrop = (crop: Omit<Crop, 'id'>) => {
    const newCrop = { ...crop, id: Date.now().toString() };
    const updated = [...crops, newCrop];
    setDb('crops', updated);
  };
  
  const updateCrop = (id: string, updates: Partial<Crop>) => {
    const updated = crops.map(c => c.id === id ? { ...c, ...updates } : c);
    setDb('crops', updated);
  };

  const deleteCrop = (id: string) => {
    const updated = crops.filter(c => c.id !== id);
    setDb('crops', updated);
  };

  const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
    const newOrder = { 
      ...order, 
      id: `ORD${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString().split('T')[0]
    };
    setDb('orders', [newOrder, ...orders]);
  };

  const bookSlot = (slotData: any) => {
    const newSlot = {
      ...slotData,
      id: `SLT-${Math.floor(Math.random() * 900) + 100}`,
      status: 'Booked'
    };
    setDb('slots', [newSlot, ...slots]);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setDb('notifications', updated);
  };

  const updateProfile = (updates: Partial<FarmerProfile>) => {
    if (profile) {
      setDb('profile', { ...profile, ...updates });
    }
  };

  const refreshQueue = () => {
    if (queue && queue.currentlyServing < queue.queueNumber) {
      const advanced = Math.floor(Math.random() * 2) + 1; // Advance 1 or 2 spots
      const newServing = Math.min(queue.currentlyServing + advanced, queue.queueNumber);
      const newAhead = queue.queueNumber - newServing;
      const status = newAhead === 0 ? 'Called' : 'Waiting';
      const updated = {
        ...queue,
        currentlyServing: newServing,
        farmersAhead: newAhead,
        estimatedWaitMins: Math.max(0, queue.estimatedWaitMins - (advanced * 5)),
        status
      } as QueueStatus;
      
      setDb('queue', updated);
      
      if (status === 'Called') {
        const notif: Notification = {
          id: Date.now().toString(),
          message: `Ramesh Kumar, your queue number #${queue.queueNumber} is being called!`,
          time: 'Just now',
          read: false,
          type: 'Queue'
        };
        setDb('notifications', [notif, ...notifications]);
      }
    }
  };

  return {
    profile,
    crops,
    market,
    orders,
    payments,
    notifications,
    queue,
    slots,
    addCrop,
    updateCrop,
    deleteCrop,
    addOrder,
    bookSlot,
    markNotificationRead,
    updateProfile,
    refreshQueue,
  };
}
