import { IncomeCategory, IncomeSource, IncomeRecord, RecurringSchedule, CustomerLink, ServiceLink, ProjectLink } from '../types';

export const INITIAL_EXCHANGE_RATES: Record<string, number> = {
  XAF: 1.0,
  USD: 0.00165,
  EUR: 0.00152,
  GBP: 0.00130,
  NGN: 2.45,
};

export const INITIAL_CATEGORIES: IncomeCategory[] = [
  { id: 1, category_name: 'Service Income', category_code: 'CAT-SRV', description: 'Managed IT, network maintenance, cloud infrastructure services', color_code: '#3B82F6', icon: 'wrench', status: 'active', is_deleted: false },
  { id: 2, category_name: 'Product Sales', category_code: 'CAT-PRD', description: 'Enterprise software licenses, hardware sales', color_code: '#10B981', icon: 'shopping-bag', status: 'active', is_deleted: false },
  { id: 3, category_name: 'Consulting', category_code: 'CAT-CNS', description: 'Fintech advisory, system architecture & compliance audits', color_code: '#8B5CF6', icon: 'briefcase', status: 'active', is_deleted: false },
  { id: 4, category_name: 'Training', category_code: 'CAT-TRN', description: 'Corporate cybersecurity bootcamps and tech certification', color_code: '#F59E0B', icon: 'graduation-cap', status: 'active', is_deleted: false },
  { id: 5, category_name: 'Commission', category_code: 'CAT-COM', description: 'Brokerage fees and partner referral margins', color_code: '#EC4899', icon: 'percent', status: 'active', is_deleted: false },
  { id: 6, category_name: 'Salary', category_code: 'CAT-SLR', description: 'Operational retainer and contract payroll income', color_code: '#06B6D4', icon: 'credit-card', status: 'active', is_deleted: false },
  { id: 7, category_name: 'Investment', category_code: 'CAT-INV', description: 'Dividends, capital yields, interest returns', color_code: '#14B8A6', icon: 'trending-up', status: 'active', is_deleted: false },
  { id: 8, category_name: 'Rental Income', category_code: 'CAT-RNT', description: 'Equipment lease, office space rental, server rack colocation', color_code: '#6366F1', icon: 'building', status: 'active', is_deleted: false },
  { id: 9, category_name: 'Online Income', category_code: 'CAT-ONL', description: 'SaaS cloud API token consumption, digital asset downloads', color_code: '#3B82F6', icon: 'globe', status: 'active', is_deleted: false },
  { id: 10, category_name: 'Affiliate Income', category_code: 'CAT-AFF', description: 'Partner referral revenue and marketing commissions', color_code: '#84CC16', icon: 'link', status: 'active', is_deleted: false },
  { id: 11, category_name: 'Donation', category_code: 'CAT-DON', description: 'Sponsorships, government grants, community contributions', color_code: '#F43F5E', icon: 'heart', status: 'active', is_deleted: false },
  { id: 12, category_name: 'Bonus', category_code: 'CAT-BNS', description: 'Performance incentives, quarterly bonuses, cash awards', color_code: '#A855F7', icon: 'award', status: 'active', is_deleted: false },
  { id: 13, category_name: 'Other Income', category_code: 'CAT-OTH', description: 'Miscellaneous incoming revenue and unclassified payments', color_code: '#64748B', icon: 'plus-circle', status: 'active', is_deleted: false },
];

export const INITIAL_SOURCES: IncomeSource[] = [
  { id: 1, category_id: 1, category_name: 'Service Income', source_name: 'Managed IT Infrastructure', description: 'Monthly cloud maintenance and network monitoring', type: 'service_related', is_recurring: true, status: 'active', is_deleted: false },
  { id: 2, category_id: 2, category_name: 'Product Sales', source_name: 'Software License Subscriptions', description: 'Annual Z-FINANCE & ERP client seat licenses', type: 'customer_related', is_recurring: true, status: 'active', is_deleted: false },
  { id: 3, category_id: 3, category_name: 'Consulting', source_name: 'Fintech Architecture Advisory', description: 'Strategic technical guidance for banking clients', type: 'project_related', is_recurring: false, status: 'active', is_deleted: false },
  { id: 4, category_id: 4, category_name: 'Training', source_name: 'Cybersecurity Bootcamp', description: '3-Day executive training workshop', type: 'customer_related', is_recurring: false, status: 'active', is_deleted: false },
  { id: 5, category_id: 8, category_name: 'Rental Income', source_name: 'Data Center Rack Lease', description: 'Douala server colocation space leasing', type: 'customer_related', is_recurring: true, status: 'active', is_deleted: false },
  { id: 6, category_id: 9, category_name: 'Online Income', source_name: 'Z-FINANCE API Cloud Usage', description: 'Pay-as-you-go API token billing', type: 'service_related', is_recurring: true, status: 'active', is_deleted: false },
];

