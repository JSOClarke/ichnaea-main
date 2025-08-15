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

  const yearArray = useMemo(
    () => chartData.map((year) => year.year),
    [chartData]
  );
  return (
    <div className=" page-container bg-[#f1f4f9] flex flex-col w-full h-full p-4 overflow-y-auto">
      <div className="mb-4 bg-white p-2 flex rounded-xl">
        <TopBarRibbon
          yearArray={yearArray}
          setMilestones={setMilestones}
          yearDropdownItems={yearDropdownItems}
        />
      </div>
      {/* <div className="mb-4 bg-white p-2 flex rounded-xl ">
        <Milestone
          yearArray={yearArray}
          setMilestones={setMilestones}
          yearDropdownItems={yearDropdownItems}
        />
      </div> */}
      <div className="top-container flex w-full h-[80%]  p-4 bg-white rounded-xl">
        <div className="w-4/5 h-full outline-none shadow-none">
          <MoneyProjectionChart
            chartData={chartData}
            setYearBreakdown={setYearBreakdown}
            yearBreakdown={yearBreakdown}
            landmarkYears={milestones}
          />
        </div>
        <div className=" sidebar flex-1  mb-8 p-4 overflow-y-auto">
          <ProjectionBreakdown
            // startYear={startYear}
            year={yearBreakdown}
            chartData={chartData}
            setYearBreakdown={setYearBreakdown}
          />
        </div>
      </div>
      <div className="bottom-container flex flex-1 bg-white mt-4 rounded-xl">
        <BottomBar />
      </div>
      <div className="flex w-full"></div>
    </div>
  );
}
