import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  DollarSign,
  Layers,
  Globe,
  Lock,
  EyeOff,
  Edit,
  Trash2,
  FolderPlus,
  Package,
  FileText,
  Tag,
  Calendar,
  Share2,
  Sparkles,
  Wifi,
  WifiOff,
  RefreshCw,
  HelpCircle,
  BarChart3,
  Check,
  ChevronRight,
  ExternalLink,
  Info,
  ShieldAlert,
  Download,
  AlertTriangle
} from 'lucide-react';

interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  is_active: number;
  service_count?: number;
}

interface ServicePackage {
  id?: number;
  service_id?: number;
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  duration_unit: string;
  duration_value: number;
  max_customers: number;
  max_projects: number;
  max_sessions: number;
  is_popular: boolean;
  features?: { feature_text: string; is_included: boolean }[];
}

interface Service {
  id: number;
  category_id: number;
  category_name?: string;
  category_color?: string;
  name: string;
  short_name?: string;
  reference_code: string;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  visibility: 'public' | 'private' | 'hidden';
  pricing_type: 'fixed' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'annual' | 'negotiable' | 'free' | 'subscription' | 'quotation_required';
  base_price: number;
  currency: string;
  short_description?: string;
  detailed_description?: string;
  color?: string;
  created_at?: string;
  packages?: ServicePackage[];
  tags?: string[];
  availability?: {
    business_days: string[];
    working_hours_start: string;
    working_hours_end: string;
    requires_appointment: boolean;
    delivery_mode: 'online' | 'physical' | 'hybrid';
  };
  seo?: {
    seo_title: string;
    meta_description: string;
    keywords: string;
  };
}

