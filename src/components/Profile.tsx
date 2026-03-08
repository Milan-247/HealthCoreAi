import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  LogOut, 
  Settings,
  ChevronRight,
  FileText,
  Heart,
  Activity,
  Database,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../utils';

export default function Profile() {
  const profileItems = [
    { icon: FileText, label: 'Medical Records', color: 'text-blue-600 bg-blue-50' },
    { icon: Shield, label: 'Privacy & Security', color: 'text-gray-600 bg-gray-50' },
    { icon: Settings, label: 'App Settings', color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Offline Mode Status */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          <Database className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-emerald-900">Offline Ready</div>
          <p className="text-xs text-emerald-700 opacity-80">All data is encrypted and stored on your device.</p>
        </div>
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-black/5 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full border-4 border-blue-50 p-1 mb-4">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Milan" 
            alt="Milan Pullapalli" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Milan Pullapalli</h2>
        <p className="text-blue-600 font-medium">Patient ID: MED-2026-8842</p>
        
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="text-xl font-bold text-gray-900">O+</div>
            <div className="text-xs text-gray-500">Blood Group</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="text-xl font-bold text-gray-900">72kg</div>
            <div className="text-xs text-gray-500">Weight</div>
          </div>
        </div>
      </div>

      {/* Health Summary */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-black/5">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Health Summary
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Last Triage</span>
            </div>
            <span className="text-xs font-bold text-emerald-600">Stable</span>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50">
            <div className="text-xs text-gray-400 mb-1">Known Allergies</div>
            <div className="text-sm font-medium text-gray-900">Penicillin, Peanuts</div>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50">
            <div className="text-xs text-gray-400 mb-1">Ongoing Medications</div>
            <div className="text-sm font-medium text-gray-900">Lisinopril (10mg)</div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-black/5 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Mail className="text-blue-600 w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-400">Email</div>
            <div className="text-sm font-medium text-gray-900">milan.p@example.com</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <Phone className="text-emerald-600 w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-400">Phone</div>
            <div className="text-sm font-medium text-gray-900">+91 98765 43210</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-black/5 space-y-2">
        {profileItems.map((item, i) => (
          <button key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.color)}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="flex-1 text-left font-medium text-gray-700">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
          </button>
        ))}
        <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-50 transition-colors group">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <LogOut className="text-red-600 w-5 h-5" />
          </div>
          <span className="flex-1 text-left font-medium text-red-600">Logout</span>
        </button>
      </div>
    </div>
  );
}

