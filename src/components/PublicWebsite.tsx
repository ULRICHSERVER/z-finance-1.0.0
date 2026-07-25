import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Moon, 
  Sun, 
  Download, 
  Lock, 
  UserPlus, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Database, 
  FileText, 
  Smartphone, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  HelpCircle, 
  Layers, 
  TrendingUp, 
  AlertCircle, 
  RefreshCw, 
  WifiOff, 
  Code, 
  Sparkles,
  ExternalLink,
  Tag,
  BookOpen,
  Share2,
  Megaphone,
  X
} from 'lucide-react';

export type PublicPage = 
  | 'home'
  | 'about'
  | 'features'
  | 'solutions'
  | 'pricing'
  | 'faq'
  | 'blog'
  | 'documentation'
  | 'download'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'page404'
  | 'page500'
  | 'maintenance'
  | 'offline';

export type Language = 'en' | 'fr';
export type ThemeMode = 'dark' | 'light';

export const PublicWebsite: React.FC = () => {
  const [activePage, setActivePage] = useState<PublicPage>('home');
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [showSeoInspector, setShowSeoInspector] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');
  const [showPwaInstallModal, setShowPwaInstallModal] = useState<boolean>(false);
  const [pwaInstalled, setPwaInstalled] = useState<boolean>(false);
  const [showAdZones, setShowAdZones] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState<boolean>(false);

  // Translations
  const t = {
    en: {
      home: 'Home',
      about: 'About Us',
      features: 'Features',
      solutions: 'Solutions',
      pricing: 'Pricing',
      faq: 'FAQ',
      blog: 'Blog',
      docs: 'Docs',
      download: 'Download',
      contact: 'Contact',
      signin: 'Sign In',
      register: 'Register Free',
      installApp: 'Install App (PWA)',
      heroTitle: 'Enterprise Financial Control Without Limits',
      heroSubtitle: 'Unify your income, expenses, customer billings, and multi-currency ledgers in one secure, high-performance platform. Works 100% offline with zero cloud lock-in.',
      getStarted: 'Get Started Free',
      exploreFeatures: 'Explore Features',
      statsVolume: '$50M+',
      statsVolumeLabel: 'Processed Volume',
      statsOffline: '100%',
      statsOfflineLabel: 'Offline-Ready PWA',
      statsCurrencies: '5+',
      statsCurrenciesLabel: 'Native Currencies',
      statsUptime: '99.99%',
      statsUptimeLabel: 'Uptime Reliability',
      seoInspector: 'SEO & Schema.org Inspector',
      adZoneToggle: 'Toggle Ad Zones'
    },
    fr: {
      home: 'Accueil',
      about: 'À Propos',
      features: 'Fonctionnalités',
      solutions: 'Solutions',
      pricing: 'Tarification',
      faq: 'FAQ',
      blog: 'Blog',
      docs: 'Docs',
      download: 'Télécharger',
      contact: 'Contact',
      signin: 'Connexion',
      register: 'S\'inscrire',
      installApp: 'Installer l\'App',
      heroTitle: 'Contrôle Financier d\'Entreprise Sans Limites',
      heroSubtitle: 'Unifiez vos revenus, dépenses, factures clients et livres multi-devises dans une plateforme sécurisée et ultra-performante. Fonctionne 100% hors ligne.',
      getStarted: 'Commencer Gratuitement',
      exploreFeatures: 'Explorer les Fonctions',
      statsVolume: '50M+$',
      statsVolumeLabel: 'Volume Traité',
      statsOffline: '100%',
      statsOfflineLabel: 'PWA Hors Ligne',
      statsCurrencies: '5+',
      statsCurrenciesLabel: 'Devises Natures',
      statsUptime: '99.99%',
      statsUptimeLabel: 'Fiabilité Système',
      seoInspector: 'Inspecteur SEO & Schema.org',
      adZoneToggle: 'Zones Pubs'
    }
  }[lang];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* TOP SYSTEM TOOLBAR */}
      <div className="bg-indigo-950 text-indigo-200 text-xs px-4 py-2 flex flex-wrap items-center justify-between border-b border-indigo-900/50">
        <div className="flex items-center space-x-3">
          <span className="bg-indigo-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">PUBLIC WEBSITE MODE</span>
          <span className="hidden sm:inline text-indigo-300">Z-FINANCE 1.0.0 Production Portal</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowAdZones(!showAdZones)} 
            className={`px-2 py-0.5 rounded font-bold transition-colors ${showAdZones ? 'bg-amber-500 text-slate-950' : 'bg-indigo-900 text-indigo-200'}`}
          >
            <Megaphone className="w-3 h-3 inline me-1" />
            {t.adZoneToggle}
          </button>
          <button 
            onClick={() => setShowSeoInspector(!showSeoInspector)} 
            className="bg-indigo-900 hover:bg-indigo-800 text-indigo-200 px-2 py-0.5 rounded font-bold"
          >
            <Code className="w-3 h-3 inline me-1" />
            {t.seoInspector}
          </button>
        </div>
      </div>

      {/* ADVERTISEMENT ZONE: HEADER */}
      {showAdZones && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-xs p-2 text-center font-bold">
          📢 ADVERTISEMENT ZONE [HEADER]: Sponsor Banner — Upgrade to Z-FINANCE Pro Enterprise Server Package
        </div>
      )}

      {/* MAIN NAVIGATION BAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActivePage('home')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-9 h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-indigo-600/30 text-lg">
              Z
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight block leading-tight">
                Z-FINANCE
              </span>
              <span className="text-[10px] font-mono text-indigo-400">Public Portal v1.0.0</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold">
            <button 
              onClick={() => setActivePage('home')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'home' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => setActivePage('about')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'about' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.about}
            </button>
            <button 
              onClick={() => setActivePage('features')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'features' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.features}
            </button>
            <button 
              onClick={() => setActivePage('solutions')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'solutions' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.solutions}
            </button>
            <button 
              onClick={() => setActivePage('pricing')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'pricing' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.pricing}
            </button>
            <button 
              onClick={() => setActivePage('faq')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'faq' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.faq}
            </button>
            <button 
              onClick={() => setActivePage('blog')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'blog' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.blog}
            </button>
            <button 
              onClick={() => setActivePage('documentation')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'documentation' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.docs}
            </button>
            <button 
              onClick={() => setActivePage('contact')} 
              className={`px-3 py-1.5 rounded-lg transition-colors ${activePage === 'contact' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}
            >
              {t.contact}
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} 
              className="px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs font-bold hover:border-indigo-500 flex items-center space-x-1"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="p-1.5 rounded-lg border border-slate-700 hover:border-indigo-500"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* PWA Install Button */}
            <button 
              onClick={() => setShowPwaInstallModal(true)} 
              className="hidden sm:flex items-center space-x-1 bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.installApp}</span>
            </button>

            {/* Auth Buttons */}
            <button 
              onClick={() => { setAuthModalType('login'); setShowAuthModal(true); }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-700 hover:border-indigo-500"
            >
              {t.signin}
            </button>

            <button 
              onClick={() => { setAuthModalType('register'); setShowAuthModal(true); }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-indigo-600/30"
            >
              {t.register}
            </button>
          </div>
        </div>
      </header>

      {/* SEO & META TAG INSPECTOR PANEL */}
      {showSeoInspector && (
        <div className="bg-slate-900 text-slate-200 border-b border-indigo-500/50 p-4 font-mono text-xs max-w-7xl mx-auto my-2 rounded-xl border">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-indigo-400 flex items-center"><Code className="w-4 h-4 me-1" /> Dynamic Page Meta & Structured Data ({activePage.toUpperCase()})</span>
            <button onClick={() => setShowSeoInspector(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
            <div>
              <p><strong className="text-emerald-400">&lt;title&gt;:</strong> {activePage.toUpperCase()} | Z-FINANCE 1.0.0 Enterprise Suite</p>
              <p><strong className="text-emerald-400">&lt;meta description&gt;:</strong> Professional financial management engine for income, expenses, multi-currency ledgers, and offline PWA.</p>
              <p><strong className="text-emerald-400">&lt;link rel="canonical"&gt;:</strong> https://z-finance.app/{activePage}</p>
              <p><strong className="text-emerald-400">Open Graph:</strong> og:type="website", og:image="/assets/images/og-preview.jpg"</p>
            </div>
            <div>
              <p className="text-amber-400 font-bold mb-1">JSON-LD Schema.org Data:</p>
              <pre className="bg-slate-950 p-2 rounded text-[10px] text-slate-300 overflow-x-auto">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Z-FINANCE",
  "operatingSystem": "Web, Windows, macOS, Linux, Android, iOS",
  "applicationCategory": "FinanceApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* PAGE ROUTER CONTENT */}
      <main>
        {activePage === 'home' && (
          <div className="space-y-16 py-8">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-pill text-xs font-mono font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Z-FINANCE v1.0.0 Enterprise Release</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                    {t.heroTitle}
                  </h1>
                  <p className="text-slate-400 text-base leading-relaxed">
                    {t.heroSubtitle}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button 
                      onClick={() => { setAuthModalType('register'); setShowAuthModal(true); }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center space-x-2"
                    >
                      <span>{t.getStarted}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setActivePage('features')}
                      className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-xl font-bold text-sm"
                    >
                      {t.exploreFeatures}
                    </button>
                    <button 
                      onClick={() => setShowPwaInstallModal(true)}
                      className="bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 px-5 py-3 rounded-xl font-bold text-sm flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.installApp}</span>
                    </button>
                  </div>
                </div>

                {/* Hero Feature Widget Card */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                      <span className="text-xs font-mono text-indigo-400 font-bold flex items-center">
                        <TrendingUp className="w-4 h-4 me-1" /> Real-time Revenue Engine
                      </span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">
                        ● ONLINE (XAF/USD)
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Total Monthly Net Revenue</span>
                        <h2 className="text-3xl font-black text-emerald-400">$284,950.00 <span className="text-xs text-slate-400 font-normal">/ 171.2M XAF</span></h2>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                          <span className="text-slate-400 block text-[11px]">Transactions</span>
                          <strong className="text-white text-sm">1,482 Logs</strong>
                        </div>
                        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                          <span className="text-slate-400 block text-[11px]">Monthly Growth</span>
                          <strong className="text-emerald-400 text-sm">+14.2% MoM</strong>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Target Progress</span>
                          <span className="font-bold text-indigo-400">75%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full w-[75%] rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ANIMATED STATS BAR */}
            <section className="bg-slate-900/60 border-y border-slate-800 py-8">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <h3 className="text-3xl font-black text-indigo-400">{t.statsVolume}</h3>
                  <p className="text-xs text-slate-400 mt-1">{t.statsVolumeLabel}</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-emerald-400">{t.statsOffline}</h3>
                  <p className="text-xs text-slate-400 mt-1">{t.statsOfflineLabel}</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-cyan-400">{t.statsCurrencies}</h3>
                  <p className="text-xs text-slate-400 mt-1">{t.statsCurrenciesLabel}</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-amber-400">{t.statsUptime}</h3>
                  <p className="text-xs text-slate-400 mt-1">{t.statsUptimeLabel}</p>
                </div>
              </div>
            </section>

            {/* FEATURES GRID OVERVIEW */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight">Enterprise Capabilities</h2>
                <p className="text-slate-400 text-sm mt-2">Comprehensive financial tracking designed for speed, security, and multi-currency precision.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base">Income Management</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Full transaction entries with references, payment methods, attachments, categories, and customer links.</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base">Multi-Currency Native</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Real-time conversion between XAF, USD, EUR, GBP, and NGN with base currency ledger consolidation.</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base">Offline PWA Auto-Sync</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Record income offline seamlessly. The background sync engine pushes entries to MySQL when reconnected.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ABOUT US PAGE */}
        {activePage === 'about' && (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
            <div className="text-center space-y-4">
              <span className="bg-indigo-600/20 text-indigo-400 text-xs font-mono font-bold px-3 py-1 rounded-full">
                ABOUT Z-FINANCE
              </span>
              <h1 className="text-4xl font-extrabold">Building Resilient Financial Software</h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                Z-FINANCE 1.0.0 was engineered to empower companies across Central Africa and global markets with dependable financial software that works anywhere, anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <ShieldCheck className="w-8 h-8 text-indigo-400 mb-3" />
                <h4 className="font-bold text-base mb-2">Data Sovereignty</h4>
                <p className="text-slate-400 text-xs">Self-host on your own cPanel, Localhost, or VPS with full ownership of MySQL data files.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <Zap className="w-8 h-8 text-emerald-400 mb-3" />
                <h4 className="font-bold text-base mb-2">PHP 8.2 Speed</h4>
                <p class="text-slate-400 text-xs">Built on PDO prepared statements and optimized queries delivering instant execution times.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <Globe className="w-8 h-8 text-cyan-400 mb-3" />
                <h4 className="font-bold text-base mb-2">African & Global Markets</h4>
                <p className="text-slate-400 text-xs">Native support for XAF, NGN, USD, EUR, and GBP with localized tax and compliance setups.</p>
              </div>
            </div>
          </div>
        )}

        {/* FEATURES PAGE */}
        {activePage === 'features' && (
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-extrabold">Platform Capabilities & Core Modules</h1>
              <p className="text-slate-400 text-xs mt-2">Comprehensive suite covering every aspect of enterprise financial management.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Income Management', icon: TrendingUp, desc: 'Detailed income logging, category coding, payment methods, attachments, and recurring schedules.' },
                { title: 'Expense Control', icon: Database, desc: 'Track cost center expenses, supplier payables, and tax-deductible category breakdowns.' },
                { title: 'Customer CRM', icon: UserPlus, desc: 'Client profiles, revenue contribution history, and open receivable balance tracking.' },
                { title: 'Service Catalog', icon: Layers, desc: 'Pre-defined service packages, billable hourly rates, and automated price application.' },
                { title: 'Project Profitability', icon: FileText, desc: 'Real-time revenue vs expense tracking to calculate exact project profit margins.' },
                { title: 'PDF Financial Reports', icon: BookOpen, desc: 'Export audited Balance Sheets, Profit & Loss statements, and Tax Summaries in one click.' },
                { title: 'AI Revenue Analytics', icon: Sparkles, desc: 'Predictive revenue forecasting, category growth trends, and anomaly detection.' },
                { title: 'Offline PWA Sync', icon: WifiOff, desc: 'IndexedDB caching allows working completely offline with background auto-sync.' },
                { title: 'Super Admin Controls', icon: Lock, desc: 'Role-based permissions, CSRF protection, and audit logs for complete administrative security.' }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <Icon className="w-6 h-6 text-indigo-400" />
                    <h4 className="font-bold text-base">{feat.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PRICING PAGE */}
        {activePage === 'pricing' && (
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h1 className="text-3xl font-extrabold">Subscription & Self-Hosting Plans</h1>
              <p className="text-slate-400 text-xs">Choose the ideal deployment tier for your business requirements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col">
                <h4 className="font-bold text-base">Community Free</h4>
                <div className="my-4"><span className="text-3xl font-black">$0</span> <span className="text-xs text-slate-400">/mo</span></div>
                <p className="text-xs text-slate-400 mb-4">Single company profile</p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> 1 Company Profile</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> 100 Transactions / mo</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> Single Currency</li>
                </ul>
                <button onClick={() => setShowAuthModal(true)} className="mt-auto border border-slate-700 py-2 rounded-xl font-bold text-xs">Select Free</button>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-600 flex flex-col relative">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded absolute top-3 right-3">POPULAR</span>
                <h4 className="font-bold text-base text-indigo-400">Professional</h4>
                <div className="my-4"><span className="text-3xl font-black">$49</span> <span className="text-xs text-slate-400">/mo</span></div>
                <p className="text-xs text-slate-400 mb-4">Complete enterprise suite</p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> Unlimited Companies</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> All 5 Currencies Native</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> Offline PWA Auto-Sync</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> AI Revenue Analytics</li>
                </ul>
                <button onClick={() => setShowAuthModal(true)} className="mt-auto bg-indigo-600 text-white py-2 rounded-xl font-bold text-xs shadow-lg">Get Pro Plan</button>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col">
                <h4 className="font-bold text-base text-cyan-400">Basic</h4>
                <div className="my-4"><span className="text-3xl font-black">$19</span> <span className="text-xs text-slate-400">/mo</span></div>
                <p className="text-xs text-slate-400 mb-4">Small business cashflow</p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> 3 Company Profiles</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> 1,000 Transactions / mo</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> PDF Reports Generator</li>
                </ul>
                <button onClick={() => setShowAuthModal(true)} className="mt-auto border border-slate-700 py-2 rounded-xl font-bold text-xs">Choose Basic</button>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-amber-500/50 flex flex-col">
                <h4 className="font-bold text-base text-amber-400">Enterprise On-Prem</h4>
                <div className="my-4"><span className="text-3xl font-black">Custom</span></div>
                <p className="text-xs text-slate-400 mb-4">Dedicated VPS or Cloud setup</p>
                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> Custom Installation</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> Dedicated SLA Support</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 me-2" /> White-label Branding</li>
                </ul>
                <button onClick={() => setActivePage('contact')} className="mt-auto bg-amber-500 text-slate-950 py-2 rounded-xl font-bold text-xs">Contact Sales</button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ PAGE */}
        {activePage === 'faq' && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold">Frequently Asked Questions</h1>
              <p className="text-slate-400 text-xs mt-2">Find instant answers regarding deployment, security, and usage.</p>
            </div>

            <div className="space-y-4">
              {[
                { q: 'Can I install Z-FINANCE on shared hosting or XAMPP?', a: 'Yes! Z-FINANCE includes a web-based Installation Wizard (/install/) that runs on Localhost, XAMPP, Laragon, cPanel, or VPS.' },
                { q: 'How does the Offline PWA mode work?', a: 'The app uses IndexedDB caching. Transactions logged offline sync automatically to MySQL when network connection is restored.' },
                { q: 'Which currencies are supported natively?', a: 'Native support is included for XAF, USD, EUR, GBP, and NGN with automatic exchange rate conversion to base ledger currency.' }
              ].map((item, i) => (
                <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-sm text-indigo-400 flex items-center"><HelpCircle className="w-4 h-4 me-2" /> {item.q}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG PAGE */}
        {activePage === 'blog' && (
          <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold">Financial Intelligence Blog</h1>
              <p className="text-slate-400 text-xs mt-2">Latest technical insights, tax compliance strategies, and release notes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Managing Multi-Currency Cashflow in Central & West Africa', date: 'July 22, 2026', tag: 'Strategy', desc: 'How enterprise CFOs handle dynamic conversion rates between XAF, USD, and NGN without ledger accounting imbalances.' },
                { title: 'Why Offline-First PWA Architecture Matters for Financial Apps', date: 'July 18, 2026', tag: 'Engineering', desc: 'Unstable mobile connectivity should never halt billing. How Z-FINANCE leverages IndexedDB for zero data loss.' },
                { title: 'Preparing Your Business for Audited PDF Statement Exports', date: 'July 10, 2026', tag: 'Compliance', desc: 'A step-by-step guide to categorizing income and cost centers to streamline quarterly balance sheets.' }
              ].map((post, idx) => (
                <div key={idx} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-800">
                    <span className="bg-indigo-600/20 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded">{post.tag}</span>
                    <h4 className="font-bold text-sm mt-3">{post.title}</h4>
                    <span className="text-[10px] text-slate-400 block mt-1">{post.date}</span>
                  </div>
                  <div className="p-6 text-xs text-slate-400 flex-1">{post.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {activePage === 'contact' && (
          <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-3xl font-extrabold">Contact Enterprise Advisory</h1>
              <p className="text-slate-400 text-xs mt-2">Our team is available to assist with custom deployments, licensing, and technical queries.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                {contactSubmitted ? (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-1" />
                    <p>Message Transmitted Successfully!</p>
                    <p className="text-[11px] text-slate-300 font-normal">Our advisory team will respond within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-bold block mb-1">Full Name</label>
                      <input required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Business Email</label>
                      <input type="email" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" placeholder="john@company.com" />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Message</label>
                      <textarea required rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" placeholder="How can we assist your business?" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-bold text-xs shadow-lg">
                      Send Message
                    </button>
                  </>
                )}
              </form>

              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-base flex items-center"><MapPin className="w-4 h-4 text-indigo-400 me-2" /> Headquarters</h4>
                  <p className="text-xs text-slate-400">Innovation Tech Tower, Financial District</p>
                  <p className="text-xs text-slate-400 flex items-center"><Mail className="w-3.5 h-3.5 text-indigo-400 me-2" /> support@z-finance.app</p>
                  <p className="text-xs text-slate-400 flex items-center"><Phone className="w-3.5 h-3.5 text-emerald-400 me-2" /> +237 (600) 000-888</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center font-mono text-xs text-slate-400">
                  📍 Interactive Google Maps Embed Mockup Area
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTATION PAGE */}
        {activePage === 'documentation' && (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold">Documentation & Guides</h1>
              <p className="text-slate-400 text-xs mt-2">Comprehensive documentation files available in the project root.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-indigo-400 font-bold block">PUBLIC_WEBSITE_GUIDE.md</span>
                <p className="text-slate-400">Public website architecture, pages breakdown, and PHP routing.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-emerald-400 font-bold block">SEO_GUIDE.md</span>
                <p className="text-slate-400">Open Graph, Twitter Cards, Schema.org JSON-LD, sitemap, and robots.txt setup.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold block">PWA_GUIDE.md</span>
                <p className="text-slate-400">Service worker caching, offline PWA installation, and IndexedDB sync.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-amber-400 font-bold block">THEME_GUIDE.md</span>
                <p className="text-slate-400">Light, Dark, and Auto theme toggles with CSS variable persistence.</p>
              </div>
            </div>
          </div>
        )}

        {/* DOWNLOAD PAGE */}
        {activePage === 'download' && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-center">
            <h1 className="text-3xl font-extrabold">Download Z-FINANCE 1.0.0</h1>
            <p className="text-slate-400 text-xs">Install as a native desktop/mobile app or download the PHP server ZIP package.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-slate-900 p-8 rounded-2xl border border-indigo-600 space-y-4">
                <Smartphone className="w-12 h-12 text-indigo-400 mx-auto" />
                <h3 className="font-bold text-lg">PWA Native Application</h3>
                <p className="text-xs text-slate-400">Install directly on Chrome, Edge, Safari, Android, or iOS without app stores.</p>
                <button onClick={() => setShowPwaInstallModal(true)} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg">
                  Install PWA Now
                </button>
              </div>

              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-4">
                <Database className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-lg">PHP Server Package (ZIP)</h3>
                <p className="text-xs text-slate-400">Complete codebase including /install/ wizard for cPanel, XAMPP, or VPS.</p>
                <button onClick={() => alert("Server ZIP download package prepared in /website/ and /install/ directories.")} className="border border-slate-700 hover:border-slate-500 px-6 py-2.5 rounded-xl font-bold text-xs">
                  Download Server ZIP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LEGAL PAGES: PRIVACY, TERMS, COOKIES */}
        {(activePage === 'privacy' || activePage === 'terms' || activePage === 'cookies') && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
            <h1 className="text-3xl font-extrabold capitalize">{activePage.replace('cookies', 'cookie policy').replace('privacy', 'privacy policy').replace('terms', 'terms & conditions')}</h1>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-3">
              <p>Z-FINANCE 1.0.0 respects user data sovereignty. When self-hosted on your own infrastructure, all data remains under your direct administrative ownership.</p>
              <p>Technical cookies (z_lang, z_theme) are utilized strictly for language and dark/light theme preferences.</p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-20 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black">Z</div>
              <span className="font-extrabold text-white text-base">Z-FINANCE</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enterprise financial management platform with income tracking, multi-currency ledgers, and offline PWA reliability.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3">Quick Navigation</h5>
            <ul className="space-y-2">
              <li><button onClick={() => setActivePage('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => setActivePage('about')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => setActivePage('features')} className="hover:text-white">Features</button></li>
              <li><button onClick={() => setActivePage('pricing')} className="hover:text-white">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3">Legal & Support</h5>
            <ul className="space-y-2">
              <li><button onClick={() => setActivePage('privacy')} className="hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => setActivePage('terms')} className="hover:text-white">Terms & Conditions</button></li>
              <li><button onClick={() => setActivePage('cookies')} className="hover:text-white">Cookie Policy</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-white">Support Desk</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3">Newsletter</h5>
            {newsletterSubmitted ? (
              <p className="text-emerald-400 font-bold">Subscribed successfully!</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setNewsletterSubmitted(true); }} className="flex space-x-1">
                <input required type="email" placeholder="Business email" className="bg-slate-950 border border-slate-800 px-2.5 py-1.5 rounded-lg text-xs text-white w-full" />
                <button type="submit" className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-bold">Join</button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-slate-800/80 pt-6 flex flex-wrap justify-between items-center text-[11px]">
          <p>© 2026 Z-FINANCE Technologies Inc. All rights reserved.</p>
          <p className="font-mono text-slate-500">Powered by Z-FINANCE 1.0.0 Enterprise Core</p>
        </div>
      </footer>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4 text-center">
            <Lock className="w-10 h-10 text-indigo-400 mx-auto" />
            <h3 className="font-bold text-lg text-white">
              {authModalType === 'login' ? 'Sign In to Z-FINANCE' : 'Create Free Account'}
            </h3>
            <p className="text-xs text-slate-400">
              Authentication and User Management modules will be activated in the next development phase per platform roadmap.
            </p>
            <button onClick={() => setShowAuthModal(false)} className="w-full bg-indigo-600 text-white py-2 rounded-xl font-bold text-xs">
              Understand & Close
            </button>
          </div>
        </div>
      )}

      {/* PWA INSTALL MODAL */}
      {showPwaInstallModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl max-w-md w-full space-y-4 text-center">
            <Smartphone className="w-12 h-12 text-cyan-400 mx-auto" />
            <h3 className="font-bold text-lg text-white">Install Z-FINANCE PWA Application</h3>
            <p className="text-xs text-slate-300">
              Install Z-FINANCE on your Desktop, Android, or iOS device for instant offline access and standalone window execution.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono text-left">
              Manifest: /public/manifest.json<br />
              Service Worker: /sw.js (Active)<br />
              Cache Engine: IndexedDB & LocalStorage
            </div>
            <div className="flex space-x-2">
              <button onClick={() => { setPwaInstalled(true); setShowPwaInstallModal(false); }} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-xl font-bold text-xs">
                {pwaInstalled ? 'Already Installed' : 'Confirm Installation'}
              </button>
              <button onClick={() => setShowPwaInstallModal(false)} className="px-4 border border-slate-700 py-2 rounded-xl font-bold text-xs text-slate-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