export const INITIAL_CUSTOMERS: CustomerLink[] = [
  { id: 101, name: 'Cameroon Telecom S.A.', email: 'billing@camtelecom.cm', company: 'Cameroon Telecom', balance: 14500000 },
  { id: 102, name: 'Afriland First Bank', email: 'fintech@afrilandfirstbank.cm', company: 'Afriland Group', balance: 28900000 },
  { id: 103, name: 'SNET Consulting Ltd', email: 'contact@snet-consulting.com', company: 'SNET Group', balance: 4200000 },
  { id: 104, name: 'Douala Port Authority', email: 'finance@pad.cm', company: 'PAD Douala', balance: 18000000 },
];

export const INITIAL_SERVICES: ServiceLink[] = [
  { id: 201, name: 'Cloud Network Audit', package_type: 'Enterprise Audit', price: 3500000 },
  { id: 202, name: 'Dedicated VPS Server', package_type: 'Monthly Hosting', price: 850000 },
  { id: 203, name: 'Cybersecurity Penetration Test', package_type: 'One-off Security', price: 2200000 },
];

export const INITIAL_PROJECTS: ProjectLink[] = [
  { id: 301, name: 'Project Alpha - Mobile Banking Core', revenue: 15000000, expenses: 6500000, profit: 8500000 },
  { id: 302, name: 'Project Beta - Port Authority Customs Portal', revenue: 22000000, expenses: 9800000, profit: 12200000 },
  { id: 303, name: 'Project Gamma - Telecom POS Rollout', revenue: 8500000, expenses: 3200000, profit: 5300000 },
];

