import { useAccountContext } from "../AccountsContext";
import MoneyProjectionChart from "../components/projectionSidebar/MoneyProjectionsChart";
import { useExpensesContext } from "../ExpensesContext";
import { useIncomeContext } from "../IncomeContext";
import { getCombinedCompoundProjections } from "../utils/projectionsHelpers";
import ProjectionBreakdown from "../components/projectionSidebar/ProjectionsBreakdown";
import { useState, useMemo } from "react";
import BottomBar from "../projectionsBottomBar/BottomBar";
export default function ProjectionsPlan() {
  const [yearProjection] = useState<number>(10);
  // const [startYear, setStartYear] = useState<number>(2025);
  // const [endYear, endYear] = useState<number>()
  const { accounts } = useAccountContext();
  const { expenses } = useExpensesContext();
  const { incomes } = useIncomeContext();

  const chartData = useMemo(() => {
    console.log("Recalculating chart data", {
      accountsLength: accounts.length,
      expensesLength: expenses.length,
      incomesLength: incomes.length,
    });
    return getCombinedCompoundProjections(
      accounts,
      expenses,
      incomes,
      2025,
      70
    );
  }, [accounts, expenses, incomes]);

  const [yearBreakdown, setYearBreakdown] = useState<number>(chartData[0].year);

  // Define landmark years for important financial milestones
  const landmarkYears = [
    {
      year: 2063,
      label: "Retirement Age",
      color: "orange",
      strokeColor: "white",
      radius: 12,
    },
    {
      year: 2040,
      label: "Full Pension",
      color: "green",
      strokeColor: "white",
      radius: 8,
    },
  ];

  return (
    <div className=" page-container flex flex-col w-full h-full p-8">
      <div className="top-container flex w-full h-[60%] border border-red-500">
        <div className="w-4/5 h-full outline-none shadow-none">
          <MoneyProjectionChart
            chartData={chartData}
            setYearBreakdown={setYearBreakdown}
            yearBreakdown={yearBreakdown}
            landmarkYears={landmarkYears}
          />
        </div>
        <div className="flex-1 p-8">
          <ProjectionBreakdown
            // startYear={startYear}
            year={yearBreakdown}
            chartData={chartData}
          />
        </div>
      </div>
      <div className="bottom-container flex flex-1 border border-blue-500">
        <BottomBar />
      </div>
    </div>
  );
}
