import React, { useState } from 'react';
import { 
  MessageSquare, Bell, Mail, Phone, Megaphone, Send, Paperclip, Search, 
  Filter, Check, CheckCheck, User, Users, Shield, ShieldAlert, Zap, 
  Settings, Clock, Sparkles, AlertTriangle, Plus, Eye, Download, FileText, 
  Building, Radio, RefreshCw, BarChart2, CheckCircle2, Server, Globe
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface Conversation {
  id: number;
  title: string;
  type: 'direct' | 'group' | 'project' | 'customer' | 'supplier' | 'announcement';
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  avatarBg: string;
}

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  text: string;
  time: string;
  isSelf: boolean;
  type: 'text' | 'image' | 'document';
  attachmentName?: string;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  category: 'system' | 'financial' | 'project' | 'customer' | 'supplier' | 'security';
  time: string;
  isRead: boolean;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'global' | 'emergency' | 'maintenance' | 'business';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdBy: string;
  date: string;
}

export default function CommunicationCenterModule() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'notifications' | 'announcements' | 'email_sms_queue' | 'settings'>('dashboard');

  // Conversations State
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, title: 'Alexander Vance (IT Director)', type: 'direct', lastMessage: 'Cloud Server Migration completed successfully.', lastTime: '10:42 AM', unreadCount: 2, avatarBg: 'bg-indigo-600' },
    { id: 2, title: 'Project: Enterprise SaaS Cloud', type: 'project', lastMessage: 'Sarah Jenkins: Updated milestone deliverable #3', lastTime: '09:15 AM', unreadCount: 0, avatarBg: 'bg-emerald-600' },
    { id: 3, title: 'Acme Enterprise Global (Client)', type: 'customer', lastMessage: 'Invoice #INV-2026-089 has been received', lastTime: 'Yesterday', unreadCount: 1, avatarBg: 'bg-amber-600' },
    { id: 4, title: 'Logistics Supply Partner (Supplier)', type: 'supplier', lastMessage: 'Purchase order #PO-882 confirmed delivery', lastTime: 'Jul 21', unreadCount: 0, avatarBg: 'bg-blue-600' }
  ]);

  const [selectedConvId, setSelectedConvId] = useState<number>(1);
  const [newMessageText, setNewMessageText] = useState('');

  // Sample Messages for active conversation
  const [messages, setMessages] = useState<Message[]>([
    { id: 101, senderId: 2, senderName: 'Alexander Vance', text: 'Hello! I have reviewed the budget allocation for the SaaS migration.', time: '10:30 AM', isSelf: false, type: 'text' },
    { id: 102, senderId: 1, senderName: 'You (Admin)', text: 'Great! Are there any direct cost overruns expected for Q3?', time: '10:35 AM', isSelf: true, type: 'text' },
    { id: 103, senderId: 2, senderName: 'Alexander Vance', text: 'No, all hardware procurement stays within the $45,000 budget.', time: '10:40 AM', isSelf: false, type: 'text' },
    { id: 104, senderId: 2, senderName: 'Alexander Vance', text: 'Cloud Server Migration completed successfully.', time: '10:42 AM', isSelf: false, type: 'text' }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: 'Invoice Payment Received', message: '$12,500.00 cleared for Invoice #INV-2026-089 (Acme Corp)', category: 'financial', time: '10 mins ago', isRead: false },
    { id: 2, title: 'New Task Assignment', message: 'You were assigned to "Database Schema Optimization"', category: 'project', time: '1 hour ago', isRead: false },
    { id: 3, title: 'Security Alert: New Device Login', message: 'Admin login detected from IP 192.168.1.102', category: 'security', time: '3 hours ago', isRead: true },
    { id: 4, title: 'Supplier Contract Reminder', message: 'Logistics SLA renewal due in 7 days', category: 'supplier', time: 'Yesterday', isRead: true }
  ]);

  // Announcements State
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: 'Scheduled Database Maintenance - Sunday 02:00 AM UTC', content: 'Z-FINANCE servers will undergo scheduled database maintenance and indexing. Expected downtime: 15 minutes.', type: 'maintenance', priority: 'high', createdBy: 'Super Administrator', date: '2026-07-23' },
    { id: 2, title: 'Q3 Financial Auditing Compliance Guidelines', content: 'All project managers must submit actual cost receipts before Friday 5:00 PM for tax reporting.', type: 'global', priority: 'medium', createdBy: 'Finance Controller', date: '2026-07-20' }
  ]);

  // Modal State for New Announcement
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annType, setAnnType] = useState<'global' | 'emergency' | 'maintenance' | 'business'>('global');
  const [annPriority, setAnnPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      senderId: 1,
      senderName: 'You (Admin)',
      text: newMessageText,
      time: 'Just now',
      isSelf: true,
      type: 'text'
    };

    setMessages([...messages, newMsg]);
    setNewMessageText('');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    const newAnn: Announcement = {
      id: Date.now(),
      title: annTitle,
      content: annContent,
      type: annType,
      priority: annPriority,
      createdBy: 'Super Administrator',
      date: new Date().toISOString().split('T')[0]
    };

    setAnnouncements([newAnn, ...announcements]);
    setShowAnnouncementModal(false);
    setAnnTitle('');
    setAnnContent('');
  };

  const activeConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Communication & Notification Center</h1>
            <p className="text-xs text-slate-500">Internal Chat, CRM Messages, Supplier Portal, Email/SMS Queues, Broadcasts & Alerts</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAnnouncementModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition shadow-sm"
          >
            <Megaphone className="w-4 h-4" />
            New Broadcast
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'messages' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Messaging Hub
          <span className="px-1.5 py-0.5 text-[10px] bg-rose-500 text-white rounded-full font-bold">3</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'notifications' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          Notification Center
          <span className="px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded-full font-bold">2</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'announcements' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          Global Announcements
        </button>

        <button
          onClick={() => setActiveTab('email_sms_queue')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'email_sms_queue' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          Email & SMS Queue
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'settings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          Provider Settings
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <AdSuiteWidget slotName="Communication Dashboard Top" location="communication_dashboard" />

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Unread Messages</div>
              <div className="text-2xl font-bold text-slate-900">3</div>
              <div className="text-xs text-indigo-600 font-medium mt-1">Across 4 Conversations</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">In-App Notifications</div>
              <div className="text-2xl font-bold text-amber-600">2 Pending</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Financial & Security</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Email Queue Sent</div>
              <div className="text-2xl font-bold text-emerald-600">1,420</div>
              <div className="text-xs text-emerald-700 font-medium mt-1">99.8% SMTP Success</div>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl shadow-md">
              <div className="text-xs font-semibold uppercase text-indigo-200 mb-1">SMS & WhatsApp Gateway</div>
              <div className="text-2xl font-bold">Active</div>
              <div className="text-xs text-indigo-300 font-medium mt-1">MTN, Orange & Twilio Ready</div>
            </div>
          </div>

          {/* Recent Broadcasts & System Notices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-indigo-600" />
                Active Global Broadcasts
              </h3>

              <div className="space-y-3">
                {announcements.map(ann => (
                  <div key={ann.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 text-xs">{ann.title}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-100 text-indigo-800">
                        {ann.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{ann.content}</p>
                    <div className="text-[10px] text-slate-400 pt-1">By {ann.createdBy} on {ann.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                Unread System Notifications
              </h3>

              <div className="space-y-3">
                {notifications.filter(n => !n.isRead).map(n => (
                  <div key={n.id} className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{n.title}</div>
                      <div className="text-xs text-slate-600">{n.message}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGING HUB TAB */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
          {/* Conversation List Sidebar */}
          <div className="border-r border-slate-200 p-4 space-y-4 bg-slate-50">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Conversations</h3>
              <button className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {conversations.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => setSelectedConvId(c.id)}
                  className={`p-3 rounded-xl cursor-pointer transition flex items-center gap-3 border ${
                    selectedConvId === c.id ? 'bg-white border-indigo-300 shadow-sm' : 'border-transparent hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full ${c.avatarBg} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                    {c.title.substring(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold text-slate-900 text-xs truncate">{c.title}</span>
                      <span className="text-[10px] text-slate-400">{c.lastTime}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{c.lastMessage}</p>
                  </div>

                  {c.unreadCount > 0 && (
                    <span className="w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {c.unreadCount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Feed */}
          <div className="md:col-span-2 flex flex-col justify-between bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{activeConv.title}</h4>
                <div className="text-[10px] text-slate-500 uppercase font-mono">{activeConv.type} conversation • Encrypted</div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-3 overflow-y-auto max-h-[380px]">
              {messages.map(m => (
                <div key={m.id} className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}>
                  <div className="text-[10px] text-slate-400 mb-1">{m.senderName} • {m.time}</div>
                  <div className={`p-3 rounded-2xl max-w-sm text-xs ${
                    m.isSelf ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex items-center gap-2 bg-slate-50">
              <button type="button" className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg">
                <Paperclip className="w-4 h-4" />
              </button>
              <input 
                type="text" 
                placeholder="Type your message..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 p-2 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
              <button type="submit" className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NOTIFICATION CENTER TAB */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Notifications Log & Alert Center</h2>

          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-200 text-slate-700">
                      {n.category}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{n.title}</span>
                  </div>
                  <p className="text-xs text-slate-600">{n.message}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">{n.time}</div>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline">Mark Read</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANNOUNCEMENTS TAB */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">Broadcasts & System Announcements</h2>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="px-3.5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              + Create Announcement
            </button>
          </div>

          <div className="space-y-4">
            {announcements.map(ann => (
              <div key={ann.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{ann.title}</span>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-amber-100 text-amber-800">
                    {ann.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{ann.content}</p>
                <div className="text-xs text-slate-400 font-mono pt-2">Published by {ann.createdBy} • {ann.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMAIL & SMS QUEUE TAB */}
      {activeTab === 'email_sms_queue' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900">Outgoing Email & SMS Queue Monitor</h2>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-slate-800">Invoice Alert: #INV-2026-089</div>
                <div className="text-slate-500">To: client@acme-global.com • Channel: Email SMTP</div>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-800">
                SENT SUCCESS
              </span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-slate-800">Security Verification Code</div>
                <div className="text-slate-500">To: +237690000000 • Channel: MTN SMS Gateway</div>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-800">
                SENT SUCCESS
              </span>
            </div>
          </div>
        </div>
      )}

      {/* PROVIDER SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900">Communication Provider & Gateway Configuration</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 border border-slate-200 rounded-xl space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                SMTP Email Gateway
              </h3>
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">SMTP Host</label>
                <input type="text" defaultValue="smtp.mailgun.org" className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Port</label>
                <input type="number" defaultValue="587" className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none" />
              </div>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                SMS & WhatsApp Integration
              </h3>
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">SMS Provider</label>
                <select className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none">
                  <option value="MTN">MTN SMS Cameroon API</option>
                  <option value="Orange">Orange SMS Gateway</option>
                  <option value="Twilio">Twilio Global SMS</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="wa" defaultChecked className="rounded" />
                <label htmlFor="wa" className="font-semibold text-slate-700">Enable WhatsApp Business Cloud API</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW ANNOUNCEMENT MODAL */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Create Global Announcement</h3>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  placeholder="e.g. Scheduled System Maintenance"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Announcement Content</label>
                <textarea 
                  required
                  rows={3}
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  placeholder="Enter broadcast details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select 
                    value={annType}
                    onChange={(e: any) => setAnnType(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    <option value="global">Global Notice</option>
                    <option value="emergency">Emergency Alert</option>
                    <option value="maintenance">Maintenance Notice</option>
                    <option value="business">Business Update</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select 
                    value={annPriority}
                    onChange={(e: any) => setAnnPriority(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
