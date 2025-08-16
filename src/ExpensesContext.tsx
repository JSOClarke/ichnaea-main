import React, { createContext, useState, ReactNode, useContext } from "react";
import type { Expense } from "../types/types";
import { nanoid } from "nanoid";

// Define context type
interface ExpensesContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  removeExpense: (expenseId: string) => void;
}

// Create the context with an initial undefined value
const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

// Provider component props
interface ExpensesProviderProps {
  children: ReactNode;
}

// Example initial data (optional, for testing)
const initialExpenses: Expense[] = [
  {
    id: nanoid(),
    name: "Living Expenses",
    amount: 10000,
    frequency: "annually",
    category: "Living Expenses",
    type: "Variable",
    accountId: undefined,
    notes: "Living Expenses",
    duration: {
      start: 2025,
      end: 2067,
    },
  },
];

// Provider component
export function ExpensesProvider({ children }: ExpensesProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  // Helper function to remove an expense by id
  const removeExpense = (expenseId: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses, removeExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

// Custom hook to consume context easily
export function useExpensesContext() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      "useExpensesContext must be used within an ExpensesProvider"
    );
  }
  return context;
}
