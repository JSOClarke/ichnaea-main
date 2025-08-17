import { Sankey, Tooltip } from "recharts";
import { useProjectionsContext } from "../../ProjectionsContext";
import { useState } from "react";
import type { ChartData } from "../../../types/types";
// import { SankeyData } from "./SankeyData";

export default function UniversalSankeyDiagram() {
  const { chartData } = useProjectionsContext();

  const [selectedYear, setSelectedYear] = useState();

  function findYearData(year: number) {
    if (chartData) {
      return chartData.find((yearData) => yearData.year === year);
    }
  }

  const rawData: ChartData = findYearData(2026);
  const expenses = rawData.totalExpenses;
  const excessCash = rawData.totalIncome - rawData.totalExpenses;
  const funding = rawData.chartAccounts.reduce((curr, acc) => {
    return curr + acc.fundedAnnualContribution;
  }, 0);

  const SankeyData = {
    nodes: [
      { name: "Income" }, // index 0
      { name: "Passive Income" }, // index 1
      { name: "Expenses" }, // index 2
      { name: "Savings" }, // index 3
      { name: "Rent" }, // index 4
      { name: "Bills" }, // index 5
      { name: "Food" }, // index 6
      { name: "Pension" }, // index 7
      { name: "ISA" }, // index 8
      { name: "SSISA" }, //index 9
    ],
    links: [
      { source: 0, target: 2, value: expenses },
      { source: 0, target: 3, value: funding },
    ],
  };

  return (
    <div>
      <Sankey
        width={1000}
        height={1000}
        data={SankeyData}
        nodePadding={50}
        margin={{
          left: 200,
          right: 200,
          top: 100,
          bottom: 100,
        }}
        link={{ stroke: "#77c878" }}
      >
        <Tooltip />
      </Sankey>
    </div>
  );
}
