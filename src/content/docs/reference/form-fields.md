---
title: useFormField Hook
description: A reference to the state synchronization of the builder
---

The `useFormField` hook is a Vue composable that manages field properties, validation, and state
synchronization with a global form schema object.

```typescript
import type { WritableComputedRef } from "vue";
import { computed, ref } from "vue";
import { formSchema, selectedIndex } from "../utils/default-form-elements";
```

## Exported Variables

### `isLoading`

```typescript
export const isLoading = ref(false);
```

Reactive reference that tracks if the ai assistant is in a loading state.

### `selectedField`

```typescript
export const selectedField = computed(
  () => formSchema.value[selectedIndex.value],
);
```

A computed property that returns the currently selected field from the form schema.

## Main Hook: `useFormField()`

Returns an object containing reactive properties and utility functions for form field management.

### Core Field Properties

#### `label`

- **Type**: `WritableComputedRef<string>`
- **Description**: Manages the field's label text
- **Get**: Returns the current field's label or empty string
- **Set**: Updates the label in the form schema

#### `placeholder`

- **Type**: `WritableComputedRef<string>`
- **Description**: Manages the field's placeholder text
- **Get**: Returns the current field's placeholder or empty string
- **Set**: Updates the placeholder in the form schema

#### `help`

- **Type**: `WritableComputedRef<string>`
- **Description**: Manages the field's help text
- **Get**: Returns the current field's help text or empty string
- **Set**: Updates the help text in the form schema

### Validation Management

#### `validationString`

- **Type**: `WritableComputedRef<string>`
- **Description**: Manages the complete validation string for the field
- **Format**: Pipe-separated validation rules (e.g., "required|email|min:3")

#### `validationStringLength`

- **Type**: `ComputedRef<number>`
- **Description**: Returns the number of validation rules applied to the field

#### `updateValidationString(value: string, active: boolean = true)`

- **Description**: Updates validation rules in the validation string
- **Parameters**:

  - `value`: The validation rule to add/update
  - `active`: Whether to activate or deactivate the rule

- **Behavior**:
  - For simple rules (no colon): toggles presence in validation string
  - For parameterized rules (with colon): updates or replaces existing rule of same type

#### `createValidationValue(validationType: string, active: boolean = true)`

- **Returns**: `WritableComputedRef<string>`
- **Description**: Creates a computed property for managing parameterized validation rules
- **Usage**: Useful for validation rules that require values (e.g., `min:5`, `max:100`)

#### `getParameterizedValidation(validationType: string)`

- **Returns**: `string`
- **Description**: Extracts the parameter value from a validation rule
- **Example**: For validation "min:5", returns "5"

#### `isValidationChecked(validationType: string)`

- **Returns**: `boolean`
- **Description**: Checks if a specific validation rule is currently active

### Field Type-Specific Properties

#### `whichNumber`

- **Type**: `WritableComputedRef<string>`
- **Description**: Manages number field type (integer/decimal)
- **Values**: "integer" | "decimal"
- **Side Effects**: Automatically sets appropriate step value (1 for integer, 0.1 for decimal)

#### `numOfFiles`

- **Type**: `WritableComputedRef<string>`
- **Description**: Manages file input multiple selection
- **Values**: "true" | "false"

#### `modelValue`

- **Type**: `WritableComputedRef<string[]>`
- **Description**: Manages options for select, radio, and checkbox fields

#### `min`

- **Type**: `WritableComputedRef<number>`
- **Description**: Manages minimum value for number and range fields

#### `max`

- **Type**: `WritableComputedRef<number>`
- **Description**: Manages maximum value for number and range fields

### Utility Properties

#### `hasField`

- **Type**: `ComputedRef<boolean>`
- **Description**: Checks if a field is currently selected

#### `currentFieldType`

- **Type**: `ComputedRef<string | null>`
- **Description**: Returns the current field's FormKit type

#### `isActive(fn: (arg0: string) => boolean, strVal: string)`

- **Returns**: `ComputedRef<boolean>`
- **Description**: Creates a computed property that applies a function to a string value

## Usage Example

```vue
// example.vue
<script setup lang="ts">
import { computed } from "vue";
import { useFormField } from "./path/to/useFormField";

const {
  label,
  placeholder,
  validationString,
  isValidationChecked,
  updateValidationString,
  showPlaceholder,
  currentFieldType,
} = useFormField();

// Check if required validation is active
const isRequired = computed(() => isValidationChecked("required"));

// Toggle required validation
const toggleRequired = () => {
  updateValidationString("required", !isRequired.value);
};
</script>

<template>
  <div>
    <label v-if="showPlaceholder">{{ label }}</label>
    <input
      v-model="placeholder"
      :placeholder="currentFieldType === 'text' ? 'Enter text...' : ''"
    />
    <button @click="toggleRequired">
      {{ isRequired ? "Remove Required" : "Make Required" }}
    </button>
  </div>
</template>
```