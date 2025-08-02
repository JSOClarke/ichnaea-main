# Universal Dropdown Styles Design Document

## Overview

This design outlines the creation of a universal dropdown component system that provides consistent styling and behavior across all dropdown components in the projections sidebar. The system will be built using React with TypeScript and Tailwind CSS, following the existing patterns in the codebase while abstracting common functionality into reusable components.

## Architecture

### Component Hierarchy

```
UniversalDropdown (Base Component)
├── DropdownHeader (Header with title and chevron)
├── DropdownContent (Collapsible content area)
└── DropdownItem (Optional item component for list-style content)
```

### Design Patterns

- **Compound Component Pattern**: Allow flexible composition while maintaining consistent styling
- **Render Props Pattern**: Enable custom content rendering while preserving dropdown behavior
- **Tailwind CSS Classes**: Consistent styling through utility classes
- **TypeScript Interfaces**: Strong typing for props and component contracts

## Components and Interfaces

### 1. UniversalDropdown Component

**Props Interface:**

```typescript
interface UniversalDropdownProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  onToggle?: (isOpen: boolean) => void;
}
```

**Key Features:**

- Manages open/closed state internally
- Provides consistent header layout with title and chevron icon
- Supports custom styling overrides through className props
- Emits toggle events for parent component integration

### 2. DropdownItem Component (Optional)

**Props Interface:**

```typescript
interface DropdownItemProps {
  label: string;
  value: string | number;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}
```

**Key Features:**

- Standardized layout for key-value pair items
- Consistent spacing and typography
- Support for custom styling overrides

### 3. Styling System

**Base Tailwind Classes:**

```css
/* Dropdown Container */
.dropdown-container: "flex flex-col min-w-[100px] border-2 border-black rounded-[10px] p-2 mb-2"

/* Dropdown Header */
.dropdown-header: "flex flex-row justify-between items-center cursor-pointer"

/* Dropdown Content */
.dropdown-content: "flex flex-col mt-2"

/* Dropdown Item */
.dropdown-item: "flex flex-row gap-2 justify-between py-1"
.dropdown-item-label: "font-bold"
.dropdown-item-value: "font-bold"
```

## Data Models

### DropdownState

```typescript
interface DropdownState {
  isOpen: boolean;
}
```

### DropdownTheme (Future Enhancement)

```typescript
interface DropdownTheme {
  container: string;
  header: string;
  content: string;
  item: string;
  chevron: string;
}
```

## Error Handling

### Component Error Boundaries

- Wrap dropdown content in error boundaries to prevent crashes
- Provide fallback UI for failed content rendering
- Log errors for debugging while maintaining user experience

### Prop Validation

- Use TypeScript for compile-time type checking
- Provide sensible defaults for optional props
- Validate required props and provide helpful error messages

## Testing Strategy

### Unit Tests

1. **Component Rendering Tests**

   - Verify dropdown renders with correct initial state
   - Test prop passing and default values
   - Validate className merging and overrides

2. **Interaction Tests**

   - Test toggle functionality on header click
   - Verify chevron icon rotation/change
   - Test keyboard accessibility (Enter/Space to toggle)

3. **Content Rendering Tests**
   - Test custom content rendering
   - Verify children prop handling
   - Test conditional content display

### Integration Tests

1. **Migration Tests**

   - Test existing dropdown components work with new system
   - Verify visual consistency across different dropdown types
   - Test performance impact of component abstraction

2. **Accessibility Tests**
   - Verify ARIA attributes are properly applied
   - Test keyboard navigation
   - Validate screen reader compatibility

### Visual Regression Tests

1. **Styling Consistency**
   - Compare before/after screenshots of existing dropdowns
   - Test responsive behavior across screen sizes
   - Verify hover and focus states

## Implementation Approach

### Phase 1: Core Component Creation

1. Create `UniversalDropdown` base component
2. Implement basic toggle functionality
3. Apply consistent Tailwind styling
4. Add TypeScript interfaces

### Phase 2: Enhancement and Flexibility

1. Add `DropdownItem` helper component
2. Implement className override system
3. Add accessibility features (ARIA attributes, keyboard support)
4. Create comprehensive test suite

### Phase 3: Migration and Integration

1. Migrate `NetworthChangeDropdown` to use universal system
2. Migrate `ProjectionDropdown` to use universal system
3. Update any other dropdown components
4. Remove duplicate code and styles

### Phase 4: Documentation and Optimization

1. Create component documentation and usage examples
2. Optimize performance if needed
3. Add theme system for future customization
4. Conduct final testing and validation

## Migration Strategy

### Backward Compatibility

- Maintain existing component APIs during migration
- Use feature flags or gradual rollout if needed
- Provide clear migration path for each component

### Code Organization

```
src/components/ui/
├── UniversalDropdown/
│   ├── UniversalDropdown.tsx
│   ├── DropdownItem.tsx
│   ├── types.ts
│   └── index.ts
```

### Usage Examples

**Basic Usage:**

```tsx
<UniversalDropdown title="Account Details">
  <div>Custom content here</div>
</UniversalDropdown>
```

**With DropdownItem:**

```tsx
<UniversalDropdown title="Financial Summary">
  <DropdownItem label="Total Income" value="£50,000" />
  <DropdownItem label="Total Expenses" value="£30,000" />
</UniversalDropdown>
```

**Custom Styling:**

```tsx
<UniversalDropdown
  title="Custom Dropdown"
  className="border-blue-500"
  headerClassName="bg-blue-50"
>
  <div>Content with custom styling</div>
</UniversalDropdown>
```

This design provides a flexible, maintainable solution that addresses the requirements while preserving existing functionality and enabling future enhancements.
