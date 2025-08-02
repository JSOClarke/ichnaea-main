import { Trash2 } from "lucide-react";
import type { Account } from "../../types/types";

interface BottomBarCardProps {
  item: Account;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export default function BottomBarCard({
  item,
  onClick,
  onDelete,
}: BottomBarCardProps) {
  return (
    <div
      className="flex justify-between items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
      onClick={onClick}
    >
      <div className="font-medium">{item.name}</div>
      <div className="flex items-center gap-2">
        <div className="text-green-600 font-semibold">
          £{item.amount.toLocaleString()}
        </div>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
          title="Delete account"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
