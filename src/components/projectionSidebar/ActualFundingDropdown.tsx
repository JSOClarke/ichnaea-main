import type { ChartData } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";

interface ActualFundingDropdownProps {
  yearData: ChartData;
}

export default function ActualFundingDropdown({
  yearData,
}: ActualFundingDropdownProps) {
  const fundedAccounts = yearData.chartAccounts.filter(
    (acc) => acc.fundedAnnualContribution > 0
  );
  const withdrawnAccounts = yearData.chartAccounts.filter(
    (acc) => (acc.savingsWithdrawn || 0) > 0
  );

  const totalAmountFunded = yearData.chartAccounts.reduce((curr, acc) => {
    return curr + Math.max(0, acc.fundedAnnualContribution);
  }, 0);

  const totalAmountWithdrawn = yearData.chartAccounts.reduce((curr, acc) => {
    return curr + (acc.savingsWithdrawn || 0);
  }, 0);

  const hasWithdrawals = totalAmountWithdrawn > 0;
  const hasFunding = totalAmountFunded > 0;

  // Determine title and total based on what's happening
  let title = "Account Activity";
  let totalDisplay = "";

  if (hasWithdrawals && hasFunding) {
    totalDisplay = `+£${totalAmountFunded.toLocaleString()} / -£${totalAmountWithdrawn.toLocaleString()}`;
  } else if (hasWithdrawals) {
    title = "Savings Consumed";
    totalDisplay = `-£${totalAmountWithdrawn.toLocaleString()}`;
  } else if (hasFunding) {
    title = "Funding Split";
    totalDisplay = `+£${totalAmountFunded.toLocaleString()}`;
  } else {
    totalDisplay = "£0";
  }

  return (
    <div>
      <UniversalDropdown
        title={title}
        defaultOpen={hasWithdrawals} // Auto-open when there are withdrawals
        totalAmount={totalDisplay}
      >
        {/* Show withdrawals first (more important) */}
        {withdrawnAccounts.map((chartAcc) => {
          return (
            <DropdownItem
              key={`withdraw-${chartAcc.accountId}`}
              label={`${chartAcc.accountName} (Withdrawn)`}
              value={`-£${(chartAcc.savingsWithdrawn || 0).toLocaleString()}`}
              valueClassName="text-red-600 font-semibold"
            />
          );
        })}

        {/* Then show funding */}
        {fundedAccounts.map((chartAcc) => {
          return (
            <DropdownItem
              key={`fund-${chartAcc.accountId}`}
              label={chartAcc.accountName}
              value={`+£${chartAcc.fundedAnnualContribution.toLocaleString()}`}
              valueClassName="text-green-600"
            />
          );
        })}

        {/* Show zero-activity accounts if no withdrawals or funding */}
        {!hasWithdrawals &&
          !hasFunding &&
          yearData.chartAccounts.map((chartAcc) => {
            return (
              <DropdownItem
                key={chartAcc.accountId}
                label={chartAcc.accountName}
                value="£0"
                valueClassName="text-gray-500"
              />
            );
          })}
      </UniversalDropdown>
    </div>
  );
}
