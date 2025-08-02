# Implementation Plan

- [x] 1. Create core universal dropdown component structure

  - Set up component directory structure under `src/components/ui/UniversalDropdown/`
  - Create TypeScript interfaces for component props and state
  - Implement basic UniversalDropdown component with toggle functionality
  - _Requirements: 1.1, 1.3, 3.1_

- [x] 2. Implement consistent dropdown styling with Tailwind CSS

  - Apply consistent border, padding, and spacing styles using Tailwind classes
  - Create header layout with title and chevron icon positioning
  - Implement expanded/collapsed state visual styling
  - Add hover states for interactive elements
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Add dropdown content rendering and customization

  - Implement children prop handling for custom content rendering
  - Add support for custom className overrides for container, header, and content
  - Create optional DropdownItem component for standardized list items
  - Test custom content rendering with different content types
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 4. Implement accessibility features and interaction handling

  - Add proper ARIA attributes for screen reader compatibility
  - Implement keyboard navigation support (Enter/Space to toggle)
  - Add click handler for dropdown header toggle functionality
  - Implement chevron icon rotation or state change on toggle
  - _Requirements: 3.4, 5.1, 5.2_

- [ ] 5. Create comprehensive test suite for universal dropdown

  - Write unit tests for component rendering with different props
  - Test toggle functionality and state management
  - Create tests for className override functionality
  - Add accessibility tests for ARIA attributes and keyboard navigation
  - _Requirements: 1.1, 2.1, 3.3, 3.4_

- [x] 6. Migrate NetworthChangeDropdown to use universal system

  - Refactor NetworthChangeDropdown component to use UniversalDropdown
  - Preserve existing functionality for networth change calculations
  - Maintain current visual appearance and behavior
  - Update component to use DropdownItem for account change display
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 7. Migrate ProjectionDropdown to use universal system

  - Refactor ProjectionDropdown component to use UniversalDropdown
  - Preserve existing functionality for account data display
  - Maintain current visual appearance and behavior
  - Update component to use DropdownItem for account information display
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 8. Clean up duplicate code and verify consistency

  - Remove duplicate styling code from migrated components
  - Verify consistent behavior across all dropdown components
  - Test responsive behavior across different screen sizes
  - Ensure independent operation of multiple dropdowns on same page
  - _Requirements: 4.4, 5.3, 5.4_

- [ ] 9. Create component documentation and usage examples

  - Write TypeScript documentation comments for all component interfaces
  - Create usage examples for basic dropdown, with DropdownItem, and custom styling
  - Document migration patterns for future dropdown components
  - Add component to main exports for easy importing
  - _Requirements: 1.1, 3.1, 3.2, 3.3_

- [ ] 10. Final integration testing and validation
  - Test all migrated components in ProjectionsPlan page context
  - Verify no regression in existing functionality
  - Test performance impact of component abstraction
  - Validate visual consistency across all dropdown instances
  - _Requirements: 1.3, 4.1, 4.2, 5.1, 5.2, 5.3, 5.4_
