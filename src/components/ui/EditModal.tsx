import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type {
  Account,
  Expense,
  Income,
  AccountTypeId,
} from "../../../types/types";
import { ACCOUNT_TYPE_OPTIONS } from "../../../types/types";
import FormattedNumberInput from "./FormattedNumberInput";

import { useProjectionsContext } from "../../ProjectionsContext";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Account | Expense | Income) => void;
  data: Account | Expense | Income | null;
  type: "account" | "expense" | "income";
}

export default function EditModal({
  isOpen,
  onClose,
  onSave,
  data,
  type,
}: EditModalProps) {
  const { yearDropdownItems } = useProjectionsContext();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">
            Edit{" "}
            {type === "account"
              ? "Account"
              : type === "expense"
              ? "Expense"
              : "Income"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Name field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Amount field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (£)
              </label>
              <FormattedNumberInput
                value={formData.amount || 0}
                onChange={(value) => handleChange("amount", value)}
                placeholder="e.g., 50,000"
                required
              />
            </div>

            {/* Frequency field for income and expenses */}
            {(type === "income" || type === "expense") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={formData.frequency || "monthly"}
                  onChange={(e) => handleChange("frequency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            )}

            {/* Account-specific fields */}
            {type === "account" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    value={formData.type || 1}
                    onChange={(e) =>
                      handleChange(
                        "type",
                        parseInt(e.target.value) as AccountTypeId
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {ACCOUNT_TYPE_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={formData.interestRate * 100 || ""}
                    onChange={(e) =>
                      handleChange(
                        "interestRate",
                        (parseFloat(e.target.value) || 0) / 100
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5.0 for 5%"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Contribution (£)
                  </label>
                  <FormattedNumberInput
                    value={formData.monthlyContribution || 0}
                    onChange={(value) =>
                      handleChange("monthlyContribution", value)
                    }
                    placeholder="e.g., 1,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compounding Frequency (per year)
                  </label>
                  <select
                    value={formData.monthlyRate || 12}
                    onChange={(e) =>
                      handleChange("monthlyRate", parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>Annually</option>
                    <option value={4}>Quarterly</option>
                    <option value={12}>Monthly</option>
                    <option value={365}>Daily</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Priority
                  </label>
                  <select
                    value={formData.priority || 1}
                    onChange={(e) =>
                      handleChange("priority", parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>1 - Highest (funded first)</option>
                    <option value={2}>2 - Medium</option>
                    <option value={3}>3 - Low</option>
                    <option value={4}>4 - Lowest (funded last)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    When you have extra money, accounts with priority 1 get funded
                    first
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Withdrawal Priority
                  </label>
                  <select
                    value={formData.withdrawalPriority || 1}
                    onChange={(e) =>
                      handleChange("withdrawalPriority", parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>
                      1 - First to withdraw (least protected)
                    </option>
                    <option value={2}>2 - Second to withdraw</option>
                    <option value={3}>3 - Third to withdraw</option>
                    <option value={4}>
                      4 - Last to withdraw (most protected)
                    </option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    When expenses exceed income, accounts with priority 1 get
                    consumed first
                  </p>
                </div>
              </>
            )}

            {/* Expense-specific fields */}
            {type === "expense" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category || ""}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type || "Fixed"}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Fixed">Fixed</option>
                    <option value="Variable">Variable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Year
                  </label>
                  <select
                    value={formData.duration?.start || new Date().getFullYear()}
                    onChange={(e) =>
                      handleChange("duration", {
                        ...formData.duration,
                        start: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {yearDropdownItems.map((item, idx) => (
                      <option key={idx} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Year
                  </label>
                  <select
                    value={formData.duration?.end || new Date().getFullYear() + 5}
                    onChange={(e) =>
                      handleChange("duration", {
                        ...formData.duration,
                        end: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {yearDropdownItems.map((item, idx) => (
                      <option key={idx} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes || ""}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </>
            )}

            {/* Income-specific fields */}
            {type === "income" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category || ""}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type || "Salary"}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Salary">Salary</option>
                    <option value="Side Gig">Side Gig</option>
                    <option value="Investment">Investment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Year
                  </label>
                  <select
                    value={formData.duration?.start || new Date().getFullYear()}
                    onChange={(e) =>
                      handleChange("duration", {
                        ...formData.duration,
                        start: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {yearDropdownItems.map((item, idx) => (
                      <option key={idx} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Year
                  </label>
                  <select
                    value={
                      formData.duration?.end || new Date().getFullYear() + 40
                    }
                    onChange={(e) =>
                      handleChange("duration", {
                        ...formData.duration,
                        end: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {yearDropdownItems.map((item, idx) => (
                      <option key={idx} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes || ""}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 p-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
