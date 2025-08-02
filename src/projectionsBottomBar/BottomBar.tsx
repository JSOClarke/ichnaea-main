import { useState } from "react";
import { nanoid } from "nanoid";
import { Plus, Trash2 } from "lucide-react";
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
    <div className="flex w-full h-full p-8 space-x-8">
      {/* Income Section */}
      <div className="income-container flex-1">
        <div className="container-title flex items-center justify-center text-xl p-4 bg-green-50 rounded-t-lg border-b">
          Income
        </div>
        <div className="space-y-2 p-4 bg-white rounded-b-lg border border-gray-200">
          {incomes.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
              onClick={() => handleIncomeClick(item)}
            >
              <div className="font-medium">{item.name}</div>
              <div className="flex items-center gap-2">
                <div className="text-green-600 font-semibold">
                  £{item.amount.toLocaleString()}
                </div>
                <button
                  onClick={(e) => handleDeleteIncome(item.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
                  title="Delete income"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
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
      <div className="savings-container flex-1">
        <div className="container-title flex items-center justify-center text-xl p-4 bg-blue-50 rounded-t-lg border-b">
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
      <div className="expenses-container flex-1">
        <div className="container-title flex items-center justify-center text-xl p-4 bg-red-50 rounded-t-lg border-b">
          Expenses
        </div>
        <div className="space-y-2 p-4 bg-white rounded-b-lg border border-gray-200">
          {expenses.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
              onClick={() => handleExpenseClick(item)}
            >
              <div className="font-medium">{item.name}</div>
              <div className="flex items-center gap-2">
                <div className="text-red-600 font-semibold">
                  £{item.amount.toLocaleString()}
                </div>
                <button
                  onClick={(e) => handleDeleteExpense(item.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
                  title="Delete expense"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
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
