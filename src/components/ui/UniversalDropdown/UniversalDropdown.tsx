import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { UniversalDropdownProps } from "./types";

const UniversalDropdown: React.FC<UniversalDropdownProps> = ({
  title,
  children,
  defaultOpen = false,
  className = "",
  headerClassName = "",
  contentClassName = "",
  onToggle,
  totalAmount,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  // Consistent container styling with proper spacing and borders
  const baseContainerClasses =
    "flex flex-col min-w-[100px] border-2 border-black rounded-[10px] p-2 mb-2 bg-white shadow-sm";

  // Header with hover states and proper alignment
  const baseHeaderClasses =
    "flex flex-row justify-between items-center cursor-pointer p-1 rounded-md transition-colors duration-150 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200";

  // Content area with consistent spacing
  const baseContentClasses = "flex flex-col mt-2 pt-2 border-t border-gray-100";

  return (
    <div className={`${baseContainerClasses} ${className}`}>
      <div
        className={`${baseHeaderClasses} ${headerClassName}`}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-expanded={isOpen}
        aria-controls="dropdown-content"
      >
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-gray-900 select-none">{title}</span>
          <div className="flex items-center gap-2">
            {!isOpen && totalAmount && (
              <span className="font-bold text-gray-700">{totalAmount}</span>
            )}
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ease-in-out ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="dropdown-content"
          className={`${baseContentClasses} ${contentClassName}`}
          role="region"
          aria-labelledby="dropdown-header"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default UniversalDropdown;
