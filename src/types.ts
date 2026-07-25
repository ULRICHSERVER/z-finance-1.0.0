export type CurrencyCode = 'XAF' | 'USD' | 'EUR' | 'GBP' | 'NGN';

export type PaymentMethod = 
  | 'Cash'
  | 'Bank Transfer'
  | 'Cheque'
  | 'Credit'
  | 'MTN Mobile Money'
  | 'Orange Money'
  | 'Express Union Mobile Money'
  | 'Visa'
  | 'Mastercard'
  | 'PayPal'
  | 'Stripe'
  | 'Flutterwave'
  | 'PayUnit'
  | 'Paystack';

export type IncomeStatus = 
  | 'pending'
  | 'received'
  | 'partially_received'
  | 'cancelled'
  | 'refunded'
  | 'completed';

export type SourceType = 'service_related' | 'customer_related' | 'project_related' | 'general';

export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export type UserRole = 'Super Admin' | 'Manager' | 'Accountant' | 'Standard User';

export interface IncomeCategory {
  id: number;
  category_name: string;
  category_code: string;
  description: string;
  color_code: string;
  icon: string;
  status: 'active' | 'disabled';
  is_deleted: boolean;
}

export interface IncomeSource {
  id: number;
  category_id: number;
  category_name?: string;
  source_name: string;
  description: string;
  type: SourceType;
  is_recurring: boolean;
  status: 'active' | 'inactive';
  is_deleted: boolean;
}

export interface IncomeAttachment {
  id: string;
  file_name: string;
  file_type: string;
  file_size: string;
  attachment_type: 'receipt' | 'invoice' | 'contract' | 'proof_of_payment' | 'document' | 'image';
  uploaded_at: string;
  url?: string;
}

export interface IncomeRecord {
  id: number;
  reference_no: string;
  title: string;
  category_id: number;
  category_name: string;
  source_id: number;
  source_name: string;
  customer_id?: number;
  customer_name?: string;
  service_id?: number;
  service_name?: string;
  project_id?: number;
  project_name?: string;
  amount: number;
  currency: CurrencyCode;
  exchange_rate: number;
  base_amount: number; // in XAF
  payment_method: PaymentMethod;
  income_date: string;
  status: IncomeStatus;
  description: string;
  notes?: string;
  tags: string[];
  attachments: IncomeAttachment[];
  is_recurring: boolean;
  offline_synced: boolean;
  created_by: string;
  created_at: string;
}

export interface RecurringSchedule {
  id: number;
  title: string;
  category_name: string;
  source_name: string;
  customer_name?: string;
  amount: number;
  currency: CurrencyCode;
  frequency: RecurrenceFrequency;
  start_date: string;
  next_run_date: string;
  status: 'active' | 'paused' | 'completed';
  auto_receive: boolean;
}

export interface CustomerLink {
  id: number;
  name: string;
  email: string;
  company: string;
  balance: number;
}

export interface ServiceLink {
  id: number;
  name: string;
  package_type: string;
  price: number;
}

export interface ProjectLink {
  id: number;
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
}
