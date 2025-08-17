import { useExpensesContext } from "../../ExpensesContext";
import UniversalWidget from "./UniversalWidget";

export default function ExpensesWidget() {
  const { expenses } = useExpensesContext();

  const totalExpenses = expenses.reduce((curr, source) => {
    return curr + source.amount;
  }, 0);

  return <UniversalWidget title="Expenses" value={totalExpenses} />;
}
