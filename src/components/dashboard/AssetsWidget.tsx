import { useAccountContext } from "../../AccountsContext";

export default function AssetsWidget() {
  const { accounts } = useAccountContext();
  const networthAmount = accounts.reduce((curr, acc) => curr + acc.amount, 0);
  return (
    <div className="widget-container">
      <div className="widget-title">Assets</div>

      <div className="widget-value"> </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderWidth: 2,
          borderColor: "gray",
          borderStyle: "solid",
        }}
        className="asset-card-container"
      >
        {accounts.map((acc) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                borderWidth: 2,
              }}
              key={acc.id}
            >
              {acc.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
