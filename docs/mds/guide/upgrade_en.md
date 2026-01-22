# STDF v1 to v2 Upgrade Guide

This document helps you upgrade from STDF v1.x to v2.0.0. Version 2 contains several breaking changes, please read carefully and follow the guide for migration.

## Theme System Upgrade (Breaking Changes)

### Theme Switching Method

v1 used JS objects for theme configuration, v2 upgrades to Tailwind CSS plugin + `data-theme` attribute.

#### v1 Syntax (Deprecated)

```javascript
// v1: Import theme config object, use switchTheme with config object
import { switchTheme } from 'stdf/theme';
import { nintendo } from 'stdf/theme';

// Switch theme by passing theme config object
switchTheme(nintendo);
```

#### v2 Syntax

```css
/* Configure theme plugin in app.css */
@plugin "stdf/theme" {
  name: "Nintendo";
}

/* Or use multiple themes */
@plugin "stdf/theme" {
  name: "Nintendo, Ocean, Forest";
}

/* Or load all 42 built-in themes */
@plugin "stdf/theme" {
  all: true;
}
```

```html
<!-- Use data-theme attribute in HTML -->
<html data-theme="Nintendo">
```

```javascript
// Use switchTheme to switch themes
import { switchTheme, getTheme } from 'stdf/theme';

switchTheme('Nintendo');
const currentTheme = getTheme();
```

### Light/Dark Mode Switching

v1 used `.dark` class + `darkMode` function, v2 upgrades to `data-mode` attribute + `switchMode` function.

#### v1 Syntax (Deprecated)

```css
/* v1: Configure dark mode in app.css using .dark class */
@custom-variant dark (&:where(.dark, .dark *));
```

```javascript
// v1: Using darkMode
import { darkMode } from 'stdf/theme';

darkMode();      // Switch to dark mode
darkMode(false); // Switch to light mode
```

#### v2 Syntax

```css
/* v2: Configure dark mode in app.css using data-mode attribute */
@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));
```

> v2 supports nested mode switching, allowing light areas within dark areas and vice versa.

```javascript
// v2: Using switchMode and getMode
import { switchMode, getMode } from 'stdf/theme';

switchMode('dark');    // Switch to dark mode
switchMode('primary'); // Switch to light mode

const currentMode = getMode(); // Get current mode
```

### Removed Exports

The following exports have been removed from `stdf/theme`:

- `darkMode` - Use `switchMode` instead
- `STDFTheme` - Use `@plugin "stdf/theme"` + `data-theme` instead
- All JS theme objects (e.g., `nintendo`, `ocean`, etc.) - Use plugin built-in themes instead

### New Exports

```javascript
import {
  switchTheme,      // Switch theme
  switchMode,       // Switch light/dark mode
  getTheme,         // Get current theme
  getMode,          // Get current mode
  generateColorScale, // Generate color scale
  themes,           // Built-in themes list
  stdfThemePlugin   // Tailwind CSS plugin
} from 'stdf/theme';
```

---

## Component API Changes

### Button

| Change Type | v1 | v2 | Description |
|-------------|----|----|-------------|
| Renamed | `line` | `border` | Border style property renamed |
| Option Changed | `fill: 'lineTheme'` | `fill: 'lineState'` | Line theme color changed to state color |
| Option Changed | `fill: 'textTheme'` | `fill: 'textState'` | Text theme color changed to state color |
| Removed | `group` | - | Button group now uses `ButtonGroup` component |
| Extended | `radius` | `radius` | Added more levels and supports empty value |

```javascript
// v1
<Button line fill="lineTheme" group />

// v2
<Button border fill="lineState" />
// Button group uses ButtonGroup component
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

### Avatar

| Change Type | v1 | v2 | Description |
|-------------|----|----|-------------|
| Component Removed | `Avatars` | `AvatarGroup` | Avatar group is now a separate component |
| Option Changed | `radius: '3xl'` | - | Removed `3xl`, added `xs`, `md`, `lg` |
| Default Value | - | Theme radius | Default radius changed to theme radius |

```javascript
// v1
import { Avatar, Avatars } from 'stdf';
<Avatars list={avatarList} />

// v2
import { Avatar, AvatarGroup } from 'stdf';
<AvatarGroup list={avatarList} />
```

### Popup

| Change Type | v1 | v2 | Description |
|-------------|----|----|-------------|
| Removed | `allowBodyScroll` | - | Scrolling handled internally |
| Added | - | `radiusPosition: 'auto' \| 'none'` | Auto handle radius based on popup direction |
| Extended | `radius` | `radius` | Extended and adjusted default value |

### ActionSheet

| Change Type | v1 | v2 | Description |
|-------------|----|----|-------------|
| Option Removed | `style: 'danger'` | `style: 'error'` | `danger` changed to `error` |
| Option Removed | `style: 'disabled'` | `disabled: true` | Disabled is now a separate property |
| Added | - | `disabled` | Action Props added disabled property |
| Added | - | `icon` | Action Props added icon property |
| Added | - | `style: 'success' \| 'warning' \| 'info'` | Added status styles |

```javascript
// v1
const actions = [
  { label: 'Delete', style: 'danger' },
  { label: 'Disabled Item', style: 'disabled' }
];

