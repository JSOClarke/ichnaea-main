import { Trash2 } from "lucide-react";
import type { Account, Expense, Income } from "../../types/types";

interface BottomBarCardProps {
  item: Account | Expense | Income;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export default function BottomBarCard({
  item,
  onClick,
  onDelete,
}: BottomBarCardProps) {
  const hasDuration = 'duration' in item && item.duration;

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
        {hasDuration && (
          <div className="text-sm text-gray-500">
            {item.duration.start} - {item.duration.end}
          </div>
        )}
        <button
          onClick={onDelete}
          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
          title={`Delete item`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}