import React from "react";
import { UniversalDropdown, DropdownItem } from "./index";

// Demo component to verify all functionality works
const UniversalDropdownDemo: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        UniversalDropdown Implementation Demo
      </h1>

      {/* Demo 1: Basic children prop handling */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          1. Children Prop Handling
        </h2>
        <UniversalDropdown title="Custom Content Example">
          <div className="space-y-2">
            <p className="text-gray-700">
              This is custom content rendered as children.
            </p>
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium">
                Any React content can be rendered here!
              </p>
            </div>
          </div>
        </UniversalDropdown>
      </div>

      {/* Demo 2: DropdownItem component */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          2. DropdownItem Component
        </h2>
        <UniversalDropdown title="Financial Summary">
          <DropdownItem label="Total Income" value="£50,000" />
          <DropdownItem label="Total Expenses" value="£30,000" />
          <DropdownItem label="Net Worth" value="£20,000" />
          <DropdownItem label="Savings Rate" value="40%" />
        </UniversalDropdown>
      </div>

      {/* Demo 3: Custom className overrides */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          3. Custom Styling Overrides
        </h2>
        <UniversalDropdown
          title="Custom Styled Dropdown"
          className="border-purple-500 bg-purple-50"
          headerClassName="bg-purple-100 text-purple-900 hover:bg-purple-200"
          contentClassName="bg-purple-25 border-purple-200"
        >
          <div className="text-purple-800 space-y-2">
            <p>This dropdown has custom styling applied:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Purple border and background</li>
              <li>Custom header styling</li>
              <li>Custom content area styling</li>
            </ul>
          </div>
        </UniversalDropdown>
      </div>

      {/* Demo 4: Mixed content types */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          4. Mixed Content Types
        </h2>
        <UniversalDropdown title="Complex Content Example">
          <div className="space-y-3">
            <p className="text-gray-700 font-medium">Account Overview:</p>

            <DropdownItem label="Checking Account" value="£2,500.00" />
            <DropdownItem label="Savings Account" value="£15,000.00" />

            <div className="border-t pt-3">
              <p className="text-sm text-gray-600 mb-2">Quick Actions:</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                  Transfer
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-gray-600 mb-1">Recent Transactions:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Grocery Store - £45.67</li>
                <li>• Gas Station - £32.10</li>
                <li>• Online Purchase - £89.99</li>
              </ul>
            </div>
          </div>
        </UniversalDropdown>
      </div>

      {/* Demo 5: DropdownItem with custom styling */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          5. DropdownItem Custom Styling
        </h2>
        <UniversalDropdown title="Priority Tasks">
          <DropdownItem
            label="Critical Issue"
            value="URGENT"
            className="bg-red-50 border-l-4 border-red-500 px-2 py-2"
            labelClassName="text-red-800 font-semibold"
            valueClassName="text-red-600 font-extrabold text-sm"
          />
          <DropdownItem
            label="Important Task"
            value="HIGH"
            className="bg-orange-50 border-l-4 border-orange-500 px-2 py-2"
            labelClassName="text-orange-800 font-semibold"
            valueClassName="text-orange-600 font-bold text-sm"
          />
          <DropdownItem
            label="Regular Task"
            value="NORMAL"
            className="bg-green-50 border-l-4 border-green-500 px-2 py-2"
            labelClassName="text-green-800"
            valueClassName="text-green-600 text-sm"
          />
        </UniversalDropdown>
      </div>

      {/* Demo 6: Default open and callback */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          6. Advanced Features
        </h2>
        <div className="space-y-4">
          <UniversalDropdown title="Default Open Example" defaultOpen={true}>
            <p className="text-gray-700">
              This dropdown starts in the open state.
            </p>
          </UniversalDropdown>

          <UniversalDropdown
            title="With Toggle Callback"
            onToggle={(isOpen) => console.log("Dropdown toggled:", isOpen)}
          >
            <p className="text-gray-700">
              Check the browser console to see toggle events.
            </p>
          </UniversalDropdown>
        </div>
      </div>
    </div>
  );
};

export default UniversalDropdownDemo;
