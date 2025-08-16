import MoneyProjectionChart from "../components/projectionSidebar/MoneyProjectionsChart";
import ProjectionBreakdown from "../components/projectionSidebar/ProjectionsBreakdown";
import { useState, useMemo } from "react";
import BottomBar from "../projectionsBottomBar/BottomBar";
import Milestone from "../components/milestones/Milestone";
import { useProjectionsContext } from "../ProjectionsContext";
import TopBarRibbon from "../components/TopBarRibbon";

export default function ProjectionsPlan() {
  const { yearDropdownItems, setMilestones, milestones, chartData } =
    useProjectionsContext();
  const [yearBreakdown, setYearBreakdown] = useState<number>(
    chartData[0]?.year
  );
  console.log("chartData", chartData);
  const yearArray = useMemo(
    () => chartData.map((year) => year.year),
    [chartData]
  );
  return (
    <div className="page-container bg-[#f1f4f9] flex flex-col w-full h-screen p-4 gap-4">
      {/* Top Ribbon - Fixed height */}
      <div className="bg-white rounded-xl flex-shrink-0">
        <TopBarRibbon
          yearArray={yearArray}
          setMilestones={setMilestones}
          yearDropdownItems={yearDropdownItems}
          chartData={chartData}
        />
      </div>

      {/* Main Content Area - Takes remaining space */}
      <div className="flex flex-1 gap-4 min-h-0">
        {/* Chart and Sidebar Container */}
        <div className="flex flex-1 bg-white rounded-xl p-4 min-h-0">
          <div className="w-4/5 h-full">
            <MoneyProjectionChart
              chartData={chartData}
              setYearBreakdown={setYearBreakdown}
              yearBreakdown={yearBreakdown}
              landmarkYears={milestones}
            />
          </div>
          <div className="flex-1 p-4 overflow-y-auto min-w-0">
            <ProjectionBreakdown
              year={yearBreakdown}
              chartData={chartData}
              setYearBreakdown={setYearBreakdown}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar - Flexible height but constrained */}
      <div className="bg-white rounded-xl flex-shrink-0 min-h-[300px] max-h-[400px]">
        <BottomBar />
      </div>
    </div>
  );
}
