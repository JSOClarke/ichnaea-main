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
    console.log("button pressed");
    const newAccount: Account = {
      id: nanoid(),
      name: addAccountName,
      type: addAccountType,
      amount: addAccountAmount,
      monthlyContribution: 0,
      interestRate: 0.05,
      monthlyRate: 12,
    };

    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
  }

  //   console.log("acconts", accounts);
  //   console.log(filterAccounts());

  return (
    <div>
      <div>{ACCOUNT_TYPE_OPTIONS[0].label} Accounts</div>
      {filterAccounts(1).map((item, idx) => {
        return (
          <div key={idx}>
            <AccountCard item={item} removeAccount={removeAccount} />
          </div>
        );
      })}
      <div>{ACCOUNT_TYPE_OPTIONS[1].label} Accounts</div>
      {filterAccounts(2).map((item, idx) => {
        return (
          <div key={idx}>
            <AccountCard item={item} removeAccount={removeAccount} />
          </div>
        );
      })}
      <div className="input-title">Add an Account</div>

      <div className="flex flex-col ">
        <label> Account name</label>
        <input
          type="text"
          placeholder="Enter the Account Name"
          className="border border-amber-200 w-50"
          value={addAccountName}
          onChange={(e) => setAddAccountName(e.target.value)}
        />
      </div>
      <div className="flex flex-col ">
        <label> Account name</label>
        <input
          type="number"
          placeholder="Amount to add"
          className="border border-amber-200 w-50"
          value={addAccountAmount ?? ""}
          onChange={(e) =>
            setAddAccountAmount(
              e.target.value === "" ? undefined : Number(e.target.value)
            )
          }
        />
      </div>
      <div className="flex flex-col ">
        <label> Account type</label>
        <select
          className="flex w-50"
          value={addAccountType ?? ""}
          onChange={(e) =>
            setAddAccountType(
              e.target.value === ""
                ? undefined
                : (Number(e.target.value) as AccountTypeId)
            )
          }
        >
          <option value="">Select account type</option>
          {ACCOUNT_TYPE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id} className="flex w-full">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => {
          handleAddAccount();
        }}
      >
        Add Account
      </button>
    </div>
  );
}
