import { useAccountContext } from "../AccountsContext";
import { useState } from "react";
import type { Account, AccountTypeId } from "../../types/types";
import { ACCOUNT_TYPE_OPTIONS } from "../../types/types";
import { nanoid } from "nanoid";
import AccountCard from "../components/accounts/AccountsCard";

export default function Accounts() {
  const { accounts, setAccounts, removeAccount } = useAccountContext();
  const [addAccountName, setAddAccountName] = useState<string>("");
  const [addAccountAmount, setAddAccountAmount] = useState<number>();
  const [addAccountType, setAddAccountType] = useState<AccountTypeId>();

  function filterAccounts(accountId: AccountTypeId) {
    return accounts.filter((acc) => acc.type === accountId);
  }

  function handleAddAccount() {
    if (!addAccountName || !addAccountType || addAccountAmount === undefined) {
      // Basic validation
      alert("Please fill out all fields to add an account.");
      return;
    }
    const newAccount: Account = {
      id: nanoid(),
      name: addAccountName,
      type: addAccountType,
      amount: addAccountAmount,
      monthlyContribution: 0,
      interestRate: 0.05,
      monthlyRate: 12,
      priority: 0,
    };

    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    // Reset form
    setAddAccountName("");
    setAddAccountAmount(undefined);
    setAddAccountType(undefined);
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">
          {ACCOUNT_TYPE_OPTIONS[0].label} Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterAccounts(1).map((item) => (
            <AccountCard
              key={item.id}
              item={item}
              removeAccount={removeAccount}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">
          {ACCOUNT_TYPE_OPTIONS[1].label} Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterAccounts(2).map((item) => (
            <AccountCard
              key={item.id}
              item={item}
              removeAccount={removeAccount}
            />
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Add an Account</h3>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Account Name</label>
            <input
              type="text"
              placeholder="Enter the Account Name"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={addAccountName}
              onChange={(e) => setAddAccountName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Account Amount</label>
            <input
              type="number"
              placeholder="Amount to add"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={addAccountAmount ?? ""}
              onChange={(e) =>
                setAddAccountAmount(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Account Type</label>
            <select
              className="border border-gray-300 p-2 rounded-md w-full"
              value={addAccountType ?? ""}
              onChange={(e) =>
                setAddAccountType(
                  e.target.value === ""
                    ? undefined
                    : (e.target.value as unknown as AccountTypeId)
                )
              }
            >
              <option value="">Select account type</option>
              {ACCOUNT_TYPE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddAccount}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
}
