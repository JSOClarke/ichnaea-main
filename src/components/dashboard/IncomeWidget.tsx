import { useProjectionsContext } from "../../ProjectionsContext";
import UniversalWidget from "./UniversalWidget";

export default function IncomeWidget() {
  const { chartData } = useProjectionsContext();

  const todayDate = new Date();
  console.log(todayDate);
  const todayYear = todayDate.getFullYear();
  console.log(todayYear);
  console.log(chartData[0]);
  // const yearIncome = chartData.find((i) => i.year === todayDate);

  // console.log("yearIncome", yearIncome);
  // const totalIncomes = incomes.reduce((curr, source) => {
  //   return curr + source.amount;
  // }, 0);

  return <UniversalWidget title="Income" value={chartData[0].totalIncome} />;
}
