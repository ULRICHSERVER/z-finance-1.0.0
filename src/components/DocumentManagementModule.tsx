import React, { useState, useEffect } from 'react';
import {
  FileText,
  Folder,
  FolderPlus,
  UploadCloud,
  HardDrive,
  Search,
  Filter,
  Trash2,
  Star,
  Clock,
  Share2,
  FileCheck,
  PenTool,
  Lock,
  Unlock,
  ShieldCheck,
  History,
  Eye,
  Download,
  Tag,
  Plus,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Grid,
  List,
  Link as LinkIcon,
  FileCode,
  FileSpreadsheet,
  Image as ImageIcon,
  FileArchive,
  Database,
  AlertTriangle,
  Layers,
  Sparkles,
  Printer
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

export interface DocumentItem {
  id: number;
  title: string;
  file_name: string;
  file_size: number;
  extension: string;
  file_type: string;
  current_version: string;
  library_type: 'private' | 'business' | 'workspace' | 'shared' | 'archive' | 'recycle_bin';
  module_origin: string;
  status: 'draft' | 'under_review' | 'approved' | 'rejected';
  created_at: string;
  updated_at?: string;
  is_favorite: boolean;
  is_pinned?: boolean;
  is_locked?: boolean;
  owner_name: string;
  tags: string[];
  category_name?: string;
  folder_id?: number;
  linked_entity?: {
    module: string;
    name: string;
  };
  signatures?: Array<{
    id: number;
    signer_name: string;
    signer_email: string;
    signature_type: string;
    timestamp: string;
    hash: string;
  }>;
  version_history?: Array<{
    version: string;
    date: string;
    author: string;
    summary: string;
    size: number;
  }>;
  workflow?: {
    id: number;
    name: string;
    current_step: number;
    total_steps: number;
    status: 'pending' | 'approved' | 'rejected';
    approver: string;
  };
}

export interface FolderItem {
  id: number;
  name: string;
  library_type: 'private' | 'business' | 'workspace' | 'shared' | 'archive' | 'recycle_bin';
  color: string;
  item_count: number;
  parent_id?: number;
}

const MOCK_FOLDERS: FolderItem[] = [
  { id: 1, name: 'Financial & Accounting Audit', library_type: 'business', color: '#3b82f6', item_count: 14 },
  { id: 2, name: 'Legal Contracts & Agreements', library_type: 'business', color: '#10b981', item_count: 8 },
  { id: 3, name: 'Project Specifications 2026', library_type: 'workspace', color: '#8b5cf6', item_count: 22 },
  { id: 4, name: 'AdSuite Brand Assets & Media', library_type: 'workspace', color: '#f59e0b', item_count: 31 },
  { id: 5, name: 'Customer Receipts & Statements', library_type: 'shared', color: '#ec4899', item_count: 45 },
  { id: 6, name: 'System DB Backups & Logs', library_type: 'private', color: '#64748b', item_count: 6 }
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 101,
    title: 'Q3 Enterprise Financial Report.pdf',
    file_name: 'q3_report_2026.pdf',
    file_size: 4587520,
    extension: 'pdf',
    file_type: 'PDF Document',
    current_version: '1.2.0',
    library_type: 'business',
    module_origin: 'accounting',
    status: 'approved',
    created_at: '2026-07-20 10:30',
    is_favorite: true,
    is_pinned: true,
    is_locked: false,
    owner_name: 'Sarah Connor',
    tags: ['Financial', 'Q3', 'Audit'],
    category_name: 'Financial Reports',
    folder_id: 1,
    linked_entity: { module: 'Accounting', name: 'General Ledger Q3' },
    signatures: [
      { id: 1, signer_name: 'Sarah Connor', signer_email: 'sarah@zfinance.com', signature_type: 'Draw', timestamp: '2026-07-20 11:00', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
    ],
    version_history: [
      { version: '1.2.0', date: '2026-07-20 10:30', author: 'Sarah Connor', summary: 'Added Q3 tax adjustments', size: 4587520 },
      { version: '1.1.0', date: '2026-07-18 16:20', author: 'Alex Rivera', summary: 'Initial draft calculation', size: 4210000 }
    ],
    workflow: { id: 1, name: 'Executive Audit Approval', current_step: 2, total_steps: 2, status: 'approved', approver: 'Super Administrator' }
  },
  {
    id: 102,
    title: 'Client Master Service Agreement.docx',
    file_name: 'client_msa_v2.docx',
    file_size: 2048000,
    extension: 'docx',
    file_type: 'Word Document',
    current_version: '2.0.0',
    library_type: 'shared',
    module_origin: 'crm',
    status: 'under_review',
    created_at: '2026-07-22 14:15',
    is_favorite: false,
    is_pinned: false,
    is_locked: false,
    owner_name: 'Alex Rivera',
    tags: ['Contract', 'Legal', 'CRM'],
    category_name: 'Legal Contracts',
    folder_id: 2,
    linked_entity: { module: 'CRM Customer', name: 'Acme International' },
    signatures: [],
    version_history: [
      { version: '2.0.0', date: '2026-07-22 14:15', author: 'Alex Rivera', summary: 'Updated liability clauses', size: 2048000 }
    ],
    workflow: { id: 2, name: 'Legal Review Chain', current_step: 1, total_steps: 2, status: 'pending', approver: 'Legal Director' }
  },
  {
    id: 103,
    title: 'Company Brand Guidelines & Logo.png',
    file_name: 'brand_guidelines_2026.png',
    file_size: 8388608,
    extension: 'png',
    file_type: 'Image Asset',
    current_version: '1.0.0',
    library_type: 'workspace',
    module_origin: 'advertisement',
    status: 'approved',
    created_at: '2026-07-24 09:00',
    is_favorite: true,
    is_pinned: true,
    is_locked: false,
    owner_name: 'John Doe',
    tags: ['Branding', 'AdSuite', 'Assets'],
    category_name: 'Digital Assets',
    folder_id: 4,
    linked_entity: { module: 'AdSuite Campaign', name: 'Summer Launch Banner' },
    signatures: [],
    version_history: [
      { version: '1.0.0', date: '2026-07-24 09:00', author: 'John Doe', summary: 'High-res vector kit upload', size: 8388608 }
    ]
  },
  {
    id: 104,
    title: 'Database Infrastructure Backup.sql',
    file_name: 'db_backup_20260725.sql',
    file_size: 15728640,
    extension: 'sql',
    file_type: 'Database Backup',
    current_version: '1.0.0',
    library_type: 'private',
    module_origin: 'storage',
    status: 'approved',
    created_at: '2026-07-25 02:00',
    is_favorite: false,
    is_pinned: false,
    is_locked: true,
    owner_name: 'System Automated',
    tags: ['Backup', 'System', 'Encrypted'],
    category_name: 'Backups',
    folder_id: 6,
    linked_entity: { module: 'Backup System', name: 'Nightly Full DB Snapshot' },
    signatures: []
  }
];

export default function DocumentManagementModule() {
  const [activeTab, setActiveTab] = useState<'all' | 'private' | 'business' | 'workspace' | 'shared' | 'archive' | 'recycle_bin' | 'storage' | 'audit'>('business');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('zfinance_edms_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });
  const [folders, setFolders] = useState<FolderItem[]>(MOCK_FOLDERS);
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSignOpen, setIsSignOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Financial Reports');
  const [uploadLibrary, setUploadLibrary] = useState<'private' | 'business' | 'workspace' | 'shared'>('business');
  const [uploadOrigin, setUploadOrigin] = useState('general');
  const [uploadTags, setUploadTags] = useState('Report, Finance');

  // Digital Signature State
  const [signerName, setSignerName] = useState('John Doe');
  const [signerEmail, setSignerEmail] = useState('admin@zfinance.com');
  const [signatureType, setSignatureType] = useState<'draw' | 'type' | 'image'>('type');
  const [signatureText, setSignatureText] = useState('J. Doe');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('zfinance_edms_documents', JSON.stringify(documents));
  }, [documents]);

  // Quota Metrics
  const totalSpaceBytes = 10737418240; // 10 GB
  const usedSpaceBytes = documents.reduce((acc, doc) => acc + doc.file_size, 0);
  const usagePercentage = Math.min(100, (usedSpaceBytes / totalSpaceBytes) * 100);

  // Filter Documents
  const filteredDocuments = documents.filter((doc) => {
    if (activeTab === 'recycle_bin') return doc.library_type === 'recycle_bin';
    if (doc.library_type === 'recycle_bin') return false;

    if (activeTab !== 'all' && activeTab !== 'storage' && activeTab !== 'audit') {
      if (doc.library_type !== activeTab) return false;
    }

    if (selectedFolder && doc.folder_id !== selectedFolder) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchTags = doc.tags.some(t => t.toLowerCase().includes(q));
      const matchOwner = doc.owner_name.toLowerCase().includes(q);
      if (!matchTitle && !matchTags && !matchOwner) return false;
    }

    if (selectedCategory !== 'all' && doc.category_name !== selectedCategory) return false;
    if (selectedOrigin !== 'all' && doc.module_origin !== selectedOrigin) return false;
    if (selectedStatus !== 'all' && doc.status !== selectedStatus) return false;

    return true;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const newDoc: DocumentItem = {
      id: Date.now(),
      title: uploadTitle + '.pdf',
      file_name: uploadTitle.toLowerCase().replace(/\s+/g, '_') + '.pdf',
      file_size: Math.floor(Math.random() * 5000000) + 1000000,
      extension: 'pdf',
      file_type: 'PDF Document',
      current_version: '1.0.0',
      library_type: uploadLibrary,
      module_origin: uploadOrigin,
      status: 'approved',
      created_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
      is_favorite: false,
      owner_name: 'Current User',
      tags: uploadTags.split(',').map(t => t.trim()),
      category_name: uploadCategory,
      folder_id: selectedFolder || undefined,
      signatures: [],
      version_history: [
        { version: '1.0.0', date: new Date().toISOString().slice(0, 16).replace('T', ' '), author: 'Current User', summary: 'Uploaded file', size: 2000000 }
      ]
    };

    setDocuments([newDoc, ...documents]);
    setIsUploadOpen(false);
    setUploadTitle('');
  };

  const handleApplySignature = () => {
    if (!activeDoc) return;
    const newSig = {
      id: Date.now(),
      signer_name: signerName,
      signer_email: signerEmail,
      signature_type: signatureType,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      hash: 'sha256_' + Math.random().toString(36).substring(2, 15)
    };

    const updated = documents.map(d => {
      if (d.id === activeDoc.id) {
        return {
          ...d,
          signatures: [...(d.signatures || []), newSig]
        };
      }
      return d;
    });

    setDocuments(updated);
    setActiveDoc({ ...activeDoc, signatures: [...(activeDoc.signatures || []), newSig] });
    setIsSignOpen(false);
  };

  const toggleFavorite = (id: number) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, is_favorite: !d.is_favorite } : d));
  };

  const toggleSoftDelete = (id: number) => {
    setDocuments(documents.map(d => {
      if (d.id === id) {
        const nextType = d.library_type === 'recycle_bin' ? 'business' : 'recycle_bin';
        return { ...d, library_type: nextType };
      }
      return d;
    }));
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderFileIcon = (ext: string) => {
    switch (ext.toLowerCase()) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'docx':
      case 'doc': return <FileText className="w-6 h-6 text-blue-500" />;
      case 'xlsx':
      case 'csv': return <FileSpreadsheet className="w-6 h-6 text-emerald-500" />;
      case 'png':
      case 'jpg': return <ImageIcon className="w-6 h-6 text-purple-500" />;
      case 'zip':
      case 'rar': return <FileArchive className="w-6 h-6 text-amber-500" />;
      case 'sql': return <Database className="w-6 h-6 text-cyan-500" />;
      default: return <FileCode className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Advertisement Placement */}
      <AdSuiteWidget userRole="super_admin" currentModule="documents" />

      {/* Main Header & Metrics Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <HardDrive className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Enterprise Document Management (EDMS)</h1>
              <p className="text-sm text-slate-500">
                Central secure repository & version control for all Z-FINANCE documents, signatures, and assets.
              </p>
            </div>
          </div>
        </div>

        {/* Quota Gauge */}
        <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Storage Used ({usagePercentage.toFixed(1)}%)</span>
            <span>{formatBytes(usedSpaceBytes)} / 10 GB</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                usagePercentage > 85 ? 'bg-red-500' : usagePercentage > 60 ? 'bg-amber-500' : 'bg-blue-600'
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>{documents.filter(d => d.library_type !== 'recycle_bin').length} Active Files</span>
            <span className="text-blue-600 font-medium">Backup Health: Optimal</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex-1 lg:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-sm"
          >
            <UploadCloud className="w-4 h-4" />
            Upload File
          </button>
        </div>
      </div>

      {/* Library Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'business', label: 'Business Library', icon: Folder },
          { id: 'workspace', label: 'Workspace Library', icon: Layers },
          { id: 'shared', label: 'Shared Library', icon: Share2 },
          { id: 'private', label: 'Private Library', icon: Lock },
          { id: 'recycle_bin', label: 'Recycle Bin', icon: Trash2 },
          { id: 'storage', label: 'Storage & Backup', icon: HardDrive },
          { id: 'audit', label: 'Audit Trail Logs', icon: History }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main EDMS Workspace layout */}
      {activeTab === 'storage' ? (
        /* Storage & Backup Tab */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-600" />
            Enterprise Storage Allocation & System Backup Manager
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Allocated Space</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">10.00 GB</p>
              <p className="text-xs text-slate-500 mt-2">Enterprise Plan Quota</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Used Storage</span>
              <p className="text-2xl font-extrabold text-blue-600 mt-1">{formatBytes(usedSpaceBytes)}</p>
              <p className="text-xs text-slate-500 mt-2">{documents.length} Total Documents</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Available Free Space</span>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">{formatBytes(totalSpaceBytes - usedSpaceBytes)}</p>
              <p className="text-xs text-slate-500 mt-2">Ready for uploads</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-md font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Automated & Incremental System Backups
            </h3>
            <div className="space-y-3">
              {[
                { type: 'Full Database & EDMS Snapshot', date: '2026-07-25 02:00', size: '15.7 MB', status: 'Completed' },
                { type: 'Incremental File Changes Backup', date: '2026-07-24 02:00', size: '4.2 MB', status: 'Completed' },
                { type: 'Incremental File Changes Backup', date: '2026-07-23 02:00', size: '3.8 MB', status: 'Completed' }
              ].map((b, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-semibold text-slate-900">{b.type}</p>
                      <p className="text-xs text-slate-500">{b.date} • Size: {b.size}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'audit' ? (
        /* Audit Trail Logs Tab */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            Security & Document Audit Trail Logs
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Document</th>
                  <th className="p-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { time: '2026-07-25 03:10', user: 'Sarah Connor', action: 'Digital Signature Applied', doc: 'Q3 Enterprise Financial Report.pdf', ip: '192.168.1.45' },
                  { time: '2026-07-25 02:00', user: 'System Auto', action: 'Incremental Backup', doc: 'Database Backup', ip: '127.0.0.1' },
                  { time: '2026-07-24 16:30', user: 'Alex Rivera', action: 'Version 2.0.0 Created', doc: 'Client Master Service Agreement.docx', ip: '192.168.1.88' },
                  { time: '2026-07-24 09:00', user: 'John Doe', action: 'File Upload', doc: 'Company Brand Guidelines.png', ip: '192.168.1.12' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-500 font-mono text-xs">{row.time}</td>
                    <td className="p-3 font-semibold text-slate-900">{row.user}</td>
                    <td className="p-3 text-blue-600 font-medium">{row.action}</td>
                    <td className="p-3 text-slate-700">{row.doc}</td>
                    <td className="p-3 text-slate-500 font-mono text-xs">{row.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Regular Document Library View */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar: Folder Tree & Categories */}
          <div className="lg:col-span-1 space-y-6">
            {/* Folder Explorer Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-600" />
                  Foldered Repositories
                </h3>
                <button
                  onClick={() => setSelectedFolder(null)}
                  className={`text-xs ${selectedFolder === null ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  All Folders
                </button>
              </div>

              <div className="space-y-1.5">
                {folders.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFolder(selectedFolder === f.id ? null : f.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition ${
                      selectedFolder === f.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Folder className="w-4 h-4 shrink-0" style={{ color: f.color }} />
                      <span className="truncate">{f.name}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-mono text-[10px]">
                      {f.item_count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Module Categories */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                Module Origins
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['all', 'accounting', 'crm', 'advertisement', 'storage', 'projects', 'expenses'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedOrigin(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition ${
                      selectedOrigin === m
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Content Area: Search, Filters, & Document Grid/List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search & Filter Controls */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search title, owner, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-700"
                >
                  <option value="all">All Categories</option>
                  <option value="Financial Reports">Financial Reports</option>
                  <option value="Legal Contracts">Legal Contracts</option>
                  <option value="Digital Assets">Digital Assets</option>
                  <option value="Backups">Backups</option>
                </select>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Document Items Grid or List */}
            {filteredDocuments.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-slate-600 font-medium">No documents found matching the filter criteria.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedOrigin('all'); setSelectedFolder(null); }}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 shrink-0">
                          {renderFileIcon(doc.extension)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{doc.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {formatBytes(doc.file_size)} • SemVer {doc.current_version}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFavorite(doc.id)}
                        className={`p-1.5 rounded-lg transition ${doc.is_favorite ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'}`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-medium rounded-md capitalize">
                        {doc.module_origin}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-medium rounded-md">
                        {doc.category_name}
                      </span>
                      {doc.signatures && doc.signatures.length > 0 && (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md flex items-center gap-1">
                          <PenTool className="w-3 h-3" />
                          Signed
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>Owner: {doc.owner_name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setActiveDoc(doc); setIsPreviewOpen(true); }}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition"
                          title="Preview & Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setActiveDoc(doc); setIsSignOpen(true); }}
                          className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition"
                          title="Digital Sign"
                        >
                          <PenTool className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleSoftDelete(doc.id)}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition"
                          title={doc.library_type === 'recycle_bin' ? 'Restore' : 'Move to Trash'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
                      <th className="p-3">Document Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Version</th>
                      <th className="p-3">Size</th>
                      <th className="p-3">Signatures</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900 flex items-center gap-2.5">
                          {renderFileIcon(doc.extension)}
                          <div>
                            <p className="line-clamp-1">{doc.title}</p>
                            <span className="text-[11px] text-slate-400">{doc.created_at}</span>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600 text-xs">{doc.category_name}</td>
                        <td className="p-3 font-mono text-xs">{doc.current_version}</td>
                        <td className="p-3 text-slate-500 text-xs">{formatBytes(doc.file_size)}</td>
                        <td className="p-3">
                          {doc.signatures && doc.signatures.length > 0 ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                              Signed ({doc.signatures.length})
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">Unsigned</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => { setActiveDoc(doc); setIsPreviewOpen(true); }}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setActiveDoc(doc); setIsSignOpen(true); }}
                              className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition"
                            >
                              <PenTool className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-600" />
                Upload New Document
              </h3>
              <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Audited Balance Sheet"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Library</label>
                  <select
                    value={uploadLibrary}
                    onChange={(e) => setUploadLibrary(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    <option value="business">Business Library</option>
                    <option value="workspace">Workspace Library</option>
                    <option value="shared">Shared Library</option>
                    <option value="private">Private Library</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    <option value="Financial Reports">Financial Reports</option>
                    <option value="Legal Contracts">Legal Contracts</option>
                    <option value="Digital Assets">Digital Assets</option>
                    <option value="Backups">Backups</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Audit, Q3, Verified"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="border-2 dashed border-blue-200 bg-blue-50/50 rounded-xl p-6 text-center space-y-2">
                <UploadCloud className="w-8 h-8 text-blue-500 mx-auto" />
                <p className="text-xs text-slate-600 font-medium">
                  Drag & Drop file here or click to select
                </p>
                <p className="text-[10px] text-slate-400">PDF, DOCX, XLSX, PNG, SQL up to 100MB</p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl font-semibold shadow-xs"
                >
                  Upload & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview & Details Reader Modal */}
      {isPreviewOpen && activeDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                {renderFileIcon(activeDoc.extension)}
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{activeDoc.title}</h3>
                  <p className="text-xs text-slate-400">SemVer {activeDoc.current_version} • {formatBytes(activeDoc.file_size)}</p>
                </div>
              </div>
              <button onClick={() => setIsPreviewOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Reader Canvas */}
            <div className="bg-slate-900 rounded-xl p-8 text-slate-200 font-mono text-xs space-y-3 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>[PREVIEW MODE: {activeDoc.file_type.toUpperCase()}]</span>
                <span>CHECKSUM: {activeDoc.id * 8847291}</span>
              </div>
              <p className="text-emerald-400">// Z-FINANCE EDMS Encrypted Storage Stream</p>
              <p>Title: {activeDoc.title}</p>
              <p>Module Origin: {activeDoc.module_origin}</p>
              <p>Status: {activeDoc.status.toUpperCase()}</p>
              {activeDoc.linked_entity && (
                <p className="text-blue-400">Linked Entity: {activeDoc.linked_entity.module} &gt; {activeDoc.linked_entity.name}</p>
              )}
            </div>

            {/* Signatures List */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-emerald-600" />
                Applied Digital Signatures
              </h4>
              {activeDoc.signatures && activeDoc.signatures.length > 0 ? (
                <div className="space-y-2">
                  {activeDoc.signatures.map((sig) => (
                    <div key={sig.id} className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-emerald-900">{sig.signer_name} ({sig.signer_email})</p>
                        <p className="text-[10px] text-emerald-700">Timestamp: {sig.timestamp} • Hash: {sig.hash.slice(0, 16)}...</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 font-bold rounded-full text-[10px]">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No digital signatures applied yet.</p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Signature Pad Modal */}
      {isSignOpen && activeDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <PenTool className="w-5 h-5 text-emerald-600" />
                Apply Digital Signature
              </h3>
              <button onClick={() => setIsSignOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Signer Name</label>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Signer Email</label>
                <input
                  type="email"
                  value={signerEmail}
                  onChange={(e) => setSignerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="p-4 bg-slate-50 border-2 border-dashed border-emerald-300 rounded-xl text-center space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Signature Canvas</span>
                <p className="font-serif italic text-2xl text-slate-800">{signerName}</p>
                <p className="text-[10px] text-emerald-600 font-mono">SHA-256 Stamp Ready</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsSignOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleApplySignature}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
              >
                <PenTool className="w-4 h-4" />
                Sign Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
