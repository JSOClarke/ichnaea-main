import React, { useState, useEffect } from "react";

interface FormattedNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  step?: string;
  required?: boolean;
}

export default function FormattedNumberInput({
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
}: FormattedNumberInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  // Format number with commas for display
  const formatNumber = (num: number): string => {
    if (num === 0) return "";
    return num.toLocaleString();
  };

  // Parse formatted string back to number
  const parseNumber = (str: string): number => {
    const cleaned = str.replace(/,/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Update display value when prop value changes
  useEffect(() => {
    setDisplayValue(formatNumber(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty string, numbers, commas, and decimal points
    if (inputValue === "" || /^[\d,]*\.?\d*$/.test(inputValue)) {
      setDisplayValue(inputValue);

      // Parse and send numeric value to parent
      const numericValue = parseNumber(inputValue);
      onChange(numericValue);
    }
  };

  const handleBlur = () => {
    // Reformat on blur to ensure consistent formatting
    const numericValue = parseNumber(displayValue);
    setDisplayValue(formatNumber(numericValue));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text on focus for easy editing
    e.target.select();
  };

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      required={required}
    />
  );
}
