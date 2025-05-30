---
title: custom-insert-plugin.ts
description: A reference to the drag and drop insert plugin
---

# Insert Documentation

The custom insert plugin provides advanced drag-and-drop functionality for the builder, enabling 
insertion point management and visual feedback during drag operations.

## Overview

> NOTE: formkit is shipped with their own insert plugin however, I found it to be somewhat buggy and in several cases
> just unusable for how I build this application.

This plugin extends the base FormKit drag-and-drop system with custom insertion logic, 
visual insertion points, and support for complex form layouts with nested elements.

## Core Components

### `insertState`

Global state object that tracks the current insertion operation:

```typescript
export const insertState: InsertState<unknown> = {
  draggedOverNodes: [], // Nodes currently being dragged over
  draggedOverParent: null, // Parent container being dragged over
  targetIndex: 0, // Target insertion index
  ascending: false, // Direction of insertion
  insertPoint: null, // Visual insertion point element
  dragging: false, // Whether a drag operation is active
};
```

## Main Plugin Function

### `customInsertPlugin<T>(insertConfig: InsertConfig<T>)`

Creates and configures the custom insert plugin for a parent container.
**Parameters:**

- `insertConfig`: Configuration object defining insertion behavior

**Returns:** Plugin function that accepts a parent HTMLElement
**Key Features:**

- Throttled position checking for Safari compatibility
- Automatic range definition for insertion zones
- Event handling for drag operations
- Integration with Vue reactivity system

## Event Handlers

### `handleNodeDragover<T>(data: NodeDragEventData<T>)`

Handles dragover events on individual nodes. Prevents default behavior for native drag operations.

### `handleParentDragover<T>(data: ParentEventData<T>, state: DragState<T>)`

Processes dragover events on parent containers for native drag operations.

### `handleParentPointerover<T>(data: PointeroverParentEvent<T>)`

Handles pointer events for non-native drag operations with scroll detection.

## Range Management

### Range Creation Functions

#### `createVerticalRange(nodeCoords, otherCoords, isAscending)`

Creates vertical insertion ranges for full-width elements or stacked layouts.
**Parameters:**

- `nodeCoords`: Current node coordinates
- `otherCoords`: Adjacent node coordinates (optional)
- `isAscending`: Direction of range creation

**Returns:** Range object with vertical positioning

#### `createHorizontalRange(nodeCoords, otherCoords, isAscending, lastInRow)`

Creates horizontal insertion ranges for inline or grid layouts.
**Parameters:**

- `nodeCoords`: Current node coordinates
- `otherCoords`: Adjacent node coordinates (optional)
- `isAscending`: Direction of range creation
- `lastInRow`: Whether this is the last element in a row

**Returns:** Range object with horizontal positioning

### `defineRanges(parent: HTMLElement)`

Calculates insertion ranges for all enabled nodes within a parent container. Automatically detects layout patterns and applies appropriate range strategies.
**Layout Detection:**

- **Full-width elements** (>80% of container width): Uses vertical ranges
- **Inline elements**: Uses horizontal ranges
- **Mixed layouts**: Adapts based on element positioning

## Position Management

### `moveBetween<T>(data: ParentRecord<T>, state: DragState<T>)`

Main function for handling movement between existing elements. Manages:

- Empty container states
- Visual insertion point positioning
- Range-based insertion detection

### `findClosest<T>(enabledNodes: NodeRecord<T>[], state: DragState<T>)`

Optimized function to find the closest insertion range based on current coordinates.
**Performance Features:**

- Coordinate-based memoization
- Early exit optimization
- Threshold-based caching (5px tolerance)

## Insertion Point Management

### `createInsertPoint<T>(parent: ParentRecord<T>, insertState: InsertState<T>)`

Creates and configures the visual insertion point element.

### `positionInsertPoint<T>(parent, position, ascending, node, insertState)`

Positions the insertion point based on calculated ranges and direction.
**Positioning Logic:**

- **Vertical insertion**: Centers on target Y coordinate with full width
- **Horizontal insertion**: Centers on target X coordinate with calculated height

## Drag Completion

### `handleEnd<T>(state: DragState<T> | SynthDragState<T> | BaseDragState<T>)`

Processes the final insertion when a drag operation completes.
**Handles:**

- **Internal sorting**: Reordering within the same container
- **Cross-container transfers**: Moving between different containers
- **Empty container drops**: Dropping into empty containers
- **Form schema synchronization**: Updates the global form schema

**Special Processing:**

- Automatically adds `col-span-2` class to transferred elements
- Applies special styling to submit buttons
- Maintains form field relationships

## Utility Functions

### `findFirstOverflowingParent(element: HTMLElement)`

Traverses the DOM to find the first scrollable ancestor, enabling proper scroll event handling.

### `checkPosition(e: DragEvent | PointerEvent)`

Global position checker that manages cursor-based state updates and insertion point visibility.

### `throttle(fn: Function)`

Safari-compatible throttling function that limits update frequency for smooth performance.

## Vue Reactivity

- Watches `formSchema` for external changes
- Automatically updates parent values
- Maintains reactive state synchronization

## Usage Example

```vue
// example.vue
<script setup lang="ts">
const insertPointClasses = [
  "absolute",
  "bg-green-500",
  "z-[2000]",
  "rounded-full",
  "duration-[5ms]",
  "before:block",
  'before:content-["Drop_here"]',
  "before:whitespace-nowrap",
  "before:bg-green-900",
  "before:py-1",
  "before:h-6",
  "before:px-3",
  "before:rounded-lg",
  "before:text-xs",
  "before:font-medium",
  "before:absolute",
  "before:top-1/2",
  "before:left-1/2",
  "before:-translate-y-1/2",
  "before:-translate-x-1/2",
  "before:text-white",
  "before:shadow-sm",
  "before:transition-all",
  "before:border",
  "before:border-green-400/20",
];

const [formFields, fields] = useDragAndDrop<FormKitSchemaFormKit>(
  formSchema.value,
  {
    group: "form-builder",
    nativeDrag: true,
    draggingClass: "opacity-5 bg-green-400/50",
    accepts: () => true,
    sortable: true,
    draggable: () => true,
    handleNodePointerup(data) {
      data.targetData.node.el.setAttribute("draggable", "true");
    },
    plugins: [
      customInsertPlugin({
        insertPoint: () => {
          const div = document.createElement("div");
          for (const cls of insertPointClasses) div.classList.add(cls);
          return div;
        },
      }),
    ],
  },
);
</script>
```
