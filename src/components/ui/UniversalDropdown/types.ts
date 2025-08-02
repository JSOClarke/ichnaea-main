export interface UniversalDropdownProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  onToggle?: (isOpen: boolean) => void;
  totalAmount?: string;
}

export interface DropdownState {
  isOpen: boolean;
}

export interface DropdownItemProps {
  label: string;
  value: string | number;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}
