import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { strings } from '../i18n/strings';
import { cn } from '../utils';
import { 
  UserPlus, 
  Calendar, 
  Stethoscope, 
  Users,
  Clock,
  Megaphone,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

export default function Dashboard({ onTabChange }: DashboardProps) {
  const [isPaying, setIsPaying] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const handleAction = (id: string) => {
    if (id === 'billing') {
      setIsPaying(true);
      setTimeout(() => {
        setIsPaying(false);
        setPaymentSuccess(true);
        setTimeout(() => setPaymentSuccess(false), 3000);
      }, 2000);
    } else {
      onTabChange(id);
    }
  };

  const { data: appointments = [] } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => mockApi.getAppointments()
  });

  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: () => mockApi.getPatients()
  });

  const quickActions = [
    { id: 'registration', label: 'Register Patient', icon: UserPlus, color: 'bg-blue-50 text-blue-600' },
    { id: 'triage', label: 'Start Triage', icon: Stethoscope, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'scheduling', label: 'Book Visit', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
    { id: 'billing', label: 'Pay Fee', icon: CreditCard, color: 'bg-amber-50 text-amber-600' },
  ];

  const apps = [
    { id: 'patients', label: 'Patient Manager', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
    { id: 'schedule', label: 'Schedule', icon: Clock, color: 'bg-rose-50 text-rose-600' },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, color: 'bg-cyan-50 text-cyan-600' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Greeting */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">
            Welcome Back, <span className="text-blue-600 font-bold">Milan Pullapalli</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Here is your clinical overview for today.</p>
        </div>
      </div>

      {/* Payment Demo Feedback */}
      {isPaying && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-xs text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Processing Payment</h3>
            <p className="text-sm text-gray-500 italic">Connecting to secure gateway...</p>
          </div>
        </div>
      )}

      {paymentSuccess && (
        <div className="fixed bottom-24 left-4 right-4 z-[100] animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6" />
            <div className="flex-1">
              <div className="font-bold">Payment Successful</div>
              <div className="text-xs opacity-90">Transaction ID: #TXN-9942-A</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Card */}
      <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-black/5">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-y-10 gap-x-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95",
                action.color
              )}>
                <action.icon className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Apps Card */}
      <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-black/5">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Apps</h2>
        <div className="grid grid-cols-3 gap-y-10 gap-x-4">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => onTabChange(app.id)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95",
                app.color
              )}>
                <app.icon className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                {app.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Activity / Stats */}
      <div className="bg-emerald-600 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-lg shadow-emerald-600/20">
        <div>
          <div className="text-sm opacity-80">Today's Appointments</div>
          <div className="text-3xl font-black">{appointments.filter(a => a.status === 'Scheduled').length}</div>
        </div>
        <button 
          onClick={() => onTabChange('scheduling')}
          className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Recent Patients Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-gray-900">Recent Patients</h2>
          <button 
            onClick={() => onTabChange('patients')}
            className="text-sm font-bold text-blue-600"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {patients.slice(0, 3).map((patient) => (
            <button 
              key={patient.id}
              onClick={() => {
                // This is a bit tricky since we need to set both tab and selectedPatientId
                // We'll handle this in App.tsx by adding a custom event or just using onTabChange with a payload
                onTabChange(`patient:${patient.id}`);
              }}
              className="w-full bg-white p-4 rounded-2xl border border-black/5 flex items-center gap-4 hover:border-blue-200 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm">
                {patient.firstName[0]}{patient.lastName[0]}
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-sm">{patient.firstName} {patient.lastName}</div>
                <div className="text-[10px] text-gray-400">Last visit: 2 days ago</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
          {patients.length === 0 && (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center text-gray-400 text-sm">
              No recent patients to show.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

