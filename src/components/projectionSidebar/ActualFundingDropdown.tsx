import type { ChartData } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";

interface ActualFundingDropdownProps {
  yearData: ChartData;
}

export default function ActualFundingDropdown({
  yearData,
}: ActualFundingDropdownProps) {
  return (
    <div>
      <UniversalDropdown title="Actual Funding Dropdown" defaultOpen={false}>
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
