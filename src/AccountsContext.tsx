import React, {
  createContext,
  useState,
  type ReactNode,
  useContext,
} from "react";
import type { Account } from "../types/types";
import { nanoid } from "nanoid";

// Define context type
interface AccountContextType {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  removeAccount: (accountId: string) => void; // Add removeAccount to context type
}

// Create the context with an initial undefined value
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Provider component props
interface AccountProviderProps {
  children: ReactNode;
}

//InitalValues for testing purposes

const accountData: Account[] = [
  {
    id: nanoid(),
    name: "HYSA Account",
    type: 1,
    amount: 20000,
    interestRate: 0.05,
    monthlyRate: 12,
    monthlyContribution: 0,
    priority: 2,
    withdrawalPriority: 2, // Second to be consumed
    isOverflow: true, // Back to being overflow account - excess funds go here
  },
  {
    id: nanoid(),
    name: "Stock",
    type: 2,
    amount: 40000,
    interestRate: 0.05,
    monthlyRate: 12,
    monthlyContribution: 1000,
    priority: 1,
    withdrawalPriority: 1, // First to be consumed (least protected)
  },
  {
    id: nanoid(),
    name: "Pension",
    type: 2,
    amount: 10000,
    interestRate: 0.05,
    monthlyRate: 12,
    monthlyContribution: 0,
    priority: 3,
    withdrawalPriority: 4, // Last to be consumed (most protected)
    isOverflow: false,
  },
];

// Provider component
export function AccountProvider({ children }: AccountProviderProps) {
  const [accounts, setAccounts] = useState<Account[]>(accountData);

  // Helper function to remove an account by id
  const removeAccount = (accountId: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
  };

  return (
    <AccountContext.Provider value={{ accounts, setAccounts, removeAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

// Custom hook to consume context easily
export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
}
