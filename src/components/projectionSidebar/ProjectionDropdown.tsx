import type { ChartData } from "../../../types/types";
import { UniversalDropdown, DropdownItem } from "../ui/UniversalDropdown";

interface ProjectionDropdownProps {
  title: string;
  yearData: ChartData | undefined;
}

export default function ProjectionDropdown({
  title,
  yearData,
}: ProjectionDropdownProps) {
  const totalAmount = yearData
    ? `£${yearData.netWorth.toLocaleString()}`
    : undefined;

  return (
    <UniversalDropdown
      title={title}
      defaultOpen={false}
      totalAmount={totalAmount}
    >
      {yearData &&
        yearData.chartAccounts.map((item) => {
          const formattedValue = `£${item.amount.toLocaleString()}`;

          return (
            <DropdownItem
              key={item.accountId}
              label={item.accountName}
              value={formattedValue}
            />
          );
        })}
    </UniversalDropdown>
  );
}
