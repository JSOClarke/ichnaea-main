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

  // Calculate total expenses for the year
  const totalExpensesAmountFiltered = expenses
    .filter((e) => e.duration.start <= year && e.duration.end >= year)
    .reduce((sum, e) => sum + e.amount, 0);

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
    <div className="flex flex-col">
      <div className="header flex">
        <div className="flex flex-1">
          <select
            name="year"
            id="yearSelect"
            className="w-full"
            value={year}
            onChange={(e) => setYearBreakdown(Number(e.target.value))}
          >
            {chartData.map((item, idx) => {
              return (
                <option key={idx} value={item.year}>
                  {`Year ${item.year}`}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex-1 flex-col">
        {filtered ? (
          <ProjectionDropdown title="Networth" yearData={filtered} />
        ) : (
          "No Data Found"
        )}

        <NetworthChangeDropdown
          title="Change in Networth"
          previousYearData={findPreviousYearData(year)}
          currentYearData={filtered}
        />
        <IncomeDropdown incomes={incomes} year={year} />
        <ExpensesDropDown expenses={expenses} year={year} />
        {/* <PassiveIncomeDropdown accounts={accounts} year={year} />
        <PassiveIncomeChangeDropdown
          title="Change in Passive Income"
          accounts={accounts}
          currentYear={year}
        /> */}
        <ExcessDropdown yearData={findYearData(year)} />
        <ActualFundingDropdown yearData={findYearData(year)} />
        {/* <NetworthDrop yearData={findYearData(year)} /> */}
      </div>
    </div>
  );
}
