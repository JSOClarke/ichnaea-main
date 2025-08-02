import React from "react";
import { UniversalDropdown, DropdownItem } from "./index";

// Test component to verify all functionality
const TestUniversalDropdown: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">UniversalDropdown Tests</h2>

      {/* Test 1: Basic children prop handling */}
      <div>
        <h3 className="font-semibold mb-2">Test 1: Basic Children Rendering</h3>
        <UniversalDropdown title="Basic Content">
          <div className="p-2 bg-blue-50 rounded">
            <p>This is custom content rendered as children</p>
            <p>Multiple elements should render correctly</p>
          </div>
        </UniversalDropdown>
      </div>

      {/* Test 2: DropdownItem component usage */}
      <div>
        <h3 className="font-semibold mb-2">Test 2: DropdownItem Component</h3>
        <UniversalDropdown title="Financial Summary">
          <DropdownItem label="Total Income" value="£50,000" />
          <DropdownItem label="Total Expenses" value="£30,000" />
          <DropdownItem label="Net Worth" value="£20,000" />
        </UniversalDropdown>
      </div>

      {/* Test 3: Custom className overrides */}
      <div>
        <h3 className="font-semibold mb-2">Test 3: Custom Styling</h3>
        <UniversalDropdown
          title="Custom Styled Dropdown"
          className="border-blue-500 bg-blue-50"
          headerClassName="bg-blue-100 text-blue-900"
          contentClassName="bg-blue-25"
        >
          <div className="text-blue-800">
            <p>This dropdown has custom styling applied</p>
            <p>Container, header, and content have custom classes</p>
          </div>
        </UniversalDropdown>
      </div>

      {/* Test 4: Mixed content types */}
      <div>
        <h3 className="font-semibold mb-2">Test 4: Mixed Content Types</h3>
        <UniversalDropdown title="Mixed Content">
          <div className="space-y-2">
            <p className="text-gray-700">Text content</p>
            <DropdownItem label="Account Balance" value="£1,234.56" />
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">
                Action 1
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                Action 2
              </button>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>List item 1</li>
              <li>List item 2</li>
              <li>List item 3</li>
            </ul>
          </div>
        </UniversalDropdown>
      </div>

      {/* Test 5: DropdownItem with custom styling */}
      <div>
        <h3 className="font-semibold mb-2">
          Test 5: DropdownItem Custom Styling
        </h3>
        <UniversalDropdown title="Styled Items">
          <DropdownItem
            label="High Priority"
            value="Important"
            className="bg-red-50 border-l-4 border-red-500"
            labelClassName="text-red-800"
            valueClassName="text-red-600 font-extrabold"
          />
          <DropdownItem
            label="Medium Priority"
            value="Normal"
            className="bg-yellow-50 border-l-4 border-yellow-500"
            labelClassName="text-yellow-800"
            valueClassName="text-yellow-600"
          />
          <DropdownItem
            label="Low Priority"
            value="Minor"
            className="bg-green-50 border-l-4 border-green-500"
            labelClassName="text-green-800"
            valueClassName="text-green-600"
          />
        </UniversalDropdown>
      </div>

      {/* Test 6: Default open state */}
      <div>
        <h3 className="font-semibold mb-2">Test 6: Default Open State</h3>
        <UniversalDropdown title="Default Open" defaultOpen={true}>
          <p>This dropdown should be open by default</p>
        </UniversalDropdown>
      </div>

      {/* Test 7: Toggle callback */}
      <div>
        <h3 className="font-semibold mb-2">Test 7: Toggle Callback</h3>
        <UniversalDropdown
          title="With Callback"
          onToggle={(isOpen) => console.log("Dropdown toggled:", isOpen)}
        >
          <p>Check console for toggle events</p>
        </UniversalDropdown>
      </div>
    </div>
  );
};

export default TestUniversalDropdown;
