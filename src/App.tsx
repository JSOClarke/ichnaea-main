import "./App.css";
import Dashboard from "./pages/Dashboard";
import { AccountProvider } from "./AccountsContext";
import { ExpensesProvider } from "./ExpensesContext";
import { IncomeProvider } from "./IncomeContext";
import ProjectionsPlan from "./pages/ProjectionsPlan";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accounts from "./pages/Accounts";

function App() {
  return (
    <>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
          }}
        >
          <AppSidebar />
          <IncomeProvider>
            <ExpensesProvider>
              <AccountProvider>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projections" element={<ProjectionsPlan />} />
                  <Route path="/accounts" element={<Accounts />} />
                </Routes>
              </AccountProvider>
            </ExpensesProvider>
          </IncomeProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
