import type { ChartData } from "../../../types/types";
import { DropdownItem, UniversalDropdown } from "../ui/UniversalDropdown";

interface NetworthDropProps {
  yearData: ChartData;
}

export default function NetworthDrop({ yearData }: NetworthDropProps) {
  return (
    <div>
      <UniversalDropdown title="Networth NEW" defaultOpen={false}>
        {yearData.chartAccounts.map((item) => {
          return <DropdownItem label={item.accountName} value={item.amount} />;
        })}
      </UniversalDropdown>
    </div>
  );
}