// v2
const actions = [
  { label: 'Delete', style: 'error' },
  { label: 'Disabled Item', disabled: true }
];
```

### Slider

| Change Type | v1 | v2 | Description |
|-------------|----|----|-------------|
| Added | - | `showSteps` | Support step display |
| Added | - | `stepsStyle` | Step style configuration |
| Added | - | `stepLabels` | Custom step labels |
| Enhanced | `onchange(value)` | `onchange(value, label, rangeLabel)` | Added label parameters |

### Picker

| Change Type | v1 | v2 | Description |
|-------------|----|----|-------------|
| Added | - | `multiple` | Multiple selection mode |
| Added | - | `multipleSelected` | Multiple selected values |
| Added | - | `onmultiplechange` | Multiple selection change event |
| Added | - | `multipleIcon` | Multiple selection icon |
| Added | - | `multipleIconActive` | Multiple selection active icon |

### Calendar

| Change Type | v1 | v2 | Description |
|-------------|----|----|-------------|
| Added | - | `card` | Support Card configuration for month cards |
| Added | - | `initSelectedDates` | Initialize selected dates |
| Enhanced | `popup` | `popup: null` | Support `null` for direct display |

### Form

| Change Type | v1 | v2 | Description |
|-------------|----|----|-------------|
| Type Added | - | `fullKeyboard` | Full keyboard input type |
| Type Added | - | `colorPicker` | Color picker type |
| Upgraded | `card: boolean` | `card: CardProps` | From boolean to object configuration |
| Removed | `mx`, `px`, `radius`, `shadow` | - | Removed individual configs, use `card` unified config |

```javascript
// v1
<Form card mx="4" px="4" radius="lg" shadow="md" />

// v2
<Form card={{ mx: '4', px: '4', radius: 'lg', shadow: 'md' }} />
```

---

## Common Changes

### radius Option

Most components' `radius` property has been adjusted:

1. **Extended Options**: Added more levels (e.g., `xs`, `3xl`, `4xl`)
2. **Supports Empty Value**: Can pass empty string for default style
3. **Default Value Changed**: Most components default to theme radius (`--radius-box` or `--radius-form`)

Affected components:
- Avatar, Badge, BottomSheet, Button, Calendar
- Cell, CellGroup, NumKeyboard, Picker, Placeholder
- Popup, Progress, Skeleton, Slider, Stepper
- Steps, Swiper, Switch, Tabs, TimePicker, Toast

### popup Property Enhancement

The following components' `popup` property supports `null` for direct display without popup layer:

- Calendar
- Picker
- AsyncPicker
- TimePicker
- NumKeyboard

```javascript
// Display directly on page without popup layer
<Picker popup={null} />
<Calendar popup={null} />
```

---

## New Components

v2 adds the following components:

- **Accordion** - Accordion
- **ActionPopover** - Action Popover
- **Alert** - Alert Dialog
- **AvatarGroup** - Avatar Group (separated from Avatars)
- **ButtonGroup** - Button Group (separated from Button group property)
- **Card** - Card
- **CharRoll** - Character Roll
- **CodeInput** - Code Input
- **ColorPicker** - Color Picker
- **CountDown** - Countdown
- **Feedback** - Functional Feedback
- **FullKeyboard** - Full Keyboard
- **ImageList** - Image List
- **ImagePreview** - Image Preview
- **List** - List
- **Signature** - Signature
- **Tag** - Tag
- **Tooltip** - Tooltip

---

## New Capabilities

### Feedback Functional API

v2 adds functional API for feedback components, supporting `toast`, `showAlert`, `dialog`, `modal`, `loading` methods. You can call feedback components anywhere via functions. See [Functional Feedback](/guide/feedback) for details.

---

## Migration Checklist

- [ ] Update theme configuration: Migrate from JS objects to `@plugin "stdf/theme"`
- [ ] Update light/dark mode: Migrate from `darkMode` to `switchMode`
- [ ] Add CSS configuration: `@custom-variant dark`
- [ ] Check Button component: `line` → `border`, `group` → `ButtonGroup`
- [ ] Check Avatar component: `Avatars` → `AvatarGroup`
- [ ] Check ActionSheet component: `danger` → `error`, `disabled` as property
- [ ] Check Form component: `card` from boolean to object
- [ ] Check Popup component: Remove `allowBodyScroll`
- [ ] Check `radius` default value changes in components
- [ ] Test theme switching functionality
- [ ] Test light/dark mode switching functionality

---

## Getting Help

If you encounter issues during upgrade:

1. Check [Theme Guide](/guide/theme) for the new theme system
2. Check each component's API documentation for detailed changes
3. Submit issues on [GitHub Issues](https://github.com/any-tdf/stdf/issues)