export const INITIAL_INCOME_RECORDS: IncomeRecord[] = [
  {
    id: 1,
    reference_no: 'INC-202607-001',
    title: 'Enterprise Cloud Infrastructure Maintenance',
    category_id: 1,
    category_name: 'Service Income',
    source_id: 1,
    source_name: 'Managed IT Infrastructure',
    customer_id: 101,
    customer_name: 'Cameroon Telecom S.A.',
    service_id: 201,
    service_name: 'Cloud Network Audit',
    project_id: 303,
    project_name: 'Project Gamma - Telecom POS Rollout',
    amount: 3500000,
    currency: 'XAF',
    exchange_rate: 1.0,
    base_amount: 3500000,
    payment_method: 'Bank Transfer',
    income_date: '2026-07-20',
    status: 'received',
    description: 'Q3 Managed cloud server retainer and firewall monitoring fee.',
    notes: 'Payment confirmed by UBA Bank Douala Branch.',
    tags: ['Q3', 'Retainer', 'Telecom', 'Managed-IT'],
    attachments: [
      { id: 'att-1', file_name: 'UBA_Transfer_Receipt_3500000.pdf', file_type: 'application/pdf', file_size: '1.2 MB', attachment_type: 'proof_of_payment', uploaded_at: '2026-07-20 14:30' },
      { id: 'att-2', file_name: 'Service_Level_Contract_2026.pdf', file_type: 'application/pdf', file_size: '2.8 MB', attachment_type: 'contract', uploaded_at: '2026-07-20 14:32' }
    ],
    is_recurring: true,
    offline_synced: true,
    created_by: 'Super Admin',
    created_at: '2026-07-20 14:35:00'
  },
  {
    id: 2,
    reference_no: 'INC-202607-002',
    title: 'Annual Banking ERP Software Licenses (100 Seats)',
    category_id: 2,
    category_name: 'Product Sales',
    source_id: 2,
    source_name: 'Software License Subscriptions',
    customer_id: 102,
    customer_name: 'Afriland First Bank',
    project_id: 301,
    project_name: 'Project Alpha - Mobile Banking Core',
    amount: 7800,
    currency: 'EUR',
    exchange_rate: 655.957,
    base_amount: 5116464,
    payment_method: 'Bank Transfer',
    income_date: '2026-07-18',
    status: 'received',
    description: 'Renewal of 100 enterprise core banking terminal licenses.',
    notes: 'Converted EUR to XAF at official BEAC exchange rate.',
    tags: ['ERP', 'Licenses', 'Banking', 'EUR'],
    attachments: [
      { id: 'att-3', file_name: 'Afriland_License_Invoice_EUR7800.pdf', file_type: 'application/pdf', file_size: '850 KB', attachment_type: 'invoice', uploaded_at: '2026-07-18 09:12' }
    ],
    is_recurring: true,
    offline_synced: true,
    created_by: 'Accountant',
    created_at: '2026-07-18 09:15:00'
  },
  {
    id: 3,
    reference_no: 'INC-202607-003',
    title: 'Executive Cybersecurity & Cloud Compliance Training',
    category_id: 4,
    category_name: 'Training',
    source_id: 4,
    source_name: 'Cybersecurity Bootcamp',
    customer_id: 104,
    customer_name: 'Douala Port Authority',
    amount: 2200000,
    currency: 'XAF',
    exchange_rate: 1.0,
    base_amount: 2200000,
    payment_method: 'Orange Money',
    income_date: '2026-07-15',
    status: 'received',
    description: '3-Day intensive hands-on workshop for 15 network administrators.',
    tags: ['Training', 'Douala-Port', 'Orange-Money'],
    attachments: [],
    is_recurring: false,
    offline_synced: true,
    created_by: 'Manager',
    created_at: '2026-07-15 16:20:00'
  },
  {
    id: 4,
    reference_no: 'INC-202607-004',
    title: 'Data Center Colocation Space Leasing Q3',
    category_id: 8,
    category_name: 'Rental Income',
    source_id: 5,
    source_name: 'Data Center Rack Lease',
    customer_id: 103,
    customer_name: 'SNET Consulting Ltd',
    amount: 1250000,
    currency: 'XAF',
    exchange_rate: 1.0,
    base_amount: 1250000,
    payment_method: 'MTN Mobile Money',
    income_date: '2026-07-10',
    status: 'pending',
    description: 'Rack space colocation, uninterrupted power supply, and bandwidth allocation.',
    notes: 'Invoice sent. Payment promised via MTN MoMo.',
    tags: ['Lease', 'Rack', 'Pending'],
    attachments: [
      { id: 'att-4', file_name: 'Rack_Colocation_Invoice_July.pdf', file_type: 'application/pdf', file_size: '620 KB', attachment_type: 'invoice', uploaded_at: '2026-07-10 11:00' }
    ],
    is_recurring: true,
    offline_synced: true,
    created_by: 'Accountant',
    created_at: '2026-07-10 11:05:00'
  },
  {
    id: 5,
    reference_no: 'INC-202607-005',
    title: 'Consulting Advisory - FinTech Payment Gateway Integrations',
    category_id: 3,
    category_name: 'Consulting',
    source_id: 3,
    source_name: 'Fintech Architecture Advisory',
    customer_id: 102,
    customer_name: 'Afriland First Bank',
    amount: 3000,
    currency: 'USD',
    exchange_rate: 606.06,
    base_amount: 1818180,
    payment_method: 'Bank Transfer',
    income_date: '2026-07-05',
    status: 'received',
    description: 'Architectural evaluation for cross-border Mobile Money bridge.',
    tags: ['Consulting', 'Fintech', 'USD'],
    attachments: [],
    is_recurring: false,
    offline_synced: true,
    created_by: 'Super Admin',
    created_at: '2026-07-05 10:00:00'
  }
];

export const INITIAL_RECURRING_SCHEDULES: RecurringSchedule[] = [
  {
    id: 1,
    title: 'Afriland Enterprise Maintenance Contract',
    category_name: 'Service Income',
    source_name: 'Managed IT Infrastructure',
    customer_name: 'Afriland First Bank',
    amount: 2500000,
    currency: 'XAF',
    frequency: 'monthly',
    start_date: '2026-01-01',
    next_run_date: '2026-08-01',
    status: 'active',
    auto_receive: true
  },
  {
    id: 2,
    title: 'Cameroon Telecom Colocation Rent',
    category_name: 'Rental Income',
    source_name: 'Data Center Rack Lease',
    customer_name: 'Cameroon Telecom S.A.',
    amount: 1500000,
    currency: 'XAF',
    frequency: 'monthly',
    start_date: '2026-02-15',
    next_run_date: '2026-08-15',
    status: 'active',
    auto_receive: false
  },
  {
    id: 3,
    title: 'Annual Z-FINANCE Software Cloud License',
    category_name: 'Product Sales',
    source_name: 'Software License Subscriptions',
    customer_name: 'Douala Port Authority',
    amount: 12000,
    currency: 'USD',
    frequency: 'yearly',
    start_date: '2025-09-01',
    next_run_date: '2026-09-01',
    status: 'active',
    auto_receive: true
  }
];
