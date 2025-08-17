import { useAccountContext } from "../../AccountsContext";

export default function NetWorthWidget() {
  const { accounts } = useAccountContext();
  const networthAmount = accounts.reduce((curr, acc) => curr + acc.amount, 0);
  return (
    <div className="widget-container">
      <div className="widget-title">Netwoth Amount</div>

      <div className="widget-value">£{networthAmount.toLocaleString()}</div>
    </div>
  );
}
