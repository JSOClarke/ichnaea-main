import { useState } from "react";
import type { ChartData } from "../../../types/types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

interface LandmarkYear {
  year: number;
  label: string;
  color?: string;
  strokeColor?: string;
  radius?: number;
  showOnBarChart?: boolean;
}

interface MoneyProjectionChartProps {
  chartData: ChartData[];
  setYearBreakdown: (year: number) => void;
  yearBreakdown: number;
  landmarkYears?: LandmarkYear[];
}

export default function MoneyProjectionChart({
  chartData,
  setYearBreakdown,
  yearBreakdown,
  landmarkYears = [],
}: MoneyProjectionChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Format large numbers for Y-axis display
  const formatYAxisValue = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `£${(value / 1000).toFixed(0)}K`;
    } else {
      return `£${value.toLocaleString()}`;
    }
  };

  // Custom tooltip that shows landmark information
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const year = label;
      const landmark = landmarkYears.find((l) => l.year === year);

      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold">{`Year: ${year}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: £${entry.value.toLocaleString()}`}
            </p>
          ))}
          {landmark && (
            <p className="text-orange-600 font-semibold mt-1">
              🎯 {landmark.label}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const ClickableDot = (props: any) => {
    const { cx, cy, payload } = props;

    const handleClick = () => {
      setYearBreakdown(payload.year);
    };

    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={14}
          fill="transparent"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={5}
          stroke="#8884d8"
          strokeWidth={1}
          fill="white"
          pointerEvents="none"
        />
      </g>
    );
  };

  return (
    <div className="w-full h-full">
      {/* Chart Type Toggle */}
      <div className="flex justify-end p-2">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              chartType === "line"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              chartType === "bar"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bar Chart
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-[calc(100%-60px)]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatYAxisValue} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Line
                type="monotone"
                dataKey="netWorth"
                stroke="#8884d8"
                dot={false}
                isAnimationActive={false}
                activeDot={false}
                name="Net Worth"
              />

              <Line
                type="monotone"
                dataKey="totalPassiveIncome"
                stroke="#22c55e"
                dot={false}
                isAnimationActive={false}
                activeDot={false}
                name="Passive Income"
              />

              <Line
                type="monotone"
                dataKey="netWorth"
                stroke="transparent"
                dot={<ClickableDot />}
                isAnimationActive={false}
                activeDot={false}
              />

              <ReferenceLine
                x={2028}
                stroke="red"
                strokeDasharray="3 3"
                label={{ value: "2028", position: "top", fill: "red" }}
              />
              <ReferenceLine
                x={yearBreakdown}
                stroke="black"
                strokeDasharray="3 3"
                label={{
                  value: String(yearBreakdown),
                  position: "top",
                  fill: "blue",
                }}
              />

              {/* Landmark Year Circles */}
              {landmarkYears.map((landmark) => {
                const landmarkData = chartData.find(
                  (d) => d.year === landmark.year
                );
                return landmarkData ? (
                  <ReferenceDot
                    key={landmark.year}
                    x={landmark.year}
                    y={landmarkData.netWorth}
                    r={landmark.radius || 8}
                    fill={landmark.color || "orange"}
                    stroke={landmark.strokeColor || "white"}
                    strokeWidth={2}
                  />
                ) : null;
              })}
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatYAxisValue} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Bar
                dataKey="netWorth"
                fill="#8884d8"
                name="Net Worth"
                onClick={(_, index) => {
                  if (chartData[index]) {
                    setYearBreakdown(chartData[index].year);
                  }
                }}
                style={{ cursor: "pointer" }}
              />

              <Bar
                dataKey="totalPassiveIncome"
                fill="#22c55e"
                name="Passive Income"
                onClick={(_, index) => {
                  if (chartData[index]) {
                    setYearBreakdown(chartData[index].year);
                  }
                }}
                style={{ cursor: "pointer" }}
              />

              <ReferenceLine
                x={2028}
                stroke="red"
                strokeDasharray="3 3"
                label={{ value: "2028", position: "top", fill: "red" }}
              />
              <ReferenceLine
                x={yearBreakdown}
                stroke="black"
                strokeDasharray="3 3"
                label={{
                  value: String(yearBreakdown),
                  position: "top",
                  fill: "blue",
                }}
              />

              {/* Landmark Year Circles */}
              {landmarkYears.map((landmark) => {
                const landmarkData = chartData.find(
                  (d) => d.year === landmark.year
                );
                return landmarkData && landmark.showOnBarChart !== false ? (
                  <ReferenceDot
                    key={landmark.year}
                    x={landmark.year}
                    y={landmarkData.netWorth}
                    r={landmark.radius || 8}
                    fill={landmark.color || "orange"}
                    stroke={landmark.strokeColor || "white"}
                    strokeWidth={2}
                  />
                ) : null;
              })}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
