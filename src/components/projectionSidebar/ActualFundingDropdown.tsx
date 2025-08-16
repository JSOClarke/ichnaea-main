import type { ChartData } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";

interface ActualFundingDropdownProps {
  yearData: ChartData;
}

export default function ActualFundingDropdown({
  yearData,
}: ActualFundingDropdownProps) {
  const lengthOfFundedAccounts = yearData.chartAccounts.filter(
    (acc) => acc.fundedAnnualContribution > 0
  ).length;
  const totalNumberOfAccounts = yearData.chartAccounts.filter(
    (acc) => acc.fundedAnnualContribution >= 0
  ).length;

  // console.log("numberOfFundedAccounts", numberOfFundedAccounts);

  const totalAmountFunded = yearData.chartAccounts.reduce((curr, acc) => {
    return curr + acc.fundedAnnualContribution;
  }, 0);
  return (
    <div>
      <UniversalDropdown
        title="Funding Split"
        defaultOpen={false}
        totalAmount={`£${totalAmountFunded.toLocaleString()} (${lengthOfFundedAccounts}/${totalNumberOfAccounts}) `}
      >
        {yearData.chartAccounts.map((chartAcc) => {
          return (
            <DropdownItem
              key={chartAcc.accountId}
              label={chartAcc.accountName}
              value={`A: ${chartAcc.fundedAnnualContribution.toLocaleString()}, M:${chartAcc.fundedMonthlyContribution.toLocaleString()} `}
            />
          );
        })}
      </UniversalDropdown>
    </div>
  );
}
