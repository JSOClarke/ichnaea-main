# Requirements Document

## Introduction

This feature involves creating a universal dropdown component system that can be reused across the projections sidebar components. Currently, dropdown components like NetworthChangeDropdown and ProjectionDropdown have similar styling and behavior patterns that could be abstracted into a reusable component or style system. This will improve code maintainability, ensure consistent UI/UX, and reduce code duplication.

## Requirements

### Requirement 1

**User Story:** As a developer, I want a reusable dropdown component system, so that I can maintain consistent styling and behavior across all dropdown components in the application.

#### Acceptance Criteria

1. WHEN creating a new dropdown component THEN the system SHALL provide a base dropdown component or styling system that can be extended
2. WHEN using the universal dropdown system THEN the component SHALL support customizable content while maintaining consistent visual styling
3. WHEN implementing the universal dropdown THEN the system SHALL maintain the existing functionality of current dropdown components

### Requirement 2

**User Story:** As a developer, I want consistent dropdown styling across the application, so that the user interface appears cohesive and professional.

#### Acceptance Criteria

1. WHEN any dropdown is rendered THEN the system SHALL apply consistent border, padding, and spacing styles
2. WHEN a dropdown is in collapsed state THEN the system SHALL show a consistent header layout with title and chevron icon
3. WHEN a dropdown is in expanded state THEN the system SHALL show consistent content area styling
4. WHEN hovering over interactive elements THEN the system SHALL provide consistent hover states

### Requirement 3

**User Story:** As a developer, I want the universal dropdown to be flexible and customizable, so that I can use it for different types of content while maintaining consistency.

#### Acceptance Criteria

1. WHEN using the universal dropdown THEN the system SHALL accept custom title text as a prop
2. WHEN using the universal dropdown THEN the system SHALL accept custom content to be rendered in the expanded state
3. WHEN using the universal dropdown THEN the system SHALL support optional custom styling overrides
4. WHEN using the universal dropdown THEN the system SHALL maintain accessibility features like proper ARIA attributes

### Requirement 4

**User Story:** As a developer, I want to easily migrate existing dropdown components to use the universal system, so that I can improve code maintainability without breaking existing functionality.

#### Acceptance Criteria

1. WHEN migrating existing dropdowns THEN the system SHALL maintain all current functionality
2. WHEN migrating existing dropdowns THEN the system SHALL preserve the current visual appearance
3. WHEN migrating existing dropdowns THEN the system SHALL require minimal code changes to existing components
4. WHEN migration is complete THEN the system SHALL reduce code duplication across dropdown components

### Requirement 5

**User Story:** As a user, I want dropdown interactions to be consistent and intuitive, so that I can efficiently navigate and use the projection features.

#### Acceptance Criteria

1. WHEN clicking on a dropdown header THEN the system SHALL toggle the expanded/collapsed state consistently
2. WHEN a dropdown is expanded THEN the system SHALL show a visual indicator (chevron rotation or different icon)
3. WHEN interacting with dropdown content THEN the system SHALL maintain responsive behavior across different screen sizes
4. WHEN multiple dropdowns are present THEN the system SHALL allow independent operation of each dropdown
