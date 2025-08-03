import type { ChartData } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";

interface ExcessDropdown {
  yearData: ChartData;
}
export default function ExcessDropdown({ yearData }: ExcessDropdown) {
  /// Excess = Income - Expenses

  const yearExcess = (
    yearData?.totalIncome - yearData?.totalExpenses
  ).toLocaleString();
  console.log("year excess", yearExcess);

  return (
    <div>
      <UniversalDropdown
        title="Excess"
        defaultOpen={false}
        totalAmount={yearExcess}
      >
        <DropdownItem label="Total Excess" value={yearExcess} />
      </UniversalDropdown>
    </div>
  );
}
