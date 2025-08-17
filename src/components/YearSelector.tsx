import type { ChartData } from "../../types/types";

interface YearSelectorProps {
  chartData: ChartData[];
  setYearBreakdown: (year: number) => void;
  year: number;
}

export default function YearSelector({
  chartData,
  setYearBreakdown,
  year,
}: YearSelectorProps) {
  return (
    <div className="mb-6">
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <select
          name="year"
          id="yearSelect"
          className="w-full px-3 py-2 text-base font-medium bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={year}
          onChange={(e) => setYearBreakdown(Number(e.target.value))}
        >
          {chartData.map((item, idx) => {
            return (
              <option key={idx} value={item.year}>
                Year {item.year}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
