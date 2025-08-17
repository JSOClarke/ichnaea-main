import { useState } from "react";
import { nanoid } from "nanoid";
import { Plus } from "lucide-react";
import type { Account, Expense, Income } from "../../types/types";
import { useAccountContext } from "../AccountsContext";
import { useExpensesContext } from "../ExpensesContext";
import { useIncomeContext } from "../IncomeContext";
import BottomBarCard from "./BottomBarCard";
import EditModal from "../components/ui/EditModal";

export default function BottomBar() {
  const { accounts, setAccounts } = useAccountContext();
  const { expenses, setExpenses } = useExpensesContext();
  const { incomes, setIncomes } = useIncomeContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<
    Account | Expense | Income | null
  >(null);
  const [editingType, setEditingType] = useState<
    "account" | "expense" | "income"
  >("account");

  const handleAccountClick = (account: Account) => {
    setEditingItem(account);
    setEditingType("account");
    setIsModalOpen(true);
  };

  const handleExpenseClick = (expense: Expense) => {
    setEditingItem(expense);
    setEditingType("expense");
    setIsModalOpen(true);
  };

  const handleIncomeClick = (income: Income) => {
    setEditingItem(income);
    setEditingType("income");
    setIsModalOpen(true);
  };

  const handleAddNewAccount = () => {
    const newAccount: Account = {
      id: nanoid(),
      name: "New Account",
      type: 1,
      amount: 0,
      interestRate: 0.05,
      monthlyRate: 12,
      monthlyContribution: 0,
      priority: 3,
      withdrawalPriority: 2, // Default to medium withdrawal priority
    };
    setEditingItem(newAccount);
    setEditingType("account");
    setIsModalOpen(true);
  };

  const handleAddNewExpense = () => {
    const newExpense: Expense = {
      id: nanoid(),
      name: "New Expense",
      amount: 0,
      frequency: "monthly",
      category: "General",
      type: "Fixed",
      notes: "",
      duration: {
        start: 2025,
        end: 2030,
      },
    };
    setEditingItem(newExpense);
    setEditingType("expense");
    setIsModalOpen(true);
  };

  const handleAddNewIncome = () => {
    const newIncome: Income = {
      id: nanoid(),
      name: "New Income",
      amount: 0,
      frequency: "monthly",
      category: "Employment",
      type: "Salary",
      notes: "",
      duration: {
        start: 2025,
        end: 2065,
      },
    };
    setEditingItem(newIncome);
    setEditingType("income");
    setIsModalOpen(true);
  };

  const handleSave = (updatedData: Account | Expense | Income) => {
    if (editingType === "account") {
      const updatedAccount = updatedData as Account;
      setAccounts((prev) => {
        const existingIndex = prev.findIndex(
          (account) => account.id === updatedAccount.id
        );
        if (existingIndex >= 0) {
          // Update existing account
          return prev.map((account) =>
            account.id === updatedAccount.id ? updatedAccount : account
          );
        } else {
          // Add new account
          return [...prev, updatedAccount];
        }
      });
    } else if (editingType === "expense") {
      const updatedExpense = updatedData as Expense;
      setExpenses((prev) => {
        const existingIndex = prev.findIndex(
          (expense) => expense.id === updatedExpense.id
        );
        if (existingIndex >= 0) {
          // Update existing expense
          return prev.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense
          );
        } else {
          // Add new expense
          return [...prev, updatedExpense];
        }
      });
    } else {
      const updatedIncome = updatedData as Income;
      setIncomes((prev) => {
        const existingIndex = prev.findIndex(
          (income) => income.id === updatedIncome.id
        );
        if (existingIndex >= 0) {
          // Update existing income
          return prev.map((income) =>
            income.id === updatedIncome.id ? updatedIncome : income
          );
        } else {
          // Add new income
          return [...prev, updatedIncome];
        }
      });
    }
  };

  const handleDeleteAccount = (accountId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the edit modal
    if (window.confirm("Are you sure you want to delete this account?")) {
      setAccounts((prev) => prev.filter((account) => account.id !== accountId));
    }
  };

  const handleDeleteExpense = (expenseId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the edit modal
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
    }
  };

  const handleDeleteIncome = (incomeId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the edit modal
    if (window.confirm("Are you sure you want to delete this income?")) {
      setIncomes((prev) => prev.filter((income) => income.id !== incomeId));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-0 w-full h-full p-4 space-x-8">
      {/* Income Section */}
      <div className="income-container flex-1 w-full">
        <div className="container-title flex items-center justify-center text-xl text-white p-4 bg-[#30499f] rounded-t-lg border-b">
          Income
        </div>
        <div className="space-y-2 p-4 bg-white rounded-b-lg border border-gray-200">
          {incomes.map((item) => (
            <BottomBarCard
              key={item.id}
              item={item}
              onClick={() => handleIncomeClick(item)}
              onDelete={(e) => handleDeleteIncome(item.id, e)}
            />
          ))}
          <button
            onClick={handleAddNewIncome}
            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors"
          >
            <Plus size={20} />
            Add New Income
          </button>
        </div>
      </div>

      {/* Savings/Accounts Section */}
      <div className="savings-container flex-1 w-full">
        <div className="container-title flex items-center justify-center text-xl p-4 text-white p-4 bg-[#30499f] rounded-t-lg border-b">
          Savings & Investments
        </div>
        <div className="space-y-2 p-4 bg-white rounded-b-lg border border-gray-200">
          {accounts.map((item) => (
            <BottomBarCard
              key={item.id}
              item={item}
              onClick={() => handleAccountClick(item)}
              onDelete={(e) => handleDeleteAccount(item.id, e)}
            />
          ))}
          <button
            onClick={handleAddNewAccount}
            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors"
          >
            <Plus size={20} />
            Add New Account
          </button>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="expenses-container flex-1 w-full">
        <div className="container-title flex items-center justify-center text-xl p-4 text-white  bg-[#30499f] rounded-t-lg border-b">
          Expenses
        </div>
        <div className="space-y-2 p-4 bg-white rounded-b-lg border border-gray-200">
          {expenses.map((item) => (
            <BottomBarCard
              key={item.id}
              item={item}
              onClick={() => handleExpenseClick(item)}
              onDelete={(e) => handleDeleteExpense(item.id, e)}
            />
          ))}
          <button
            onClick={handleAddNewExpense}
            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-red-300 rounded-lg text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors"
          >
            <Plus size={20} />
            Add New Expense
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        data={editingItem}
        type={editingType}
      />
    </div>
  );
}
