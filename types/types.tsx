export type AccountTypeId = 1 | 2;

export type AccountTypeOption = {
  id: AccountTypeId;
  label: string;
};

export type MilestoneType = {
  year: number;
  label: string;
  color: string;
  strokeColor: string;
  radius: number;
  isConditional?: boolean;
  targetAmount?: number;
};

export const ACCOUNT_TYPE_OPTIONS: AccountTypeOption[] = [
  { id: 1, label: "Savings" },
  { id: 2, label: "Investment" },
  // Add more as needed
];

export type Account = {
  id: string;
  name: string;
  type: number;
  amount: number;
  interestRate: number;
  monthlyRate: number;
  monthlyContribution: number;
  priority: number;
  isOverflow?: boolean; // ✅ Add this line
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
  fundedMonthlyContribution: number;
  fundedAnnualContribution: number;
  fundingPercent: number;
};

export type Expense = {
  id: string;
  name: string;
  amount: number; // Amount in the specified frequency
  frequency: "monthly" | "annually";
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
  amount: number; // Amount in the specified frequency
  frequency: "monthly" | "annually";
  category: string;
  type?: "Salary" | "Side Gig" | "Investment" | "Other";
  notes?: string;

  duration: {
    start: number;
    end: number;
  };
};

export type YearDropdownItem = {
  label: string;
  value: number;
  type: string;
  color?: string;
};
