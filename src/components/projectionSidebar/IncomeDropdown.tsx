import type { Income } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";
import { toAnnualAmount } from "../../utils/projectionsHelpers";

interface IncomeDropdownProps {
  incomes: Income[];
  year: number;
}

export default function IncomeDropdown({ incomes, year }: IncomeDropdownProps) {
  // Filter incomes to only show those active in the selected year
  const activeIncomes = incomes.filter(
    (income) => income.duration.start <= year && income.duration.end >= year
  );

  // Calculate total for only active incomes (converted to annual)
  const totalIncome = activeIncomes.reduce((curr, income) => {
    return curr + toAnnualAmount(income.amount, income.frequency);
  }, 0);

  return (
    <UniversalDropdown
      title="Income"
      defaultOpen={false}
      totalAmount={`£${totalIncome.toLocaleString()}`}
    >
      {activeIncomes.map((income) => {
        const annualAmount = toAnnualAmount(income.amount, income.frequency);
        return (
          <DropdownItem
            key={income.id}
            label={income.name}
            value={`£${annualAmount.toLocaleString()}`}
            valueClassName="text-green-600"
          />
        );
      })}
    </UniversalDropdown>
  );
}
