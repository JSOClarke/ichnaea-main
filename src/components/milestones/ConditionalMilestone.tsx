import { useState } from "react";
import type { ChartData, MilestoneType } from "../../../types/types";
import FormattedNumberInput from "../ui/FormattedNumberInput";

interface ConditionalMilestoneProps {
  setMilestones: (
    milestones: (prev: MilestoneType[]) => MilestoneType[]
  ) => void;
  chartData: ChartData[];
}

export default function ConditionalMilestone({
  setMilestones,
  chartData,
}: ConditionalMilestoneProps) {
  const [milestoneAmount, setMilestoneAmount] = useState<number>(0);
  const [milestoneTitle, setMilestoneTitle] = useState<string>("");

  function findConditionalMilestone(amount: number) {
    if (!amount) {
      return null;
    }
    const conditonalMilestoneYear = chartData.find(
      (entry) => entry.netWorth >= amount
    );
    console.log("conditional milestone data", conditonalMilestoneYear);
    return conditonalMilestoneYear;
  }

  function handleMilestoneAdd() {
    if (!milestoneAmount || !milestoneTitle.trim()) {
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
      isConditional: true,
      targetAmount: milestoneAmount,
    };
    setMilestones((prev) => [...prev, newMilestones]);
    setMilestoneTitle("");
    setMilestoneAmount(0);
  }
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 flex-1">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Name:
          </label>
          <input
            type="text"
            value={milestoneTitle}
            placeholder="e.g., First 100K"
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-32"
            onChange={(e) => setMilestoneTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Amount:
          </label>
          <FormattedNumberInput
            value={milestoneAmount}
            onChange={setMilestoneAmount}
            placeholder="100,000"
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-32"
          />
        </div>
      </div>

      <button
        onClick={handleMilestoneAdd}
        disabled={!milestoneAmount || !milestoneTitle.trim()}
        className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Add Milestone
      </button>
    </div>
  );
}
