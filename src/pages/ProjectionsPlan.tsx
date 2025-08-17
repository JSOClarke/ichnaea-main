import MoneyProjectionChart from "../components/projectionSidebar/MoneyProjectionsChart";
import ProjectionBreakdown from "../components/projectionSidebar/ProjectionsBreakdown";
import { useState, useMemo } from "react";
import BottomBar from "../projectionsBottomBar/BottomBar";
import { useProjectionsContext } from "../ProjectionsContext";
import TopBarRibbon from "../components/TopBarRibbon";
import YearSelector from "../components/YearSelector";

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
    <div className="bg-[#f1f4f9] w-full p-4 space-y-4">
      {/* Top Ribbon */}
      <div className="bg-white rounded-xl flex-shrink-0 md:h-20">
        <TopBarRibbon
          yearArray={yearArray}
          setMilestones={setMilestones}
          yearDropdownItems={yearDropdownItems}
          chartData={chartData}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Chart and Sidebar Container */}
        <div className="flex flex-col lg:flex-row bg-white rounded-xl p-2 w-full md:max-h-[500px]">
          <div className="lg:w-4/5 h-[300px] sm:h-[400px] md:h-[500px] flex-shrink-0">
            <MoneyProjectionChart
              chartData={chartData}
              setYearBreakdown={setYearBreakdown}
              yearBreakdown={yearBreakdown}
              landmarkYears={milestones}
            />
          </div>
          <div className="flex-1 flex flex-col p-2 min-w-0 max-h-[500px]">
            <div className="flex-shrink-0">
              <YearSelector
                chartData={chartData}
                setYearBreakdown={setYearBreakdown}
                year={yearBreakdown}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <ProjectionBreakdown year={yearBreakdown} chartData={chartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white rounded-xl flex-shrink-0">
        <BottomBar />
      </div>
    </div>
  );
}
