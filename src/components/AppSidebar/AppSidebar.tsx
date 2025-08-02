import { Home, Wallet, Telescope } from "lucide-react";
import { Link } from "react-router-dom";

interface AppSidebarProps {}

export default function AppSidebar({}) {
  return (
    <div className="flex bg-white">
      <div className="app-sidebar-container flex items-center justify-center">
        <h2>Menu</h2>
      </div>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          paddingLeft: "1rem",
        }}
      >
        <Link to="/" className="flex gap-2">
          <Home />
          Dashboard
        </Link>
        <Link to="/accounts" className="flex gap-2">
          <Wallet />
          Accounts
        </Link>
        <Link to="/projections" className="flex gap-2">
          <Telescope />
          Projections
        </Link>

        {/* Add more links as needed */}
      </nav>
    </div>
  );
}
