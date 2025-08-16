import React, {
  createContext,
  useState,
  type ReactNode,
  useContext,
} from "react";
import type { Income } from "../types/types";
import { nanoid } from "nanoid";

// Define context type
interface IncomeContextType {
  incomes: Income[];
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>;
  removeIncome: (incomeId: string) => void;
}

// Create the context with an initial undefined value
const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

// Provider component props
interface IncomeProviderProps {
  children: ReactNode;
}

// Initial values for testing purposes
const incomeData: Income[] = [
  {
    id: nanoid(),
    name: "Semi Relaxed Job",
    amount: 14000,
    frequency: "annually",
    category: "Employment",
    type: "Salary",
    notes: "Full-time position",
    duration: {
      start: 2025,
      end: 2067, // Working until 65
    },
  },
];

// Provider component
export function IncomeProvider({ children }: IncomeProviderProps) {
  const [incomes, setIncomes] = useState<Income[]>(incomeData);

  // Helper function to remove an income by id
  const removeIncome = (incomeId: string) => {
    setIncomes((prev) => prev.filter((income) => income.id !== incomeId));
  };

  return (
    <IncomeContext.Provider value={{ incomes, setIncomes, removeIncome }}>
      {children}
    </IncomeContext.Provider>
  );
}

// Custom hook to consume context easily
export function useIncomeContext() {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncomeContext must be used within an IncomeProvider");
  }
  return context;
}
