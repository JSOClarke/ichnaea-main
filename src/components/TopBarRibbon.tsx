import { useState } from "react";
import Milestone from "./milestones/Milestone";
import type { ChartData } from "../../types/types";
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
    <div className="flex gap-4 min-h-8">
      <select
        name="seletors"
        id="selectors"
        onChange={handleSelectorChange}
        value={milestoneSelected}
      >
        {selectors.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      {/* <button className="bg-[#30499f] text-white px-4 py-2 rounded-xl">
        Milestones
      </button> */}
      <div>
        {milestoneSelected === "yearMilestone" ? (
          <Milestone
            yearArray={yearArray}
            setMilestones={setMilestones}
            yearDropdownItems={yearDropdownItems}
          />
        ) : null}
      </div>
      <div>
        {" "}
        {milestoneSelected === "conditionalMilestone" ? (
          <ConditionalMilestone
            yearArray={yearArray}
            setMilestones={setMilestones}
            yearDropdownItems={yearDropdownItems}
            chartData={chartData}
          />
        ) : null}
      </div>
    </div>
  );
}
