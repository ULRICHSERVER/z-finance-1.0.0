import React, { useState } from 'react';
import {
  Package,
  Boxes,
  Warehouse,
  Wrench,
  QrCode,
  Barcode,
  TrendingDown,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  FileSpreadsheet,
  Layers,
  Building2,
  UserCheck,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoveRight,
  ShieldCheck,
  Eye,
  Printer,
  Download,
  Edit,
  Trash2,
  Megaphone,
  Zap,
  Tag,
  Activity,
  FolderPlus
} from 'lucide-react';

export type InventoryTab = 
  | 'overview'
  | 'products'
  | 'warehouses'
  | 'assets'
  | 'movements'
  | 'maintenance'
  | 'barcodes'
  | 'depreciation';

interface ProductItem {
  id: string;
  code: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  type: 'inventory_item' | 'service_item' | 'asset' | 'equipment' | 'tool' | 'vehicle' | 'consumable' | 'digital_asset';
  warehouse: string;
  location: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
  valuation: 'FIFO' | 'LIFO' | 'WEIGHTED_AVERAGE';
}

interface AssetItem {
  id: string;
  assetNumber: string;
  name: string;
  type: string;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  depreciationMethod: string;
  assignedTo: string;
  department: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs_repair';
  status: 'in_use' | 'available' | 'under_maintenance';
}

interface WarehouseItem {
  id: string;
  code: string;
  name: string;
  city: string;
  capacitySqm: number;
  usedCapacityPct: number;
  locationsCount: number;
  manager: string;
  status: 'active' | 'maintenance';
}

interface MaintenanceTask {
  id: string;
  assetName: string;
  assetNumber: string;
  title: string;
  type: 'preventive' | 'corrective' | 'inspection' | 'calibration';
  dueDate: string;
  technician: string;
  estimatedCost: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
}

