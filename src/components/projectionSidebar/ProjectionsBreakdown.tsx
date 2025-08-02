import type { ChartData } from "../../../types/types";
import NetworthChangeDropdown from "./NetworthChangeDropdown";
import ProjectionDropdown from "./ProjectionDropdown";
import { useExpensesContext } from "../../ExpensesContext"; // adjust path as needed
import ExpensesDropDown from "./ExpensesDropDown";
import IncomeDropdown from "./IncomeDropdown";
import PassiveIncomeDropdown from "./PassiveIncomeDropdown";
import PassiveIncomeChangeDropdown from "./PassiveIncomeChangeDropdown";
import { useAccountContext } from "../../AccountsContext";
import { useIncomeContext } from "../../IncomeContext";

interface ProjectionBreakdownProps {
  year: number;
  chartData: ChartData[];
}

export default function ProjectionBreakdown({
  year,
  chartData,
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

  return (
    <div className="flex flex-col">
      <div>Year: {year}</div>
      <div>
        NetWorth: £
        {(
          totalIncomeAmountFiltered - totalExpensesAmountFiltered
        ).toLocaleString()}
      </div>
      <div>Total Income: £{totalIncomeAmountFiltered.toLocaleString()}</div>
      <div>Total Expenses: £{totalExpensesAmountFiltered.toLocaleString()}</div>
      <div className="flex flex-col">
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
        <PassiveIncomeDropdown accounts={accounts} year={year} />
        <PassiveIncomeChangeDropdown
          title="Change in Passive Income"
          accounts={accounts}
          currentYear={year}
        />
      </div>
    </div>
  );
}
