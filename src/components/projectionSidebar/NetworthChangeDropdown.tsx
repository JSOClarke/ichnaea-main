import type { ChartData } from "../../../types/types";
import { UniversalDropdown, DropdownItem } from "../ui/UniversalDropdown";

interface NetworthChangeDropdownProps {
  title: string;
  previousYearData: ChartData | undefined;
  currentYearData: ChartData | undefined;
}

export default function NetworthChangeDropdown({
  title,
  previousYearData,
  currentYearData,
}: NetworthChangeDropdownProps) {
  console.log("prevyeardata", previousYearData);

  // Calculate total change in networth
  const totalChange =
    currentYearData && previousYearData
      ? currentYearData.totalAccountAmount - previousYearData.totalAccountAmount
      : currentYearData?.totalAccountAmount || 0;

  const totalAmount = `${
    totalChange >= 0 ? "+" : ""
  }£${totalChange.toLocaleString()}`;

  return (
    <UniversalDropdown
      title={title}
      defaultOpen={false}
      totalAmount={totalAmount}
    >
      {currentYearData &&
        currentYearData.chartAccounts.map((item) => {
          const previousAccount = previousYearData
            ? previousYearData.chartAccounts.find(
                (acc) => acc.accountId === item.accountId
              )
            : undefined;
          const changeInNetworth = previousAccount
            ? item.amount - previousAccount.amount
            : 0;
          console.log("previousAccount", previousAccount?.amount);
          console.log("currentAccount", item.amount);

          const formattedValue = `${
            changeInNetworth >= 0 ? "+" : ""
          }£${changeInNetworth.toLocaleString()}`;
          const valueColorClass =
            changeInNetworth >= 0 ? "text-green-500" : "text-red-500";

          return (
            <DropdownItem
              key={item.accountId}
              label={item.accountName}
              value={formattedValue}
              valueClassName={valueColorClass}
            />
          );
        })}
    </UniversalDropdown>
  );
}
