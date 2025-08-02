import type { Account } from "../../types/types";
import NetWorthWidget from "../components/dashboard/NetWorthWidget";
import AssetsWidget from "../components/dashboard/AssetsWidget";

export default function Dashboard() {
  return (
    <>
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <NetWorthWidget />
          <AssetsWidget />
        </div>
      </div>
    </>
  );
}
