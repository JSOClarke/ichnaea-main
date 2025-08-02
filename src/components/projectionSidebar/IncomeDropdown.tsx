import type { Income } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";

interface IncomeDropdownProps {
  incomes: Income[];
  year: number;
}

export default function IncomeDropdown({ incomes, year }: IncomeDropdownProps) {
  // Filter incomes to only show those active in the selected year
  const activeIncomes = incomes.filter(
    (income) => income.duration.start <= year && income.duration.end >= year
  );

  // Calculate total for only active incomes
  const totalIncome = activeIncomes.reduce((curr, income) => {
    return curr + income.amount;
  }, 0);

  return (
    <UniversalDropdown
      title="Income"
      defaultOpen={false}
      totalAmount={`£${totalIncome.toLocaleString()}`}
    >
      {activeIncomes.map((income) => {
        return (
          <DropdownItem
            key={income.id}
            label={income.name}
            value={`£${income.amount.toLocaleString()}`}
            valueClassName="text-green-600"
          />
        );
      })}
    </UniversalDropdown>
  );
}
