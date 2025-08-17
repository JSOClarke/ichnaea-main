import type { Expense } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";
import { toAnnualAmount } from "../../utils/projectionsHelpers";

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

  // Calculate total for only active expenses (converted to annual)
  const totalExpenses = activeExpenses.reduce((curr, exp) => {
    return curr + toAnnualAmount(exp.amount, exp.frequency);
  }, 0);

  return (
    <div>
      <UniversalDropdown
        title="Expenses"
        defaultOpen={false}
        totalAmount={`£${totalExpenses.toLocaleString()}`}
      >
        {activeExpenses.map((expense, idx) => {
          const annualAmount = toAnnualAmount(
            expense.amount,
            expense.frequency
          );
          return (
            <DropdownItem
              key={idx}
              label={expense.name}
              value={`£${annualAmount.toLocaleString()}`}
            />
          );
        })}
      </UniversalDropdown>
    </div>
  );
}
