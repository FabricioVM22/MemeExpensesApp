
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string; // ISO String: YYYY-MM-DD
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Budget {
  categoryId: string;
  amount: number;
}

export enum View {
  Dashboard = 'dashboard',
  Analytics = 'analytics',
  Settings = 'settings',
}