export default function InventoryModule() {
  const [activeTab, setActiveTab] = useState<InventoryTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
  const [selectedProductForLabel, setSelectedProductForLabel] = useState<ProductItem | null>(null);

  // Sample Mock Products
  const [products] = useState<ProductItem[]>([
    {
      id: 'PRD-1001',
      code: 'PRD-1001',
      sku: 'SKU-ENT-SERVER-01',
      barcode: '8901234567891',
      name: 'Dell PowerEdge R750 Rack Server',
      category: 'IT Hardware',
      type: 'equipment',
      warehouse: 'Main DC Warehouse (WH-01)',
      location: 'Rack-A4-Shelf2',
      costPrice: 4200.00,
      sellingPrice: 5800.00,
      currentStock: 12,
      minStock: 5,
      maxStock: 50,
      status: 'active',
      valuation: 'FIFO'
    },
    {
      id: 'PRD-1002',
      code: 'PRD-1002',
      sku: 'SKU-CON-PAPER-A4',
      barcode: '8901234567892',
      name: 'Executive Copier Paper A4 (500 sheets)',
      category: 'Office Supplies',
      type: 'consumable',
      warehouse: 'HQ Supply Room (WH-02)',
      location: 'Bin-B12',
      costPrice: 4.50,
      sellingPrice: 7.00,
      currentStock: 4,
      minStock: 25,
      maxStock: 200,
      status: 'low_stock',
      valuation: 'WEIGHTED_AVERAGE'
    },
    {
      id: 'PRD-1003',
      code: 'PRD-1003',
      sku: 'SKU-DIG-ERP-LICENSE',
      barcode: '8901234567893',
      name: 'Z-FINANCE ERP Perpetual Enterprise License',
      category: 'Software Assets',
      type: 'digital_asset',
      warehouse: 'Cloud Repository',
      location: 'S3-Vault-01',
      costPrice: 1500.00,
      sellingPrice: 2499.00,
      currentStock: 99,
      minStock: 10,
      maxStock: 500,
      status: 'active',
      valuation: 'FIFO'
    },
    {
      id: 'PRD-1004',
      code: 'PRD-1004',
      sku: 'SKU-TOOL-FIBER-SPLICER',
      barcode: '8901234567894',
      name: 'Optical Fiber Fusion Splicer Kit',
      category: 'Tools & Field Gear',
      type: 'tool',
      warehouse: 'Field Operations Hub (WH-03)',
      location: 'Locker-08',
      costPrice: 2800.00,
      sellingPrice: 0.00,
      currentStock: 0,
      minStock: 2,
      maxStock: 10,
      status: 'out_of_stock',
      valuation: 'FIFO'
    }
  ]);

  // Sample Assets
  const [assets] = useState<AssetItem[]>([
    {
      id: 'AST-5001',
      assetNumber: 'AST-2026-001',
      name: 'MacBook Pro 16" M3 Max 64GB',
      type: 'IT Equipment',
      purchaseDate: '2025-01-15',
      purchaseCost: 3800.00,
      currentValue: 3100.00,
      depreciationMethod: 'Straight-Line (3 Yrs)',
      assignedTo: 'Alexander Vance (Lead Architect)',
      department: 'Engineering',
      condition: 'excellent',
      status: 'in_use'
    },
    {
      id: 'AST-5002',
      assetNumber: 'AST-2026-002',
      name: 'Corporate Transport Van (Ford Transit)',
      type: 'Vehicle',
      purchaseDate: '2024-06-10',
      purchaseCost: 45000.00,
      currentValue: 34500.00,
      depreciationMethod: 'Declining Balance (20%)',
      assignedTo: 'Logistics Team',
      department: 'Operations',
      condition: 'good',
      status: 'in_use'
    },
    {
      id: 'AST-5003',
      assetNumber: 'AST-2026-003',
      name: 'Precision Laboratory Centrifuge C3',
      type: 'Laboratory Equipment',
      purchaseDate: '2023-11-20',
      purchaseCost: 18500.00,
      currentValue: 12200.00,
      depreciationMethod: 'Straight-Line (5 Yrs)',
      assignedTo: 'R&D Department',
      department: 'Research & Science',
      condition: 'needs_repair',
      status: 'under_maintenance'
    }
  ]);

  // Sample Warehouses
  const [warehouses] = useState<WarehouseItem[]>([
    {
      id: 'WH-01',
      code: 'WH-01',
      name: 'Main Data Center & Server Hub',
      city: 'Frankfurt, DE',
      capacitySqm: 1200,
      usedCapacityPct: 68,
      locationsCount: 48,
      manager: 'Marcus Sterling',
      status: 'active'
    },
    {
      id: 'WH-02',
      code: 'WH-02',
      name: 'HQ Central Supply & Office Depot',
      city: 'London, UK',
      capacitySqm: 450,
      usedCapacityPct: 42,
      locationsCount: 22,
      manager: 'Elena Rostova',
      status: 'active'
    },
    {
      id: 'WH-03',
      code: 'WH-03',
      name: 'Field Operations & Tool Warehouse',
      city: 'Zurich, CH',
      capacitySqm: 800,
      usedCapacityPct: 85,
      locationsCount: 36,
      manager: 'Jan De Vries',
      status: 'active'
    }
  ]);

  // Sample Maintenance Tasks
  const [maintenanceTasks] = useState<MaintenanceTask[]>([
    {
      id: 'MNT-801',
      assetName: 'Precision Laboratory Centrifuge C3',
      assetNumber: 'AST-2026-003',
      title: 'Annual Rotor Balancing & Drive Calibration',
      type: 'calibration',
      dueDate: '2026-07-28',
      technician: 'BioTech Services Ltd',
      estimatedCost: 850.00,
      status: 'scheduled'
    },
    {
      id: 'MNT-802',
      assetName: 'Corporate Transport Van (Ford Transit)',
      assetNumber: 'AST-2026-002',
      title: '15,000 km Brake Pad Replacement & Engine Oil Service',
      type: 'preventive',
      dueDate: '2026-08-05',
      technician: 'Fleet Auto Clinic',
      estimatedCost: 620.00,
      status: 'scheduled'
    }
  ]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-lg shadow-xs">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Inventory, Assets & Resource Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Centralized stock control, multi-warehouse logistics, fixed asset depreciation, and equipment servicing.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddProductModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product / Asset
          </button>
          <button
            onClick={() => setActiveTab('barcodes')}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <QrCode className="w-4 h-4" />
            Print Barcodes
          </button>
        </div>
      </div>

      {/* Super Admin Advertisement Banner Placeholder */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 p-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
          <Megaphone className="w-4 h-4 text-amber-600" />
          <span><strong>Ad Placement:</strong> Upgrade to Z-FINANCE Automated IoT Smart Warehouse Scanners & Wireless Asset Sensors.</span>
        </div>
        <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">Managed by Super Admin</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Inventory Dashboard', icon: Activity },
          { id: 'products', label: 'Products & Catalog', icon: Package },
          { id: 'warehouses', label: 'Warehouses & Locations', icon: Warehouse },
          { id: 'assets', label: 'Fixed Assets & Equipment', icon: Building2 },
          { id: 'movements', label: 'Stock Movements & Adjustments', icon: MoveRight },
          { id: 'maintenance', label: 'Maintenance & Service', icon: Wrench },
          { id: 'barcodes', label: 'Barcode & QR Labels', icon: QrCode },
          { id: 'depreciation', label: 'Depreciation Engine', icon: TrendingDown },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as InventoryTab)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Total Products & Items</span>
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">142</div>
              <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 3,850 Units in stock
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Low Stock / Out of Stock</span>
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">17 Items</div>
              <div className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
                <span>14 Low Stock • 3 Out of Stock</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Total Inventory Value</span>
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">$284,500.00</div>
              <div className="text-[11px] text-slate-500 mt-1">Valuation method: FIFO</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Fixed Assets & Equipment</span>
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">$412,000.00</div>
              <div className="text-[11px] text-purple-600 mt-1">68 Active Assets • 5 Maintenance Due</div>
            </div>
          </div>

          {/* Warehouses Summary Grid */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-blue-600" />
              Active Warehouses Capacity Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {warehouses.map(wh => (
                <div key={wh.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{wh.name}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono font-bold">{wh.code}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{wh.city} • Manager: {wh.manager}</p>

                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span>Capacity Used</span>
                      <span className="font-bold">{wh.usedCapacityPct}% ({wh.capacitySqm} m²)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${wh.usedCapacityPct > 80 ? 'bg-amber-500' : 'bg-blue-600'}`} 
                        style={{ width: `${wh.usedCapacityPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by Name, SKU, Code, or Barcode..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Filter Warehouse:</span>
              <select
                value={selectedWarehouse}
                onChange={e => setSelectedWarehouse(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Warehouses</option>
                <option value="WH-01">Main DC Warehouse</option>
                <option value="WH-02">HQ Supply Room</option>
                <option value="WH-03">Field Hub</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
                  <th className="py-3 px-4">PRODUCT / SKU</th>
                  <th className="py-3 px-4">TYPE & CATEGORY</th>
                  <th className="py-3 px-4">WAREHOUSE / LOCATION</th>
                  <th className="py-3 px-4 text-right">COST PRICE</th>
                  <th className="py-3 px-4 text-right">SELLING PRICE</th>
                  <th className="py-3 px-4 text-center">STOCK LEVEL</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                  <th className="py-3 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">SKU: {p.sku} | Barcode: {p.barcode}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">{p.type}</span>
                      <div className="text-[10px] text-slate-500 mt-0.5">{p.category}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>{p.warehouse}</div>
                      <div className="text-[10px] text-slate-400">{p.location}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">${p.costPrice.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-mono">${p.sellingPrice.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center font-bold">
                      {p.currentStock} <span className="text-[10px] font-normal text-slate-400">/ min {p.minStock}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {p.status === 'active' && <span className="inventory-badge-ok">In Stock</span>}
                      {p.status === 'low_stock' && <span className="inventory-badge-low">Low Stock</span>}
                      {p.status === 'out_of_stock' && <span className="inventory-badge-out">Out of Stock</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedProductForLabel(p);
                          setIsLabelModalOpen(true);
                        }}
                        className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                        title="Generate Barcode / QR Label"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WAREHOUSES */}
      {activeTab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {warehouses.map(wh => (
            <div key={wh.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Warehouse className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{wh.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">{wh.code} • {wh.city}</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="font-semibold">{wh.capacitySqm} m²</span>
                </div>
                <div className="flex justify-between">
                  <span>Manager:</span>
                  <span className="font-semibold">{wh.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aisles & Bins:</span>
                  <span className="font-semibold">{wh.locationsCount} Locations</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button className="w-full py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200">
                  Manage Locations & Shelves
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: ASSETS & EQUIPMENT */}
      {activeTab === 'assets' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="p-4 border-b border-slate-200 font-bold text-sm text-slate-900 flex items-center justify-between">
            <span>Enterprise Fixed Assets & Equipment Register</span>
            <span className="text-xs font-normal text-slate-500">Total Asset Value: $412,000.00</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
                  <th className="py-3 px-4">ASSET # / NAME</th>
                  <th className="py-3 px-4">TYPE & CONDITION</th>
                  <th className="py-3 px-4">PURCHASE DATE</th>
                  <th className="py-3 px-4 text-right">PURCHASE COST</th>
                  <th className="py-3 px-4 text-right">CURRENT VALUE</th>
                  <th className="py-3 px-4">ASSIGNED TO</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {assets.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{a.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{a.assetNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>{a.type}</div>
                      <div className="text-[10px] flex items-center mt-0.5">
                        <span className={`asset-condition-indicator condition-${a.condition}`} />
                        <span className="capitalize text-slate-500">{a.condition.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{a.purchaseDate}</td>
                    <td className="py-3 px-4 text-right font-mono">${a.purchaseCost.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-700 font-bold">${a.currentValue.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div>{a.assignedTo}</div>
                      <div className="text-[10px] text-slate-400">{a.department}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold capitalize">
                        {a.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BARCODE / QR GENERATOR MODAL */}
      {isLabelModalOpen && selectedProductForLabel && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Print Product Tag & QR Label</h3>
              <button onClick={() => setIsLabelModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="barcode-preview-box space-y-2">
              <div className="font-bold text-sm text-slate-900">{selectedProductForLabel.name}</div>
              <div className="text-xs text-slate-500">SKU: {selectedProductForLabel.sku}</div>
              <div className="my-3 flex justify-center">
                <div className="p-3 bg-white border border-slate-200 rounded-lg inline-block">
                  <QrCode className="w-24 h-24 text-slate-900" />
                </div>
              </div>
              <div className="font-mono text-xs text-slate-700 tracking-widest">{selectedProductForLabel.barcode}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsLabelModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Sending barcode label to connected thermal label printer...');
                  setIsLabelModalOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Printer className="w-4 h-4" />
                Print Label
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
