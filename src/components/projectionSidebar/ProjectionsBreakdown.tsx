import type { ChartData } from "../../../types/types";
import NetworthChangeDropdown from "./NetworthChangeDropdown";
import ProjectionDropdown from "./ProjectionDropdown";
import { useExpensesContext } from "../../ExpensesContext"; // adjust path as needed
import ExpensesDropDown from "./ExpensesDropDown";
import IncomeDropdown from "./IncomeDropdown";
// import PassiveIncomeDropdown from "./PassiveIncomeDropdown";
// import PassiveIncomeChangeDropdown from "./PassiveIncomeChangeDropdown";
import { useAccountContext } from "../../AccountsContext";
import { useIncomeContext } from "../../IncomeContext";
import ExcessDropdown from "./ExcessDropdown";
import ActualFundingDropdown from "./ActualFundingDropdown";
import NetworthDrop from "./NetworthDrop";
import { toAnnualAmount } from "../../utils/projectionsHelpers";

interface ProjectionBreakdownProps {
  year: number;
  chartData: ChartData[];
  setYearBreakdown: (year: number) => void;
}

export default function ProjectionBreakdown({
  year,
  chartData,
  setYearBreakdown,
}: ProjectionBreakdownProps) {
  const { expenses } = useExpensesContext(); // get expenses from context
  const { accounts } = useAccountContext(); // get accounts from context
  const { incomes } = useIncomeContext(); // get incomes from context

  const filtered = chartData.find((yearData) => yearData.year === year);
  const totalIncomeAmountFiltered = filtered?.totalAccountAmount ?? 0;

  // Calculate total expenses for the year (converted to annual)
  const totalExpensesAmountFiltered = expenses
    .filter((e) => e.duration.start <= year && e.duration.end >= year)
    .reduce((sum, e) => sum + toAnnualAmount(e.amount, e.frequency), 0);

  function findPreviousYearData(year: number) {
    if (year == 2025) {
      return undefined;
    } else {
      return chartData.find((yearData) => yearData.year === year - 1);
    }
  }

  function findYearData(year: number) {
    if (chartData) {
      return chartData.find((yearData) => yearData.year === year);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Year Selector Header */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Breakdown
          </label>
          <select
            name="year"
            id="yearSelect"
            className="w-full px-3 py-2 text-base font-medium bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={year}
            onChange={(e) => setYearBreakdown(Number(e.target.value))}
          >
            {chartData.map((item, idx) => {
              return (
                <option key={idx} value={item.year}>
                  Year {item.year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Breakdown Content */}
      <div className="flex-1 space-y-3">
        {filtered ? (
          <>
            <ProjectionDropdown title="Net Worth" yearData={filtered} />
            <NetworthChangeDropdown
              title="Net Worth Change"
              previousYearData={findPreviousYearData(year)}
              currentYearData={filtered}
            />
            <IncomeDropdown incomes={incomes} year={year} />
            <ExpensesDropDown expenses={expenses} year={year} />
            <ExcessDropdown yearData={findYearData(year)} />
            <ActualFundingDropdown yearData={findYearData(year)} />
          </>
        ) : (
          <div className="flex items-center justify-center p-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm">No data available for this year</span>
          </div>
        )}
      </div>
    </div>
  );
}
