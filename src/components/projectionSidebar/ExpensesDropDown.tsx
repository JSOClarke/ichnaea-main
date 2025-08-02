import type { Expense } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";

interface ExpensesDropDownProps {
  expenses: Expense[];
  year: number;
}

export default function ExpensesDropDown({
  expenses,
  year,
}: ExpensesDropDownProps) {
  // Filter expenses to only show those active in the selected year
  const activeExpenses = expenses.filter(
    (expense) => expense.duration.start <= year && expense.duration.end >= year
  );

  // Calculate total for only active expenses
  const totalExpenses = activeExpenses.reduce((curr, exp) => {
    return curr + exp.amount;
  }, 0);

  return (
    <div>
      <UniversalDropdown
        title="Expenses"
        defaultOpen={false}
        totalAmount={`£${totalExpenses.toLocaleString()}`}
      >
        {activeExpenses.map((expense, idx) => {
          return (
            <DropdownItem
              key={expense.id}
              label={expense.name}
              value={`£${expense.amount.toLocaleString()}`}
            />
          );
        })}
      </UniversalDropdown>
    </div>
  );
}
