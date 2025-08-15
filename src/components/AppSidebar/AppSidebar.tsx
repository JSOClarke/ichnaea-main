import { Home, Wallet, Telescope, Infinity } from "lucide-react";
import { Link } from "react-router-dom";

interface AppSidebarProps {}

export default function AppSidebar({}) {
  return (
    <div className="flex bg-[#30499f] text-white items-center justify-between  p-2">
      <div className="app-sidebar-container flex items-center justify-center">
        <div className=" flex flex-col items-center">
          <Infinity />
          Ichnaea
        </div>
        {/* <h2 className=" flex items-center text-[#e27a6d] font-bold "></h2> */}
      </div>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          paddingLeft: "1rem",
        }}
      >
        <Link to="/" className="flex gap-2 ">
          {/* <Home /> */}
          Dashboard
        </Link>
        <Link to="/accounts" className="flex gap-2">
          {/* <Wallet /> */}
          Accounts
        </Link>
        <Link to="/projections" className="flex gap-2">
          {/* <Telescope /> */}
          Projections
        </Link>

        {/* Add more links as needed */}
      </nav>
    </div>
  );
}
