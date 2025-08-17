import "./App.css";
import Dashboard from "./pages/Dashboard";
import { AccountProvider } from "./AccountsContext";
import { ExpensesProvider } from "./ExpensesContext";
import { IncomeProvider } from "./IncomeContext";
import { ProjectionsProvider } from "./ProjectionsContext";
import ProjectionsPlan from "./pages/ProjectionsPlan";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accounts from "./pages/Accounts";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[auto_1fr] h-screen w-screen">
          <AppSidebar />
          <div className="overflow-auto">
            {/* Main content */}
            <IncomeProvider>
              <ExpensesProvider>
                <AccountProvider>
                  <ProjectionsProvider>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route
                        path="/projections"
                        element={<ProjectionsPlan />}
                      />
                      <Route path="/accounts" element={<Accounts />} />
                    </Routes>
                  </ProjectionsProvider>
                </AccountProvider>
              </ExpensesProvider>
            </IncomeProvider>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
