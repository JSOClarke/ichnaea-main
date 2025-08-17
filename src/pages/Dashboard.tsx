import NetWorthWidget from "../components/dashboard/NetWorthWidget";
import AssetsWidget from "../components/dashboard/AssetsWidget";

export default function Dashboard() {
  return (
    <>
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-4">
          <NetWorthWidget />
          <AssetsWidget />
        </div>
      </div>
    </>
  );
}
