import { useState } from "react";
import type { MilestoneType, YearDropdownItem } from "../../../types/types";

interface MilestoneProps {
  yearArray: number[];
  setMilestones: (
    milestones: (prev: MilestoneType[]) => MilestoneType[]
  ) => void;
  yearDropdownItems: YearDropdownItem[];
}

export default function Milestone({
  yearArray,
  setMilestones,
  yearDropdownItems,
}: MilestoneProps) {
  const [milestoneYear, setMilestoneYear] = useState<number>(
    yearArray[0] || 2025
  );
  const [milestoneTitle, setMilestoneTitle] = useState<string>("");

  function handleMilestoneAdd() {
    if (!milestoneTitle.trim()) {
      return;
    }

    const newMilestones: MilestoneType = {
      year: milestoneYear,
      label: milestoneTitle,
      color: "red",
      strokeColor: "white",
      radius: 8,
    };
    setMilestones((prev) => [...prev, newMilestones]);
    setMilestoneTitle("");
    setMilestoneYear(yearArray[0] || 2025);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Name:
        </label>
        <input
          type="text"
          value={milestoneTitle}
          placeholder="e.g., Retirement"
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32"
          onChange={(e) => setMilestoneTitle(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Year:
        </label>
        <select
          name="milestone-year"
          id="milestone-year"
          value={milestoneYear}
          onChange={(e) => setMilestoneYear(Number(e.target.value))}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32"
        >
          {(yearDropdownItems ?? []).map((item, idx) => (
            <option key={idx} value={item.value} className="text-sm">
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleMilestoneAdd}
        disabled={!milestoneTitle.trim()}
        className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Add Milestone
      </button>
    </div>
  );
}
