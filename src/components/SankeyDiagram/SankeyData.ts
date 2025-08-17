import { useProjectionsContext } from "../../ProjectionsContext";

const { chartData } = useProjectionsContext();

export const SankeyData = {
  nodes: [
    { name: "Salary" }, // index 0
    { name: "Passive Income" }, // index 1
    { name: "Expenses" }, // index 2
    { name: "Savings" }, // index 3
    { name: "Rent" }, // index 4
    { name: "Bills" }, // index 5
    { name: "Food" }, // index 6
    { name: "Pension" }, // index 7
    { name: "ISA" }, // index 8
  ],
  links: [{ source: 0, target: 2, value: 1000 }],
};
