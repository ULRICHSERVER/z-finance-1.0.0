import React, { useState } from 'react';
import {
  ShoppingCart,
  Store,
  CreditCard,
  DollarSign,
  QrCode,
  Printer,
  Package,
  Truck,
  RotateCcw,
  Tag,
  Users,
  Grid,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Clock,
  BarChart2,
  Smartphone,
  Shield,
  Percent,
  Calendar,
  Layers,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface POSItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

interface CartItem extends POSItem {
  quantity: number;
}

interface Order {
  id: string;
  saleNumber: string;
  type: 'pos' | 'online' | 'marketplace';
  customer: string;
  itemsCount: number;
  total: number;
  paymentMethod: string;
  status: 'completed' | 'processing' | 'refunded';
  time: string;
}

export default function POSModule() {
  const [activeTab, setActiveTab] = useState<
    'terminal' | 'dashboard' | 'register' | 'multistore' | 'ecommerce' | 'bookings' | 'orders' | 'delivery' | 'returns' | 'promotions' | 'marketplace'
  >('terminal');

  // Sample catalog
  const catalog: POSItem[] = [
    { id: '1', name: 'Industrial Automation Controller v4', sku: 'SKU-AC40', price: 1250.00, category: 'Hardware', stock: 45 },
    { id: '2', name: 'Z-FINANCE Thermal Printer Paper (Pack 10)', sku: 'SKU-TP10', price: 25.00, category: 'Supplies', stock: 200 },
    { id: '3', name: 'Barcode Scanner Handheld Wireless', sku: 'SKU-BS01', price: 180.00, category: 'Hardware', stock: 18 },
    { id: '4', name: 'On-Site System Integration Service (Hourly)', sku: 'SKU-SRV1', price: 150.00, category: 'Services', stock: 999 },
    { id: '5', name: 'Enterprise Router Gateway 10G', sku: 'SKU-RG10', price: 890.00, category: 'Networking', stock: 12 },
    { id: '6', name: 'Biometric Attendance Kiosk Terminal', sku: 'SKU-BK02', price: 650.00, category: 'Hardware', stock: 8 }
  ];

  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: 'Industrial Automation Controller v4', sku: 'SKU-AC40', price: 1250.00, category: 'Hardware', stock: 45, quantity: 1 },
    { id: '2', name: 'Z-FINANCE Thermal Printer Paper (Pack 10)', sku: 'SKU-TP10', price: 25.00, category: 'Supplies', stock: 200, quantity: 2 }
  ]);

  const [recentSales, setRecentSales] = useState<Order[]>([
    { id: '1', saleNumber: 'POS-884910', type: 'pos', customer: 'Walk-In Customer', itemsCount: 3, total: 1300.00, paymentMethod: 'Cash', status: 'completed', time: '10:14 AM' },
    { id: '2', saleNumber: 'ORD-900112', type: 'online', customer: 'TechCorp Berlin', itemsCount: 1, total: 890.00, paymentMethod: 'Card (Stripe)', status: 'processing', time: '09:45 AM' },
    { id: '3', saleNumber: 'MP-551029', type: 'marketplace', customer: 'Muller GmbH', itemsCount: 2, total: 360.00, paymentMethod: 'MTN Mobile Money', status: 'completed', time: '08:30 AM' }
  ]);

  const [searchFilter, setSearchFilter] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'card' | 'mobile_money'>('cash');
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  // Cart operations
  const addToCart = (item: POSItem) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((c) => {
          if (c.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const subtotal = cart.reduce((acc, c) => acc + c.price * c.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = (subtotal - discountAmount) * 0.19; // 19% VAT
  const totalAmount = subtotal - discountAmount + taxAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newSale: Order = {
      id: Date.now().toString(),
      saleNumber: `POS-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'pos',
      customer: 'Walk-In Customer',
      itemsCount: cart.reduce((acc, c) => acc + c.quantity, 0),
      total: totalAmount,
      paymentMethod: selectedPaymentMethod.toUpperCase(),
      status: 'completed',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setRecentSales([newSale, ...recentSales]);
    setCart([]);
    setShowCheckoutSuccess(true);
    setTimeout(() => setShowCheckoutSuccess(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Unified Commerce & POS Suite</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">
              Z-FINANCE 1.0.0
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Omnichannel Point of Sale, Multi-Store, eCommerce, Delivery Fleet & Multi-Vendor Marketplace
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Register #01 (Main Store) - Open
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'terminal', label: 'POS Terminal', icon: ShoppingCart },
          { id: 'dashboard', label: 'POS Dashboard', icon: BarChart2 },
          { id: 'register', label: 'Cash Register', icon: DollarSign },
          { id: 'multistore', label: 'Multi-Store', icon: Store },
          { id: 'ecommerce', label: 'eCommerce Store', icon: Package },
          { id: 'bookings', label: 'Service Bookings', icon: Calendar },
          { id: 'orders', label: 'Omnichannel Orders', icon: Grid },
          { id: 'delivery', label: 'Delivery Fleet', icon: Truck },
          { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
          { id: 'promotions', label: 'Promotions', icon: Tag },
          { id: 'marketplace', label: 'Multi-Vendor Marketplace', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: POS TERMINAL */}
      {activeTab === 'terminal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Catalog Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Scan barcode or search products/services..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full text-sm border-none focus:outline-none bg-transparent"
              />
              <QrCode className="w-5 h-5 text-blue-600 cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {catalog
                .filter((item) => item.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.sku.toLowerCase().includes(searchFilter.toLowerCase()))
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{item.sku}</span>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{item.name}</h4>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="font-extrabold text-blue-600 text-sm">€{item.price.toFixed(2)}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{item.stock} left</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Cart & Checkout (5 cols) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  Current Checkout Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h3>
                <button onClick={() => setCart([])} className="text-xs text-rose-600 font-semibold hover:underline">
                  Clear
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">Cart is currently empty. Click or scan products to add.</div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((c) => (
                    <div key={c.id} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-100">
                      <div className="flex-1 pr-2">
                        <p className="font-bold text-slate-900 text-sm leading-tight">{c.name}</p>
                        <p className="text-xs text-slate-500">€{c.price.toFixed(2)} each</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(c.id, -1)} className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-slate-700 hover:bg-slate-300">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm w-5 text-center">{c.quantity}</span>
                        <button onClick={() => updateQuantity(c.id, 1)} className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-slate-700 hover:bg-slate-300">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeFromCart(c.id)} className="text-slate-400 hover:text-rose-600 ml-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculations & Payment Methods */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT (19%)</span>
                  <span>€{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-slate-900 text-base pt-1 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-blue-600">€{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Type Selection */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { id: 'cash', label: 'Cash', icon: DollarSign },
                  { id: 'card', label: 'Card / Terminal', icon: CreditCard },
                  { id: 'mobile_money', label: 'Mobile Money', icon: Smartphone }
                ].map((pay) => {
                  const Icon = pay.icon;
                  const isSelected = selectedPaymentMethod === pay.id;
                  return (
                    <button
                      key={pay.id}
                      onClick={() => setSelectedPaymentMethod(pay.id as any)}
                      className={`py-2 px-2 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {pay.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-bold text-base shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Complete Sale & Print Receipt
              </button>

              {showCheckoutSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold text-center animate-fade-in">
                  ✓ Sale completed! Receipt printed and Inventory updated.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POS DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase">Today's POS Sales</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">€18,450.00</p>
              <span className="text-xs text-emerald-600 font-medium">42 Transactions</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase">Cash Sales</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">€8,200.00</p>
              <span className="text-xs text-slate-500">In Cash Drawer</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase">Card / Digital Sales</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">€6,450.00</p>
              <span className="text-xs text-blue-600 font-medium">Stripe / Terminal</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase">Mobile Money Sales</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">€3,800.00</p>
              <span className="text-xs text-amber-600 font-medium">MTN / Orange Money</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Recent Omnichannel Completed Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-600">
                  <tr>
                    <th className="py-3 px-4">Sale #</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentSales.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{s.saleNumber}</td>
                      <td className="py-3 px-4 uppercase text-xs font-bold text-slate-500">{s.type}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{s.customer}</td>
                      <td className="py-3 px-4 text-slate-600">{s.itemsCount} items</td>
                      <td className="py-3 px-4 font-bold text-slate-900">€{s.total.toFixed(2)}</td>
                      <td className="py-3 px-4 text-slate-700 text-xs font-medium">{s.paymentMethod}</td>
                      <td className="py-3 px-4 text-right text-slate-500 text-xs">{s.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* OTHER TABS PLACEHOLDERS */}
      {activeTab === 'register' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Cash Register & Shift Reconciliation
          </h2>
          <p className="text-sm text-slate-500">Opening balance: €500.00 | Current drawer cash: €8,700.00 | Expected vs Actual cash count.</p>
        </div>
      )}

      {activeTab === 'multistore' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-blue-600" />
            Multi-Store & Branch Network
          </h2>
          <p className="text-sm text-slate-500">Manage Berlin Main Flagship, Munich Branch, Frankfurt Hub, and inter-store stock transfers.</p>
        </div>
      )}

      {activeTab === 'ecommerce' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-600" />
            Online Store Catalog & Cart
          </h2>
          <p className="text-sm text-slate-500">Web storefront integration with live product availability, promotions, and guest checkout.</p>
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Multi-Vendor Marketplace Hub
          </h2>
          <p className="text-sm text-slate-500">Vendor product listings, 15% platform commission rules, and automated seller payouts.</p>
        </div>
      )}
    </div>
  );
}
