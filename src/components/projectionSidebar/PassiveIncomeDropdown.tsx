import type { Account } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";
import { calculatePassiveIncomeOnly } from "../../utils/projectionsHelpers";

interface PassiveIncomeDropdownProps {
  accounts: Account[];
  year: number;
}

export default function PassiveIncomeDropdown({
  accounts,
  year,
}: PassiveIncomeDropdownProps) {
  const yearsFromStart = year - 2025; // Assuming 2025 is the start year

  // Calculate total passive income for all accounts
  const totalPassiveIncome = accounts.reduce((total, account) => {
    const passiveIncome = calculatePassiveIncomeOnly(
      account.amount,
      account.monthlyContribution,
      account.interestRate,
      account.monthlyRate,
      yearsFromStart
    );
    return total + passiveIncome;
  }, 0);

  const totalAmount = `£${totalPassiveIncome.toLocaleString()}`;

  return (
    <UniversalDropdown
      title="Cumalative Passive Income"
      defaultOpen={false}
      totalAmount={totalAmount}
    >
      {accounts.map((account) => {
        const passiveIncome = calculatePassiveIncomeOnly(
          account.amount,
          account.monthlyContribution,
          account.interestRate,
          account.monthlyRate,
          yearsFromStart
        );

        const formattedValue = `£${passiveIncome.toLocaleString()}`;

        return (
          <DropdownItem
            key={account.id}
            label={account.name}
            value={formattedValue}
            valueClassName="text-green-600"
          />
        );
      })}
    </UniversalDropdown>
  );
}
