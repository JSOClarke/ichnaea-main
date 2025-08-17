import NetWorthWidget from "../components/dashboard/NetWorthWidget";
import AssetsWidget from "../components/dashboard/AssetsWidget";
import UniversalWidget from "../components/dashboard/UniversalWidget";
import IncomeWidget from "../components/dashboard/IncomeWidget";
import AccountWidget from "../components/dashboard/AccountWidget";
import ExpensesWidget from "../components/dashboard/ExpensesWidget";
import UniversalPieChart from "../components/UniversalPieChart";
import UniversalSankeyDiagram from "../components/SankeyDiagram/UniversalSankeyDiagram";
export default function Dashboard() {
  return (
    <>
      <div className="page-container flex flex-col w-full h-full bg-[#f1f4f9] p-4 md:p-8 ">
        <div className="flex gap-4 content-header-contiainer w-full">
          <IncomeWidget />
          <AccountWidget />
          <ExpensesWidget />
          {/* <NetWorthWidget />
          <AssetsWidget /> */}
        </div>
        <div className="content-container mt-10">
          {/* <UniversalPieChart /> */}
          <UniversalSankeyDiagram />
        </div>
      </div>
    </>
  );
}
