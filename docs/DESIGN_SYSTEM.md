# SHOP.CO Design System

A comprehensive guide to the design tokens, components, and patterns used in the SHOP.CO e-commerce application.

---

## Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Components](#components)
7. [Layout](#layout)
8. [Animations](#animations)
9. [Dark Mode](#dark-mode)
10. [Usage Guidelines](#usage-guidelines)

---

## Colors

### Primary Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `#ffffff` | `#000000` | Page background |
| `--foreground` | `#000000` | `#ffffff` | Primary text |
| `--primary` | `#000000` | `#ffffff` | Buttons, emphasis |
| `--primary-foreground` | `#ffffff` | `#000000` | Text on primary |

### Secondary Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--secondary` | `#f0f0f0` | `#1a1a1a` | Secondary backgrounds |
| `--secondary-foreground` | `#000000` | `#ffffff` | Text on secondary |
| `--muted` | `#f0f0f0` | `#1a1a1a` | Muted backgrounds |
| `--muted-foreground` | `rgba(0,0,0,0.6)` | `rgba(255,255,255,0.6)` | Muted text |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-star` | `#ffc633` | Star ratings |
| `--color-verified` | `#01ab31` | Verified badges |
| `--color-sale` | `#ff3333` | Sale prices, discounts |
| `--color-sale-bg` | `rgba(255,51,51,0.1)` | Discount badge background |

### Surface Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-hero-bg` | `#f2f0f1` | `#1a1a1a` | Hero section |
| `--color-gray-bg` | `#f0f0f0` | `#1a1a1a` | Gray sections |
| `--color-product-bg` | `#f0eeed` | `#1f1f1f` | Product card images |

### Opacity Scale

| Level | Value | Usage |
|-------|-------|-------|
| Muted | `60%` | Secondary text |
| Light | `40%` | Placeholder text |
| Subtle | `30%` | Strikethrough prices |
| Border | `10%` | Borders, dividers |

### CSS Variables Usage

```css
/* In your component styles */
.example {
  background: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}

/* Muted text */
.muted-text {
  color: rgba(0, 0, 0, 0.6); /* Light mode */
  /* or use Tailwind */
  @apply text-black/60 dark:text-white/60;
}
```

---

## Typography

### Font Families

#### Integral CF (Display)
- **Usage:** Headlines, section titles, logo
- **CSS Variable:** `--font-integral`
- **Weights:** Regular (400), Medium (500), Bold (700), Heavy (900)

#### Satoshi (Body)
- **Usage:** Body text, descriptions, labels
- **CSS Variable:** `--font-satoshi`
- **Weights:** Light (300), Regular (400), Medium (500), Bold (700), Black (900)

### Type Scale

#### Display Headings (Integral CF)

| Class | Size (Desktop) | Size (Mobile) | Line Height | Weight |
|-------|----------------|---------------|-------------|--------|
| `.heading-hero` | 64px | 36px | 1.0 | 700 |
| `.heading-section` | 48px | 32px | 1.2 | 700 |
| `.heading-card` | 32px | 24px | 1.2 | 700 |
| `.heading-product` | 40px | 32px | 1.2 | 700 |

#### Body Text (Satoshi)

| Class | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `.text-body-lg` | 16px | 1.375 | 400 | Primary body text |
| `.text-body-md` | 14px | 1.35 | 400 | Secondary text |
| `.text-body-sm` | 12px | 1.35 | 400 | Small text, captions |
| `.text-label` | 14px | 1.35 | 500 | Labels (uppercase) |

### Responsive Typography Utilities

```css
/* Tailwind utility classes */
.h1-bold {
  @apply text-[36px] leading-[38px] md:text-[48px] md:leading-[48px] lg:text-[64px] lg:leading-[64px] font-bold;
}

.h2-bold {
  @apply text-[32px] lg:text-[48px] font-bold leading-[1.2];
}

.h3-bold {
  @apply text-[24px] lg:text-[32px] font-bold leading-[1.2];
}
```

### Using Fonts in Components

```tsx
import { integralCF, satoshi } from "@/lib/fonts";

// Apply Integral CF to headings
<h1 className={`${integralCF.className} text-[64px] font-bold`}>
  SHOP.CO
</h1>

// Satoshi is applied globally to body
<p className="text-base">Body text uses Satoshi</p>
```

---

## Spacing

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Micro spacing |
| `2` | 8px | Element gaps |
| `3` | 12px | Small component padding |
| `4` | 16px | Standard padding |
| `5` | 20px | Grid gaps |
| `6` | 24px | Section elements |
| `8` | 32px | Component margins |
| `10` | 40px | Section spacing |
| `12` | 48px | Mobile sections |
| `16` | 64px | Desktop spacing |
| `[70px]` | 70px | Section vertical padding |
| `[100px]` | 100px | Desktop container padding |

### Container Padding

| Breakpoint | Horizontal Padding |
|------------|-------------------|
| Mobile | `16px` (px-4) |
| Tablet | `32px` (px-8) |
| Desktop | `100px` (px-[100px]) |

### Section Spacing

| Section | Desktop | Mobile |
|---------|---------|--------|
| Hero Top | 103px | 40px |
| Hero Bottom | 116px | 24px |
| Standard Section | 70px | 48px |
| Newsletter | 180px | 80px |

---

## Border Radius

### Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Small buttons, badges |
| `--radius-md` | 13px | Cards, inputs |
| `--radius-lg` | 20px | Product cards, sections |
| `--radius-xl` | 40px | Browse by Style container |
| `--radius-full` | 62px | Pills, primary buttons |

### Common Patterns

```css
/* Product card image */
.product-card-image {
  border-radius: 20px;
}

/* Primary button */
.btn-primary {
  border-radius: 62px;
}

/* Search input */
.search-input {
  border-radius: 62px;
}

/* Browse by Style section */
.style-section {
  border-radius: 40px;
}
```

---

## Shadows

The design uses minimal shadows, relying primarily on:
- Subtle borders (`rgba(0,0,0,0.1)`)
- Background color differentiation
- Hover state shadows for interactive elements

### Hover Shadow

```css
.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
```

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  @apply inline-flex items-center justify-center 
         h-[52px] px-[54px] 
         bg-black dark:bg-white 
         text-white dark:text-black 
         rounded-[62px] 
         text-base font-medium 
         hover:bg-black/90 dark:hover:bg-white/90 
         transition-colors;
}
```

#### Secondary Button
```css
.btn-secondary {
  @apply inline-flex items-center justify-center 
         h-[52px] px-[54px] 
         border border-black/10 dark:border-white/10 
         rounded-[62px] 
         text-base font-medium 
         hover:bg-black hover:text-white 
         dark:hover:bg-white dark:hover:text-black 
         transition-colors;
}
```

#### Small Button
```css
.btn-sm {
  @apply inline-flex items-center justify-center 
         h-[36px] px-[14px] 
         rounded-[8px] 
         text-sm font-medium 
         transition-colors;
}
```

### Inputs

#### Search Input
```css
.input-search {
  @apply w-full h-12 
         pl-12 pr-4 
         bg-[#F0F0F0] dark:bg-[#1F1F1F] 
         rounded-[62px] 
         text-base 
         placeholder:text-black/40 dark:placeholder:text-white/40 
         outline-none 
         focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 
         transition-all;
}
```

#### Newsletter Input
```css
.input-newsletter {
  @apply w-full h-[48px] 
         pl-12 pr-4 
         bg-white dark:bg-black 
         rounded-[62px] 
         text-base 
         placeholder:text-black/40 dark:placeholder:text-white/40 
         outline-none;
}
```

### Cards

#### Product Card Image Container
```css
.product-card-image {
  @apply relative aspect-square 
         bg-[#F0EEED] dark:bg-[#1F1F1F] 
         rounded-[20px] 
         overflow-hidden;
}
```

#### Review Card
```css
.review-card {
  @apply p-[28px] lg:p-[32px] 
         border border-black/10 dark:border-white/10 
         rounded-[20px];
}
```

### Badges

#### Discount Badge
```css
.discount-badge {
  @apply inline-flex items-center justify-center 
         px-[14px] py-[6px] 
         bg-[rgba(255,51,51,0.1)] 
         rounded-[62px] 
         text-xs font-medium 
         text-[#FF3333];
}
```

### Size Selector
```css
/* Inactive */
.size-btn {
  @apply inline-flex items-center justify-center 
         px-5 py-[10px] 
         bg-[#F0F0F0] dark:bg-[#1F1F1F] 
         rounded-[62px] 
         text-sm text-black/60 dark:text-white/60 
         hover:bg-black hover:text-white 
         dark:hover:bg-white dark:hover:text-black 
         transition-colors;
}

/* Active */
.size-btn-active {
  @apply inline-flex items-center justify-center 
         px-5 py-[10px] 
         bg-black dark:bg-white 
         rounded-[62px] 
         text-sm font-medium 
         text-white dark:text-black;
}
```

### Star Rating
```css
.star-rating {
  @apply flex items-center gap-[6.5px];
}

/* Star color */
.star {
  color: #ffc633;
}
```

---

## Layout

### Max Width
- Container max-width: `1440px`

### Wrapper Utility
```css
.wrapper {
  @apply mx-auto max-w-[1440px] w-full px-4 md:px-8 lg:px-[100px];
}
```

### Grid Patterns

#### Product Grid
```css
/* 4 columns desktop, 2 tablet, 1-2 mobile */
.product-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5;
}
```

#### Browse by Style (Desktop)
```css
.style-grid {
  @apply grid grid-cols-3 gap-5;
}
/* Row 1: Casual (1 col), Formal (2 cols) */
/* Row 2: Party (2 cols), Gym (1 col) */
```

#### Footer Grid
```css
.footer-grid {
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
         gap-6 lg:gap-[110px];
}
```

### Responsive Breakpoints

| Breakpoint | Width | Tailwind Prefix |
|------------|-------|-----------------|
| Mobile | < 768px | (default) |
| Tablet | ≥ 768px | `md:` |
| Desktop | ≥ 1024px | `lg:` |
| Wide | ≥ 1280px | `xl:` |

---

## Animations

### Keyframes

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes scale-in {
  from { 
    opacity: 0; 
    transform: scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
}
```

### Animation Utilities

```css
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}
```

### Hover Transitions

```css
/* Standard transition */
.transition-colors {
  transition: color, background-color 150ms ease;
}

/* Image hover scale */
.image-hover {
  transition: transform 300ms ease;
}
.image-hover:hover {
  transform: scale(1.05);
}
```

---

## Dark Mode

### Implementation

Dark mode is implemented using CSS custom properties and the `.dark` class on the `<html>` element.

### Color Mapping

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | White | Black |
| Text | Black | White |
| Borders | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` |
| Cards | White | `#0a0a0a` |
| Inputs | `#f0f0f0` | `#1f1f1f` |

### Component Patterns

```tsx
// Button that inverts in dark mode
<button className="bg-black dark:bg-white text-white dark:text-black">
  Click Me
</button>

// Border that adjusts opacity
<div className="border border-black/10 dark:border-white/10">
  Content
</div>

// Muted text
<p className="text-black/60 dark:text-white/60">
  Secondary text
</p>
```

### Logo Inversion

```tsx
// Invert logos in black bar (light mode only)
<Image
  src="/images/logo.svg"
  className="brightness-0 invert dark:brightness-100 dark:invert-0"
/>
```

---

## Usage Guidelines

### Do's

✅ Use design tokens instead of hardcoded values
✅ Follow the spacing scale for consistency
✅ Use semantic color tokens for proper dark mode support
✅ Apply responsive typography classes
✅ Use the wrapper utility for consistent container padding
✅ Follow the established component patterns
✅ Test all components in both light and dark modes

### Don'ts

❌ Don't hardcode color values
❌ Don't use arbitrary spacing values
❌ Don't skip hover/focus states
❌ Don't forget dark mode styling
❌ Don't use font-size without line-height
❌ Don't create one-off component styles

### Accessibility Considerations

- Maintain color contrast ratio ≥ 4.5:1 for text
- Provide visible focus indicators
- Use semantic HTML elements
- Include ARIA labels on icon-only buttons
- Ensure touch targets are ≥ 44px

### File Structure

```
├── app/
│   └── globals.css          # Design tokens and utilities
├── lib/
│   └── fonts.ts             # Font configuration
├── components/
│   ├── ui/                  # Shadcn/ui components
│   └── layout/              # Layout components
└── docs/
    ├── DESIGN_SYSTEM.md     # This file
    └── PIXEL_PERFECT_QA_CHECKLIST.md
```

---

## Quick Reference

### Essential Classes

```css
/* Layout */
.wrapper          /* Container with responsive padding */
.flex-center      /* Flex center alignment */
.flex-between     /* Flex space-between */

/* Typography */
.h1-bold          /* Hero heading */
.h2-bold          /* Section heading */
.text-muted-base  /* Muted body text */

/* Buttons */
.btn-primary      /* Black/white primary button */
.btn-secondary    /* Outlined secondary button */
.btn-sm           /* Small button variant */

/* Cards */
.product-card-image   /* Product image container */
.review-card          /* Testimonial card */
.card-bordered        /* Generic bordered card */

/* Forms */
.input-search         /* Search input style */
.input-newsletter     /* Newsletter input style */

/* Badges */
.discount-badge       /* Red discount badge */
```

---

**Version:** 1.0.0
**Last Updated:** 2024
**Figma Reference:** lFowbS17HcZYFE9qzItCHH