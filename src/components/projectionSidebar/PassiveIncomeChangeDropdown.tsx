import type { Account } from "../../../types/types";
import { UniversalDropdown, DropdownItem } from "../ui/UniversalDropdown";
import { calculatePassiveIncomeOnly } from "../../utils/projectionsHelpers";

interface PassiveIncomeChangeDropdownProps {
  title: string;
  accounts: Account[];
  currentYear: number;
}

export default function PassiveIncomeChangeDropdown({
  title,
  accounts,
  currentYear,
}: PassiveIncomeChangeDropdownProps) {
  const currentYearsFromStart = currentYear - 2025; // Assuming 2025 is the start year
  const previousYearsFromStart = currentYearsFromStart - 1;

  // Calculate total change in passive income for all accounts
  const totalChange = accounts.reduce((total, account) => {
    const currentPassiveIncome = calculatePassiveIncomeOnly(
      account.amount,
      account.monthlyContribution,
      account.interestRate,
      account.monthlyRate,
      currentYearsFromStart
    );

    const previousPassiveIncome =
      previousYearsFromStart >= 0
        ? calculatePassiveIncomeOnly(
            account.amount,
            account.monthlyContribution,
            account.interestRate,
            account.monthlyRate,
            previousYearsFromStart
          )
        : 0;

    return total + (currentPassiveIncome - previousPassiveIncome);
  }, 0);

  const totalAmount = `${
    totalChange >= 0 ? "+" : ""
  }£${totalChange.toLocaleString()}`;

  return (
    <UniversalDropdown
      title={title}
      defaultOpen={false}
      totalAmount={totalAmount}
    >
      {accounts.map((account) => {
        const currentPassiveIncome = calculatePassiveIncomeOnly(
          account.amount,
          account.monthlyContribution,
          account.interestRate,
          account.monthlyRate,
          currentYearsFromStart
        );

        const previousPassiveIncome =
          previousYearsFromStart >= 0
            ? calculatePassiveIncomeOnly(
                account.amount,
                account.monthlyContribution,
                account.interestRate,
                account.monthlyRate,
                previousYearsFromStart
              )
            : 0;

        const changeInPassiveIncome =
          currentPassiveIncome - previousPassiveIncome;

        const formattedValue = `${
          changeInPassiveIncome >= 0 ? "+" : ""
        }£${changeInPassiveIncome.toLocaleString()}`;
        const valueColorClass =
          changeInPassiveIncome >= 0 ? "text-green-500" : "text-red-500";

        return (
          <DropdownItem
            key={account.id}
            label={account.name}
            value={formattedValue}
            valueClassName={valueColorClass}
          />
        );
      })}
    </UniversalDropdown>
  );
}
