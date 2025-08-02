import React from "react";
import type { DropdownItemProps } from "./types";

const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  value,
  className = "",
  labelClassName = "",
  valueClassName = "",
}) => {
  const baseItemClasses =
    "flex flex-row gap-2 justify-between py-1 px-1 rounded-sm hover:bg-gray-50 transition-colors duration-150";
  const baseLabelClasses = "font-bold text-gray-900";
  const baseValueClasses = "font-bold text-gray-700";

  return (
    <div className={`${baseItemClasses} ${className}`}>
      <span className={`${baseLabelClasses} ${labelClassName}`}>{label}</span>
      <span className={`${baseValueClasses} ${valueClassName}`}>{value}</span>
    </div>
  );
};

export default DropdownItem;
