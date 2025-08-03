import { useState } from "react";
import type { MilestoneType, YearDropdownItem } from "../../../types/types";

interface MilestoneProps {
  yearArray: number[];
  setMilestones: (milestones: any) => void;
  yearDropdownItems: YearDropdownItem[];
}

export default function Milestone({
  yearArray,
  setMilestones,
  yearDropdownItems,
}: MilestoneProps) {
  const [milestoneYear, setMilestoneYear] = useState<number>();
  const [milestoneTitle, setMilestoneTitle] = useState<string>();

  function handleMilestoneAdd() {
    const newMilestones: MilestoneType = {
      year: milestoneYear,
      label: milestoneTitle,
      color: "red",
      strokeColor: "blue",
      radius: 12,
    };
    setMilestones((prev) => [...prev, newMilestones]);
    setMilestoneTitle("");
    setMilestoneYear(yearArray[0]);
  }
  return (
    <div className="flex p-8 ">
      <div className="flex">
        <label>Title</label>
        <input
          type="text"
          className="border border-red-200"
          onChange={(e) => setMilestoneTitle(e.target.value)}
        />
      </div>
      <div className="flex">
        <label>Year</label>
        <select
          name="milestone-year"
          id="milestone-year"
          onChange={(e) => setMilestoneYear(Number(e.target.value))}
        >
          {(yearDropdownItems ?? []).map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>{" "}
      </div>
      <div>
        <button onClick={() => handleMilestoneAdd()}> Add Milestone</button>
      </div>
      {/* <div className="flex">
        <label>Color</label>
        <input type="text" className="border border-red-200" />
      </div> */}
    </div>
  );
}
