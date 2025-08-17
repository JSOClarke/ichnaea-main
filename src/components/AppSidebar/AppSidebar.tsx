import { Home, Wallet, Telescope, Infinity, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      toggleMenu();
    }
  };

  return (
    <div className="bg-[#30499f] text-white md:w-64 md:min-h-screen p-4 flex flex-col">
      <div className="flex items-center justify-between md:flex-col md:items-center">
        <div className="flex flex-col items-center">
          <Infinity />
          Ichnaea
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col md:flex md:flex-col md:items-start md:gap-4 mt-4 md:mt-8`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 py-2"
          onClick={handleLinkClick}
        >
          <Home />
          Dashboard
        </Link>
        <Link
          to="/accounts"
          className="flex items-center gap-2 py-2"
          onClick={handleLinkClick}
        >
          <Wallet />
          Accounts
        </Link>
        <Link
          to="/projections"
          className="flex items-center gap-2 py-2"
          onClick={handleLinkClick}
        >
          <Telescope />
          Projections
        </Link>
      </nav>
    </div>
  );
}
