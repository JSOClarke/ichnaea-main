import type { Account } from "../../../types/types";
import { DeleteIcon } from "lucide-react";

interface AccountCardProps {
  item: Account;
  removeAccount: (accountId: string) => void;
}

export default function AccountCard({ item, removeAccount }: AccountCardProps) {
  return (
    <div className="card-container flex justify-between gap-2 w-100 ">
      <div className="card-title text-red-500">{item.name}</div>
      <div className="card-value text-green-500">
        {item.monthlyContribution}
      </div>
      <div className="card-value text-green-500">
        £{item.amount.toLocaleString()}
      </div>
      <div>
        <DeleteIcon onClick={() => removeAccount(item.id)} />
      </div>
    </div>
  );
}
