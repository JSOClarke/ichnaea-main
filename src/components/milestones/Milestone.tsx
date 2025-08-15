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
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function handleMilestoneAdd() {
    const newMilestones: MilestoneType = {
      year: milestoneYear,
      label: milestoneTitle,
      color: "red",
      strokeColor: "white",
      radius: 8,
    };
    setMilestones((prev) => [...prev, newMilestones]);
    setMilestoneTitle("");
    setMilestoneYear(yearArray[0]);
  }
  return (
    <div className="flex items-center">
      <div className="flex items-center ">
        <label className="text-sm mr-2">Milestone Name:</label>
        <input
          type="text"
          value={milestoneTitle}
          className="border border-red-200 mr-2"
          onChange={(e) => setMilestoneTitle(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center px-2">
        <select
          name="milestone-year"
          id="milestone-year"
          value={milestoneYear}
          onChange={(e) => setMilestoneYear(Number(e.target.value))}
          className="text-sm "
        >
          {(yearDropdownItems ?? []).map((item, idx) => (
            <option key={idx} value={item.value} className="text-sm">
              {item.label}
            </option>
          ))}
        </select>{" "}
      </div>
      <div>
        <button
          onClick={() => handleMilestoneAdd()}
          className="bg-blue-300 text-white p-1 text-sm rounded-xl flex items-center justify-center hover:bg-blue-900"
        >
          {" "}
          Add Milestone
        </button>
      </div>
      {/* <div className="flex">
        <label>Color</label>
        <input type="text" className="border border-red-200" />
      </div> */}
    </div>
  );
}
