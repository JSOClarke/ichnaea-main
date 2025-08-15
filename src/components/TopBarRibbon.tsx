import { useState } from "react";
import Milestone from "./milestones/Milestone";
interface TopBarRibbonProps {
  yearArray: number[];
  setMilestones: (milestones: any) => void;
  yearDropdownItems: YearDropdownItem[];
}
const selectors = [
  { label: "Conditional Milestone", value: "conditionalMilestone" },
  { label: "Year Milestone", value: "yearMilestone" },
];

export default function TopBarRibbon({
  yearArray,
  setMilestones,
  yearDropdownItems,
}: TopBarRibbonProps) {
  const [milestoneSelected, setMilestoneSelected] = useState("");
  return (
    <div className="flex gap-4 min-h-8">
      <select
        name="seletors"
        id="selectors"
        onChange={(e) => setMilestoneSelected(e.target.value)}
      >
        {selectors.map((opt) => {
          return <option value={opt.value}>{opt.label}</option>;
        })}
      </select>
      {/* <button className="bg-[#30499f] text-white px-4 py-2 rounded-xl">
        Milestones
      </button> */}
      {milestoneSelected === "yearMilestone" ? (
        <Milestone
          yearArray={yearArray}
          setMilestones={setMilestones}
          yearDropdownItems={yearDropdownItems}
        />
      ) : null}
    </div>
  );
}
