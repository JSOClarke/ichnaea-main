import { useState } from "react";
import type {
  ChartData,
  MilestoneType,
  YearDropdownItem,
} from "../../../types/types";
import FormattedNumberInput from "../ui/FormattedNumberInput";

interface ConditionalMilestoneProps {
  yearArray: number[];
  setMilestones: (milestones: any) => void;
  yearDropdownItems: YearDropdownItem[];
  chartData: ChartData[];
}

export default function ConditionalMilestone({
  yearArray,
  setMilestones,
  yearDropdownItems,
  chartData,
}: ConditionalMilestoneProps) {
  const [milestoneAmount, setMilestoneAmount] = useState<number>();
  const [milestoneTitle, setMilestoneTitle] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function findConditionalMilestone(amount: number) {
    if (!amount) {
      return null;
    }
    const conditonalMilestoneYear = chartData.find(
      (entry) => entry.netWorth >= 100000
    );
    console.log("conditional milestone data", conditonalMilestoneYear);
    return conditonalMilestoneYear;
  }

  function handleMilestoneAdd() {
    if (!milestoneAmount) {
      return null;
    }

    const foundConditionalYear = findConditionalMilestone(milestoneAmount);
    if (!foundConditionalYear) {
      return null;
    }
    const newMilestones: MilestoneType = {
      year: foundConditionalYear.year,
      label: milestoneTitle,
      color: "red",
      strokeColor: "white",
      radius: 8,
    };
    setMilestones((prev) => [...prev, newMilestones]);
    setMilestoneTitle("");
    setMilestoneAmount("");
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
        <label className="text-sm mr-2">Milestone Amount:</label>
        <input
          type="number"
          value={milestoneAmount}
          className="border border-red-200 mr-2"
          onChange={(e) => setMilestoneAmount(Number(e.target.value))}
        />{" "}
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
