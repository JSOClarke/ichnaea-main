import { useState } from "react";
import Milestone from "./milestones/Milestone";
import type { ChartData, YearDropdownItem } from "../../types/types";
import ConditionalMilestone from "./milestones/ConditionalMilestone";

interface TopBarRibbonProps {
  yearArray: number[];
  setMilestones: (milestones: any) => void;
  yearDropdownItems: YearDropdownItem[];
  chartData: ChartData[];
}

const selectors = [
  { label: "Conditional Milestone", value: "conditionalMilestone" },
  { label: "Year Milestone", value: "yearMilestone" },
];

export default function TopBarRibbon({
  yearArray,
  setMilestones,
  yearDropdownItems,
  chartData,
}: TopBarRibbonProps) {
  const [milestoneSelected, setMilestoneSelected] = useState(
    selectors[0].value
  );

  const handleSelectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMilestoneSelected(e.target.value);
    // Remove focus from the select element
    e.target.blur();
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Type:</label>
        <select
          name="selectors"
          id="selectors"
          onChange={handleSelectorChange}
          value={milestoneSelected}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {selectors.map((opt) => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex-1 min-w-0 flex items-center">
        {milestoneSelected === "yearMilestone" && (
          <Milestone
            yearArray={yearArray}
            setMilestones={setMilestones}
            yearDropdownItems={yearDropdownItems}
          />
        )}

        {milestoneSelected === "conditionalMilestone" && (
          <ConditionalMilestone
            setMilestones={setMilestones}
            chartData={chartData}
          />
        )}
      </div>
    </div>
  );
}
