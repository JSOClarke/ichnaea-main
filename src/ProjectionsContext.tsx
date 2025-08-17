import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import type { MilestoneType, YearDropdownItem } from "../types/types";
import { useAccountContext } from "./AccountsContext";
import { useExpensesContext } from "./ExpensesContext";
import { useIncomeContext } from "./IncomeContext";
import { getCombinedCompoundProjections } from "./utils/projectionsHelpers";

interface ProjectionsContextType {
  yearDropdownItems: YearDropdownItem[];
  setMilestones: React.Dispatch<React.SetStateAction<MilestoneType[]>>;
  milestones: MilestoneType[];
  chartData: any[]; // Consider defining a more specific type for chartData
}

const ProjectionsContext = createContext<ProjectionsContextType | undefined>(
  undefined
);

export const ProjectionsProvider = ({ children }: { children: ReactNode }) => {
  const { accounts } = useAccountContext();
  const { expenses } = useExpensesContext();
  const { incomes } = useIncomeContext();

  const [userYOB] = useState<number>(2000);
  const retirementAge = 85;
  const deathAge = 85;
  const currentYear = 2025;
  const retirementAgeProjection = userYOB + retirementAge - currentYear;

  const chartData = useMemo(() => {
    return getCombinedCompoundProjections(
      accounts,
      expenses,
      incomes,
      currentYear,
      retirementAgeProjection
    );
  }, [accounts, expenses, incomes, retirementAgeProjection]);

  const yearArray = useMemo(
    () => chartData.map((year) => year.year),
    [chartData]
  );

  const initialMilestones: MilestoneType[] = [
    {
      year: 2067,
      label: "Retirement Age",
      color: "orange",
      strokeColor: "white",
      radius: 12,
    },
    {
      year: 2085,
      label: "Death Age",
      color: "black",
      strokeColor: "white",
      radius: 12,
    },
  ];

  const [milestones, setMilestones] =
    useState<MilestoneType[]>(initialMilestones);
  const [yearDropdownItems, setYearDropdownItems] = useState<
    YearDropdownItem[]
  >([]);

  // Update conditional milestones when chartData changes
  useEffect(() => {
    setMilestones((prevMilestones) => {
      return prevMilestones.map((milestone) => {
        if (milestone.isConditional && milestone.targetAmount) {
          // Recalculate the year for conditional milestones
          const updatedYear = chartData.find(
            (entry) => entry.netWorth >= milestone.targetAmount!
          );
          if (updatedYear) {
            return { ...milestone, year: updatedYear.year };
          }
        }
        return milestone;
      });
    });
  }, [chartData]);

  useEffect(() => {
    const yearItems = yearArray.map((year) => ({
      label: `Year ${year}`,
      value: year,
      type: "year" as const,
    }));

    const milestoneItems = milestones.map((m) => ({
      label: m.label,
      value: m.year,
      type: "milestone" as const,
      color: m.color,
    }));

    setYearDropdownItems(
      [...yearItems, ...milestoneItems].sort((a, b) => a.value - b.value)
    );
  }, [yearArray, milestones]);

  const value = {
    yearDropdownItems,
    setMilestones,
    milestones,
    chartData,
  };

  return (
    <ProjectionsContext.Provider value={value}>
      {children}
    </ProjectionsContext.Provider>
  );
};

export const useProjectionsContext = () => {
  const context = useContext(ProjectionsContext);
  if (context === undefined) {
    throw new Error(
      "useProjectionsContext must be used within a ProjectionsProvider"
    );
  }
  return context;
};