export const ServiceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'categories' | 'packages' | 'directory'>('dashboard');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);

  // Stats State
  const [stats, setStats] = useState({
    total_services: 12,
    active_services: 9,
    inactive_services: 2,
    draft_services: 1,
    archived_services: 0,
    total_categories: 5,
    avg_price: 345.50
  });

  // Services State
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      category_id: 1,
      category_name: 'Technology & Software',
      category_color: '#2563eb',
      name: 'Enterprise Cloud Architecture Consulting',
      short_name: 'Cloud Consult',
      reference_code: 'SRV-TECH-001',
      status: 'active',
      visibility: 'public',
      pricing_type: 'hourly',
      base_price: 150.00,
      currency: 'USD',
      short_description: 'High-availability Kubernetes and AWS deployment architecture and optimization.',
      color: '#2563eb',
      created_at: '2026-07-20',
      tags: ['Cloud', 'AWS', 'Kubernetes', 'DevOps'],
      packages: [
        { name: 'Starter Assessment', description: 'Basic architecture audit', price: 500, discount_percentage: 0, duration_unit: 'week', duration_value: 1, max_customers: 5, max_projects: 1, max_sessions: 2, is_popular: false },
        { name: 'Full Migration Package', description: 'End-to-end cloud migration', price: 2500, discount_percentage: 10, duration_unit: 'month', duration_value: 1, max_customers: 2, max_projects: 5, max_sessions: 10, is_popular: true }
      ]
    },
    {
      id: 2,
      category_id: 2,
      category_name: 'Financial & Accounting',
      category_color: '#059669',
      name: 'Corporate Tax Strategy & Audit Support',
      short_name: 'Tax Audit',
      reference_code: 'SRV-FIN-002',
      status: 'active',
      visibility: 'public',
      pricing_type: 'fixed',
      base_price: 1200.00,
      currency: 'USD',
      short_description: 'Comprehensive tax filing optimization and audit readiness verification.',
      color: '#059669',
      created_at: '2026-07-18',
      tags: ['Tax', 'Accounting', 'Compliance'],
      packages: []
    },
    {
      id: 3,
      category_id: 4,
      category_name: 'Marketing & Creative',
      category_color: '#d97706',
      name: 'Brand Identity & Design System',
      short_name: 'Brand Design',
      reference_code: 'SRV-MKT-003',
      status: 'active',
      visibility: 'public',
      pricing_type: 'subscription',
      base_price: 850.00,
      currency: 'USD',
      short_description: 'Complete brand guidelines, vector logos, and UI design kit.',
      color: '#d97706',
      created_at: '2026-07-15',
      tags: ['Design', 'Branding', 'UI/UX']
    }
  ]);

  // Categories State
  const [categories, setCategories] = useState<ServiceCategory[]>([
    { id: 1, name: 'Technology & Software', slug: 'technology-software', description: 'IT infrastructure, web development, cloud solutions', icon: 'Code', color: '#2563eb', is_active: 1, service_count: 5 },
    { id: 2, name: 'Financial & Accounting', slug: 'financial-accounting', description: 'Audit, tax advisory, bookkeeping, financial forecasting', icon: 'DollarSign', color: '#059669', is_active: 1, service_count: 3 },
    { id: 3, name: 'Consulting & Strategy', slug: 'consulting-strategy', description: 'Management, business expansion, process optimization', icon: 'Briefcase', color: '#7c3aed', is_active: 1, service_count: 2 },
    { id: 4, name: 'Marketing & Creative', slug: 'marketing-creative', description: 'Digital advertising, SEO, brand design, content creation', icon: 'Megaphone', color: '#d97706', is_active: 1, service_count: 2 },
    { id: 5, name: 'Legal & Compliance', slug: 'legal-compliance', description: 'Corporate law, contract drafting, regulatory filing', icon: 'ShieldCheck', color: '#dc2626', is_active: 1, service_count: 0 }
  ]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPricingType, setSelectedPricingType] = useState<string>('all');

  // Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<ServiceCategory> | null>(null);

  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [selectedServiceForPackages, setSelectedServiceForPackages] = useState<Service | null>(null);

  // Handle Online Status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Filtered Services
  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.reference_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.short_description && s.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || s.category_id.toString() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
    const matchesPricing = selectedPricingType === 'all' || s.pricing_type === selectedPricingType;

    return matchesSearch && matchesCategory && matchesStatus && matchesPricing;
  });

  // Save Service Handler
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.name) return;

    if (editingService.id) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...editingService } as Service : s));
    } else {
      const newSrv: Service = {
        id: Date.now(),
        category_id: editingService.category_id || 1,
        category_name: categories.find(c => c.id === (editingService.category_id || 1))?.name || 'General',
        name: editingService.name,
        reference_code: 'SRV-' + Math.floor(1000 + Math.random() * 9000),
        status: editingService.status || 'active',
        visibility: editingService.visibility || 'public',
        pricing_type: editingService.pricing_type || 'fixed',
        base_price: Number(editingService.base_price) || 0,
        currency: editingService.currency || 'USD',
        short_description: editingService.short_description || '',
        detailed_description: editingService.detailed_description || '',
        color: editingService.color || '#2563eb'
      };
      setServices([newSrv, ...services]);
    }

    if (!isOnline) {
      setOfflineQueueCount(prev => prev + 1);
    }

    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // Save Category Handler
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) return;

    if (editingCategory.id) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...editingCategory } as ServiceCategory : c));
    } else {
      const newCat: ServiceCategory = {
        id: Date.now(),
        name: editingCategory.name,
        slug: editingCategory.name.toLowerCase().replace(/\s+/g, '-'),
        description: editingCategory.description || '',
        icon: editingCategory.icon || 'Briefcase',
        color: editingCategory.color || '#2563eb',
        is_active: 1,
        service_count: 0
      };
      setCategories([...categories, newCat]);
    }

    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER BARS & ADVERTISEMENT SPACE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-blue-600" />
            Service Management System
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, price, structure, and analyze unlimited business services across industries.
          </p>
        </div>

        {/* Offline Indicator & Sync */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${isOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {isOnline ? 'Online' : 'Offline Mode'}
            {offlineQueueCount > 0 && (
              <span className="ml-1 bg-amber-500 text-white rounded-full px-2 py-0.5 text-[10px]">
                {offlineQueueCount} queued
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setEditingService({
                name: '',
                category_id: 1,
                status: 'active',
                visibility: 'public',
                pricing_type: 'fixed',
                base_price: 100,
                currency: 'USD'
              });
              setIsServiceModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Service
          </button>
        </div>
      </div>

      {/* SUPER ADMIN ADVERTISEMENT BANNER INTEGRATION */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-amber-500 text-slate-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded">
            ADVERTISEMENT
          </span>
          <p className="text-sm font-medium text-slate-200">
            Boost your service reach with <strong className="text-white">Z-FINANCE Enterprise Growth Suite</strong>
          </p>
        </div>
        <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md transition-colors border border-white/20">
          Super Admin Campaign Space
        </button>
      </div>

      {/* NAV TABS */}
      <div className="flex items-center border-b border-gray-200 space-x-8">
        {[
          { id: 'dashboard', label: 'Service Dashboard', icon: BarChart3 },
          { id: 'services', label: 'All Services', icon: Briefcase },
          { id: 'categories', label: 'Categories', icon: Layers },
          { id: 'packages', label: 'Pricing Packages', icon: Package },
          { id: 'directory', label: 'Public Directory', icon: Globe }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SERVICE DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Services</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total_services}</p>
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> {stats.active_services} Active
                </p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Service Categories</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total_categories}</p>
                <p className="text-xs text-gray-500 mt-1">Across 12 Industries</p>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Layers className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Average Service Price</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${stats.avg_price.toFixed(2)}</p>
                <p className="text-xs text-emerald-600 mt-1">Multiple Pricing Models</p>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Draft & Inactive</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inactive_services + stats.draft_services}</p>
                <p className="text-xs text-amber-600 mt-1">{stats.draft_services} In Draft</p>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* RECENT SERVICES & CATEGORY BREAKDOWN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-semibold text-gray-900">Recent Services</h3>
                <button onClick={() => setActiveTab('services')} className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {services.slice(0, 4).map((srv) => (
                  <div key={srv.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: srv.color || '#2563eb' }}>
                        {srv.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{srv.name}</p>
                        <p className="text-xs text-gray-500">{srv.category_name} • {srv.reference_code}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        ${srv.base_price.toFixed(2)} <span className="text-[10px] text-gray-500 uppercase">/ {srv.pricing_type}</span>
                      </p>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${srv.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {srv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY DISTRIBUTION */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Service Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="font-medium text-gray-700">{cat.name}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">{cat.service_count} services</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALL SERVICES & MANAGEMENT */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* SEARCH & FILTERS */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by service name, reference code, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => <option key={c.id} value={c.id.toString()}>{c.name}</option>)}
                </select>

                <select
                  value={selectedPricingType}
                  onChange={(e) => setSelectedPricingType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Pricing Types</option>
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                  <option value="daily">Daily Rate</option>
                  <option value="monthly">Monthly Rate</option>
                  <option value="subscription">Subscription</option>
                  <option value="negotiable">Negotiable</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                      {service.category_name}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-1 text-base leading-tight">{service.name}</h3>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{service.reference_code}</p>
                  </div>

                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${service.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                    {service.status}
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">{service.short_description || 'No detailed description provided.'}</p>

                {/* PRICING & VISIBILITY */}
                <div className="flex items-center justify-between border-t border-b border-gray-100 py-2 text-xs">
                  <div>
                    <p className="text-gray-400">Pricing Model</p>
                    <p className="font-bold text-gray-900 capitalize">{service.pricing_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Base Price</p>
                    <p className="font-extrabold text-blue-600 text-sm">${service.base_price.toFixed(2)} {service.currency}</p>
                  </div>
                </div>

                {/* TAGS */}
                {service.tags && service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {service.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setSelectedServiceForPackages(service);
                      setActiveTab('packages');
                    }}
                    className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1"
                  >
                    <Package className="w-3.5 h-3.5" />
                    Packages ({service.packages?.length || 0})
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingService(service);
                        setIsServiceModalOpen(true);
                      }}
                      className="p-1.5 hover:bg-gray-100 text-gray-600 rounded transition-colors"
                      title="Edit Service"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setServices(services.filter(s => s.id !== service.id))}
                      className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CATEGORIES MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Service Categories</h2>
            <button
              onClick={() => {
                setEditingCategory({ name: '', description: '', icon: 'Briefcase', color: '#2563eb' });
                setIsCategoryModalOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors"
            >
              <FolderPlus className="w-4 h-4" /> Add Category
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Category Name</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Services</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.name}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-gray-500">{cat.slug}</td>
                    <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate">{cat.description || 'N/A'}</td>
                    <td className="py-3 px-4 font-bold text-gray-700">{cat.service_count || 0}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cat.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                        {cat.is_active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setIsCategoryModalOpen(true);
                          }}
                          className="p-1 hover:bg-gray-100 rounded text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PRICING PACKAGES */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Multi-Tier Service Packages</h2>
              <p className="text-xs text-gray-500">Configure custom pricing packages (e.g., Starter, Pro, Enterprise) per service.</p>
            </div>
            <select
              value={selectedServiceForPackages?.id || services[0]?.id}
              onChange={(e) => {
                const s = services.find(srv => srv.id === Number(e.target.value));
                if (s) setSelectedServiceForPackages(s);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
            >
              {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(selectedServiceForPackages?.packages || []).length === 0 ? (
              <div className="col-span-3 bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center space-y-3">
                <Package className="w-10 h-10 text-gray-400 mx-auto" />
                <p className="text-sm font-medium text-gray-700">No packages created for this service yet.</p>
                <button
                  onClick={() => setIsPackageModalOpen(true)}
                  className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Create First Package
                </button>
              </div>
            ) : (
              selectedServiceForPackages?.packages?.map((pkg, idx) => (
                <div key={idx} className={`bg-white rounded-xl p-6 border shadow-sm relative space-y-4 ${pkg.is_popular ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-gray-200'}`}>
                  {pkg.is_popular && (
                    <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{pkg.name}</h3>
                    <p className="text-xs text-gray-500">{pkg.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-gray-900">${pkg.price}</span>
                    <span className="text-xs text-gray-500">/ {pkg.duration_unit}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-gray-600">
                    <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Max Customers: {pkg.max_customers || 'Unlimited'}</p>
                    <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Max Projects: {pkg.max_projects || 'Unlimited'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: PUBLIC DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-md space-y-2">
            <span className="bg-blue-500/30 text-blue-200 text-xs font-bold uppercase px-2.5 py-1 rounded">Marketplace Ready</span>
            <h2 className="text-2xl font-bold">Public Service Directory</h2>
            <p className="text-sm text-blue-100 max-w-2xl">
              Preview your public directory accessible by clients, customers, and partner organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(s => s.visibility === 'public').map((srv) => (
              <div key={srv.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${srv.color}15`, color: srv.color }}>
                    {srv.category_name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900">{srv.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{srv.short_description}</p>
                <div className="pt-2 flex items-center justify-between text-sm border-t border-gray-100">
                  <span className="font-extrabold text-blue-600">${srv.base_price} {srv.currency}</span>
                  <button className="text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800">
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE/EDIT SERVICE MODAL */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-xl my-8">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
              {editingService?.id ? 'Edit Service' : 'Create New Service'}
            </h2>

            <form onSubmit={handleSaveService} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Service Name *</label>
                  <input
                    type="text"
                    required
                    value={editingService?.name || ''}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category *</label>
                  <select
                    value={editingService?.category_id || 1}
                    onChange={(e) => setEditingService({ ...editingService, category_id: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pricing Model</label>
                  <select
                    value={editingService?.pricing_type || 'fixed'}
                    onChange={(e) => setEditingService({ ...editingService, pricing_type: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="hourly">Hourly Rate</option>
                    <option value="daily">Daily Rate</option>
                    <option value="weekly">Weekly Rate</option>
                    <option value="monthly">Monthly Rate</option>
                    <option value="subscription">Subscription</option>
                    <option value="negotiable">Negotiable</option>
                    <option value="free">Free Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingService?.base_price || 0}
                    onChange={(e) => setEditingService({ ...editingService, base_price: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={editingService?.status || 'active'}
                    onChange={(e) => setEditingService({ ...editingService, status: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingService?.short_description || ''}
                  onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE/EDIT CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
              {editingCategory?.id ? 'Edit Category' : 'Create Category'}
            </h2>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory?.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Color Code</label>
                <input
                  type="color"
                  value={editingCategory?.color || '#2563eb'}
                  onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg p-1"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCategory?.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
