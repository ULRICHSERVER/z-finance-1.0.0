import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Users,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Globe,
  Share2,
  MapPin,
  Video,
  Briefcase,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  DollarSign,
  FileText,
  Layers,
  Settings,
  RefreshCw,
  Download,
  Printer,
  X,
  User,
  Check
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

export interface CalendarEvent {
  id: number;
  calendar_id: number;
  calendar_name: string;
  color_hex: string;
  title: string;
  description: string;
  category: 'meeting' | 'appointment' | 'training' | 'conference' | 'workshop' | 'deadline' | 'reminder' | 'holiday' | 'personal' | 'business' | 'custom';
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  location: string;
  online_meeting_link?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  reminder_minutes_before: number;
  organizer_name: string;
  workspace_name?: string;
  is_recurring: boolean;
  participants_count: number;
}

export interface Appointment {
  id: number;
  appointment_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_name: string;
  assigned_employee_name: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  location: string;
  status: 'requested' | 'pending_approval' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
  payment_status: 'unpaid' | 'partially_paid' | 'paid' | 'refunded';
  notes?: string;
}

export interface ReminderItem {
  id: number;
  title: string;
  message: string;
  type: 'meeting' | 'payment' | 'deadline' | 'personal';
  due_date: string;
  channel: 'in_app' | 'email' | 'sms' | 'push';
  is_read: boolean;
}

