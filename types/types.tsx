export type AccountTypeId = 1 | 2;

export type AccountTypeOption = {
  id: AccountTypeId;
  label: string;
};

export const ACCOUNT_TYPE_OPTIONS: AccountTypeOption[] = [
  { id: 1, label: "Savings" },
  { id: 2, label: "Investment" },
  // Add more as needed
];

export type Account = {
  id: string;
  name: string;
  type: AccountTypeId; // Only allowed IDs
  amount: number;
  interestRate: number;
  monthlyRate: number;
  monthlyContribution: number;
};

export type ChartData = {
  year: number;
  totalAccountAmount: number;
  totalPassiveIncome: number;
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  netWorth: number;
  chartAccounts: ChartAccount[];
};

export type ChartAccount = {
  accountId: string;
  accountName: string;
  amount: number;
};

export type Expense = {
  id: string;
  name: string;
  amount: number; // in minor units like pence
  category: string;
  type?: "Fixed" | "Variable";
  accountId?: string;
  notes?: string;

  duration: {
    start: number; // ISO string "2025-08-01"
    end: number; // ISO string "2025-08-31"
  };
};

export type Income = {
  id: string;
  name: string;
  amount: number; // Annual amount
  category: string;
  type?: "Salary" | "Side Gig" | "Investment" | "Other";
  notes?: string;

  duration: {
    start: number;
    end: number;
  };
};