export default function CalendarModule() {
  const [activeView, setActiveView] = useState<'month' | 'week' | 'day' | 'agenda' | 'appointments' | 'team' | 'reminders'>('month');
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Modals state
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Form States for New Event
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<CalendarEvent['category']>('meeting');
  const [eventStartDate, setEventStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventStartTime, setEventStartTime] = useState('10:00');
  const [eventEndTime, setEventEndTime] = useState('11:00');
  const [eventLocation, setEventLocation] = useState('Conference Room A');
  const [eventMeetingLink, setEventMeetingLink] = useState('https://meet.google.com/zfin-boardroom');
  const [eventPriority, setEventPriority] = useState<CalendarEvent['priority']>('medium');
  const [eventDescription, setEventDescription] = useState('');

  // Form States for New Appointment
  const [aptCustomerName, setAptCustomerName] = useState('');
  const [aptCustomerEmail, setAptCustomerEmail] = useState('');
  const [aptServiceName, setAptServiceName] = useState('Enterprise Financial Audit');
  const [aptEmployeeName, setAptEmployeeName] = useState('Sarah Connor (Senior Accountant)');
  const [aptDate, setAptDate] = useState(new Date().toISOString().split('T')[0]);
  const [aptTime, setAptTime] = useState('14:00');

  // Sample Events Data
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      calendar_id: 1,
      calendar_name: 'General Operations',
      color_hex: '#4f46e5',
      title: 'Executive Board Strategy Sync',
      description: 'Quarterly review with executive management and board advisors.',
      category: 'meeting',
      start_date: new Date().toISOString().split('T')[0],
      start_time: '09:30',
      end_date: new Date().toISOString().split('T')[0],
      end_time: '11:00',
      location: 'Main Executive Boardroom',
      online_meeting_link: 'https://meet.google.com/zfin-exec-sync',
      priority: 'high',
      status: 'scheduled',
      reminder_minutes_before: 15,
      organizer_name: 'CEO Office',
      workspace_name: 'Corporate HQ',
      is_recurring: true,
      participants_count: 8
    },
    {
      id: 2,
      calendar_id: 2,
      calendar_name: 'CRM & Client Services',
      color_hex: '#059669',
      title: 'Acme Corp SLA & License Renewal',
      description: 'Reviewing enterprise SLA requirements and subscription billing.',
      category: 'appointment',
      start_date: new Date().toISOString().split('T')[0],
      start_time: '14:00',
      end_date: new Date().toISOString().split('T')[0],
      end_time: '15:00',
      location: 'Google Meet',
      online_meeting_link: 'https://meet.google.com/acme-renewal-2026',
      priority: 'urgent',
      status: 'scheduled',
      reminder_minutes_before: 30,
      organizer_name: 'Sarah Connor',
      workspace_name: 'Finance & CRM',
      is_recurring: false,
      participants_count: 4
    },
    {
      id: 3,
      calendar_id: 3,
      calendar_name: 'Tax & Compliance',
      color_hex: '#d97706',
      title: 'Q3 Tax Filing & Ledger Audit Deadline',
      description: 'Final submission deadline for Q3 auditing reports.',
      category: 'deadline',
      start_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      start_time: '17:00',
      end_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      end_time: '18:00',
      location: 'Internal Compliance Portal',
      priority: 'urgent',
      status: 'scheduled',
      reminder_minutes_before: 60,
      organizer_name: 'Compliance Office',
      workspace_name: 'Accounting Unit',
      is_recurring: false,
      participants_count: 12
    },
    {
      id: 4,
      calendar_id: 1,
      calendar_name: 'Engineering & Product',
      color_hex: '#2563eb',
      title: 'Z-FINANCE 1.0.0 Release Workshop',
      description: 'Hands-on technical onboarding for departmental admins.',
      category: 'workshop',
      start_date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      start_time: '13:00',
      end_date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      end_time: '15:30',
      location: 'Training Hall & MS Teams',
      priority: 'medium',
      status: 'scheduled',
      reminder_minutes_before: 15,
      organizer_name: 'IT Systems Admin',
      workspace_name: 'Engineering',
      is_recurring: false,
      participants_count: 24
    }
  ]);

  // Sample Appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      appointment_number: 'APT-20260723-8821',
      customer_name: 'Acme Corporation (John Miller)',
      customer_email: 'john.m@acmecorp.com',
      customer_phone: '+1 (555) 234-5678',
      service_name: 'Enterprise Financial Audit Consultation',
      assigned_employee_name: 'Sarah Connor (Senior Accountant)',
      appointment_date: new Date().toISOString().split('T')[0],
      appointment_time: '11:00',
      duration_minutes: 60,
      location: 'Executive Suite B',
      status: 'confirmed',
      payment_status: 'paid',
      notes: 'Customer requested focus on international tax compliance.'
    },
    {
      id: 2,
      appointment_number: 'APT-20260723-9104',
      customer_name: 'Global Logistics Inc (Elena Rostova)',
      customer_email: 'elena@globallogistics.io',
      customer_phone: '+1 (555) 876-5432',
      service_name: 'Ledger Integration & API Review',
      assigned_employee_name: 'David Kim (Lead Developer)',
      appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      appointment_time: '15:30',
      duration_minutes: 45,
      location: 'Online Google Meet',
      status: 'requested',
      payment_status: 'unpaid',
      notes: 'Awaiting final confirmation from developer.'
    }
  ]);

  // Sample Reminders
  const [reminders, setReminders] = useState<ReminderItem[]>([
    {
      id: 1,
      title: 'Invoice Payment Due: Inv #INV-2026-089',
      message: 'TechCorp LLC payment of $4,500.00 is due tomorrow morning.',
      type: 'payment',
      due_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      channel: 'in_app',
      is_read: false
    },
    {
      id: 2,
      title: 'Executive Board Strategy Sync in 15 mins',
      message: 'Prepare quarterly financial performance slides for review.',
      type: 'meeting',
      due_date: new Date().toISOString().split('T')[0],
      channel: 'push',
      is_read: true
    }
  ]);

  // Filtered Events
  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || e.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Create Event Handler
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;

    const newEvent: CalendarEvent = {
      id: Date.now(),
      calendar_id: 1,
      calendar_name: 'General Operations',
      color_hex: eventCategory === 'deadline' ? '#d97706' : eventCategory === 'appointment' ? '#059669' : '#4f46e5',
      title: eventTitle,
      description: eventDescription,
      category: eventCategory,
      start_date: eventStartDate,
      start_time: eventStartTime,
      end_date: eventStartDate,
      end_time: eventEndTime,
      location: eventLocation,
      online_meeting_link: eventMeetingLink,
      priority: eventPriority,
      status: 'scheduled',
      reminder_minutes_before: 15,
      organizer_name: 'Active User',
      workspace_name: 'Main Workspace',
      is_recurring: false,
      participants_count: 1
    };

    setEvents([newEvent, ...events]);
    setShowNewEventModal(false);
    resetEventForm();
  };

  const resetEventForm = () => {
    setEventTitle('');
    setEventDescription('');
    setEventCategory('meeting');
    setEventLocation('Conference Room A');
    setEventMeetingLink('');
    setEventPriority('medium');
  };

  // Create Appointment Handler
  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aptCustomerName) return;

    const num = 'APT-' + new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 8) + '-' + Math.floor(1000 + Math.random() * 9000);
    const newApt: Appointment = {
      id: Date.now(),
      appointment_number: num,
      customer_name: aptCustomerName,
      customer_email: aptCustomerEmail,
      customer_phone: '+1 (555) 000-0000',
      service_name: aptServiceName,
      assigned_employee_name: aptEmployeeName,
      appointment_date: aptDate,
      appointment_time: aptTime,
      duration_minutes: 45,
      location: 'Executive Suite',
      status: 'confirmed',
      payment_status: 'unpaid'
    };

    setAppointments([newApt, ...appointments]);
    setShowNewAppointmentModal(false);
    setAptCustomerName('');
    setAptCustomerEmail('');
  };

  // Month navigation helpers
  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const monthYearLabel = currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Render Category Badge
  const getCategoryBadge = (category: CalendarEvent['category']) => {
    switch (category) {
      case 'meeting':
        return <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium border border-indigo-200">Meeting</span>;
      case 'appointment':
        return <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium border border-emerald-200">Appointment</span>;
      case 'deadline':
        return <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs font-medium border border-amber-200">Deadline</span>;
      case 'workshop':
      case 'training':
        return <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium border border-blue-200">Workshop</span>;
      default:
        return <span className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded text-xs font-medium border border-slate-200">{category}</span>;
    }
  };

  // Render Priority Badge
  const getPriorityBadge = (priority: CalendarEvent['priority']) => {
    switch (priority) {
      case 'urgent':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-semibold">Urgent</span>;
      case 'high':
        return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-semibold">High</span>;
      case 'medium':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-semibold">Medium</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded-full font-semibold">Low</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Advertisement Placement */}
      <AdSuiteWidget userRole="super_admin" currentModule="calendar" />

      {/* Header & Quick Action Bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-900">Calendar & Scheduling Hub</h1>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Manage corporate events, customer appointments, team availability, and automated task reminders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowNewEventModal(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Event
          </button>
          <button
            onClick={() => setShowNewAppointmentModal(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <UserCheck className="w-4 h-4" />
            Book Appointment
          </button>
          <button
            onClick={() => setActiveView('reminders')}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm px-3.5 py-2 rounded-lg transition-colors border border-slate-200"
          >
            <Bell className="w-4 h-4 text-amber-600" />
            Reminders ({reminders.length})
          </button>
        </div>
      </div>

      {/* Operational Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Events</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
              {events.filter(e => e.start_date === new Date().toISOString().split('T')[0]).length}
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Next: Board Strategy Sync (09:30)</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Appointments</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">
              {appointments.filter(a => a.status === 'requested' || a.status === 'pending_approval').length}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Awaiting confirmation</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Confirmed Bookings</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
              {appointments.filter(a => a.status === 'confirmed').length}
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">100% staff allocated</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Reminders</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{reminders.length}</h3>
            <p className="text-xs text-slate-500 mt-1">Payment & meeting alerts</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Bell className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Navigation / Month Control */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1 bg-slate-50">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-colors shadow-none"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-slate-800 px-3 min-w-[120px] text-center">
              {monthYearLabel}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-colors shadow-none"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setCurrentMonthDate(new Date())}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200"
          >
            Today
          </button>
        </div>

        {/* View Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['month', 'week', 'day', 'agenda', 'appointments', 'team', 'reminders'] as const).map(v => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeView === v
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {v === 'appointments' ? 'Appointments' : v === 'team' ? 'Team View' : v}
            </button>
          ))}
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-48">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="meeting">Meetings</option>
            <option value="appointment">Appointments</option>
            <option value="deadline">Deadlines</option>
            <option value="workshop">Workshops</option>
          </select>
        </div>
      </div>

      {/* VIEW: MONTH GRID */}
      {activeView === 'month' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Days of week header */}
          <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200 text-center font-semibold text-xs text-slate-600 py-2.5">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Month grid simulation */}
          <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
            {Array.from({ length: 35 }).map((_, idx) => {
              const dayNum = idx - 2; // Offset for month representation
              const isCurrentMonth = dayNum > 0 && dayNum <= 31;
              const isToday = dayNum === new Date().getDate();
              const dateStr = isCurrentMonth
                ? `${currentMonthDate.getFullYear()}-${String(currentMonthDate.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
                : '';

              const dayEvents = isCurrentMonth ? filteredEvents.filter(e => e.start_date === dateStr) : [];

              return (
                <div
                  key={idx}
                  className={`min-h-[110px] p-2 transition-colors ${
                    !isCurrentMonth ? 'bg-slate-50/50 text-slate-300' : 'bg-white hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ${
                        isToday ? 'bg-indigo-600 text-white' : isCurrentMonth ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      {isCurrentMonth ? dayNum : ''}
                    </span>
                  </div>

                  {/* Day Events */}
                  <div className="mt-2 space-y-1">
                    {dayEvents.map(evt => (
                      <div
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        className="p-1.5 rounded-md text-[11px] font-medium leading-tight cursor-pointer truncate transition-transform hover:scale-[1.02] shadow-2xs border-l-3"
                        style={{
                          backgroundColor: `${evt.color_hex}15`,
                          color: evt.color_hex,
                          borderLeftColor: evt.color_hex
                        }}
                      >
                        <span className="font-bold">{evt.start_time}</span> {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW: AGENDA LIST */}
      {activeView === 'agenda' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-sm">Chronological Event Timeline</h2>
            <span className="text-xs text-slate-500 font-medium">{filteredEvents.length} Schedule Items</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">No events match your current filter query.</div>
            ) : (
              filteredEvents.map(evt => (
                <div key={evt.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{new Date(evt.start_date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-sm font-extrabold text-slate-800">{new Date(evt.start_date).getDate()}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{evt.title}</h3>
                        {getCategoryBadge(evt.category)}
                        {getPriorityBadge(evt.priority)}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{evt.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {evt.start_time} - {evt.end_time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {evt.location}
                        </span>
                        {evt.online_meeting_link && (
                          <a
                            href={evt.online_meeting_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
                          >
                            <Video className="w-3.5 h-3.5" />
                            Join Video Call
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 shrink-0"
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* VIEW: APPOINTMENTS TAB */}
      {activeView === 'appointments' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Customer & Service Appointments</h2>
              <p className="text-xs text-slate-500">Manage online bookings, staff assignments, and client consultations.</p>
            </div>
            <button
              onClick={() => setShowNewAppointmentModal(true)}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase font-semibold">
                  <th className="py-3 px-4">Appointment #</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Assigned Staff</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {appointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">{apt.appointment_number}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{apt.customer_name}</div>
                      <div className="text-[11px] text-slate-500">{apt.customer_email}</div>
                    </td>
                    <td className="py-3 px-4 font-medium">{apt.service_name}</td>
                    <td className="py-3 px-4">{apt.assigned_employee_name}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800">{apt.appointment_date}</div>
                      <div className="text-[11px] text-slate-500">{apt.appointment_time} ({apt.duration_minutes} mins)</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                        apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        apt.status === 'requested' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      {apt.status === 'requested' && (
                        <button
                          onClick={() => {
                            setAppointments(appointments.map(a => a.id === apt.id ? { ...a, status: 'confirmed' } : a));
                          }}
                          className="px-2 py-1 text-[11px] bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded border border-emerald-200 font-semibold"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setAppointments(appointments.filter(a => a.id !== apt.id));
                        }}
                        className="px-2 py-1 text-[11px] bg-red-50 text-red-700 hover:bg-red-100 rounded border border-red-200 font-semibold"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW: REMINDERS TAB */}
      {activeView === 'reminders' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Automated Reminders Engine
            </h2>
            <button className="text-xs text-indigo-600 font-bold hover:underline">
              Configure Push & SMS Gateways
            </button>
          </div>

          <div className="space-y-3">
            {reminders.map(rem => (
              <div key={rem.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{rem.title}</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                      {rem.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{rem.message}</p>
                  <p className="text-[11px] text-slate-400 mt-2">Due Date: {rem.due_date} | Channel: {rem.channel}</p>
                </div>

                <button
                  onClick={() => setReminders(reminders.filter(r => r.id !== rem.id))}
                  className="text-xs text-slate-500 hover:text-red-600 font-semibold"
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW EVENT MODAL */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base">Schedule New Event</h3>
              <button onClick={() => setShowNewEventModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Executive Strategy Meeting"
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={eventCategory}
                    onChange={e => setEventCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="appointment">Appointment</option>
                    <option value="deadline">Deadline</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Priority</label>
                  <select
                    value={eventPriority}
                    onChange={e => setEventPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={eventStartDate}
                    onChange={e => setEventStartDate(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Start Time</label>
                  <input
                    type="time"
                    value={eventStartTime}
                    onChange={e => setEventStartTime(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">End Time</label>
                  <input
                    type="time"
                    value={eventEndTime}
                    onChange={e => setEventEndTime(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location / Meeting Room</label>
                <input
                  type="text"
                  placeholder="e.g., Executive Boardroom B"
                  value={eventLocation}
                  onChange={e => setEventLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Online Meeting Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={eventMeetingLink}
                  onChange={e => setEventMeetingLink(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOOK APPOINTMENT MODAL */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base">Book Customer Appointment</h3>
              <button onClick={() => setShowNewAppointmentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Acme Corp (John Miller)"
                  value={aptCustomerName}
                  onChange={e => setAptCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Customer Email</label>
                <input
                  type="email"
                  placeholder="john@acmecorp.com"
                  value={aptCustomerEmail}
                  onChange={e => setAptCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Service Type</label>
                <input
                  type="text"
                  value={aptServiceName}
                  onChange={e => setAptServiceName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={aptDate}
                    onChange={e => setAptDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time</label>
                  <input
                    type="time"
                    value={aptTime}
                    onChange={e => setAptTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EVENT DETAILS DRAWER */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base">{selectedEvent.title}</h3>
              <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                {getCategoryBadge(selectedEvent.category)}
                {getPriorityBadge(selectedEvent.priority)}
              </div>

              <p className="text-slate-600">{selectedEvent.description}</p>

              <div className="space-y-2 border-t border-b border-slate-100 py-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-800">{selectedEvent.start_date} ({selectedEvent.start_time} - {selectedEvent.end_time})</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{selectedEvent.location}</span>
                </div>

                {selectedEvent.online_meeting_link && (
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-indigo-600" />
                    <a href={selectedEvent.online_meeting_link} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">
                      {selectedEvent.online_meeting_link}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-slate-500">
                <span>Organizer: {selectedEvent.organizer_name}</span>
                <span>{selectedEvent.participants_count} Participants</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
