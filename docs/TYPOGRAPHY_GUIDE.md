# Typography Guide - SHOP.CO E-commerce

A comprehensive guide to typography implementation for pixel-perfect alignment with the Figma design.

---

## Table of Contents

1. [Font Families](#font-families)
2. [Type Scale](#type-scale)
3. [Implementation](#implementation)
4. [Responsive Typography](#responsive-typography)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Font Families

### Integral CF (Display Font)

**Purpose:** Headlines, section titles, logo, and emphasis text

| Weight | Value | File |
|--------|-------|------|
| Regular | 400 | `Fontspring-DEMO-integralcf-regular.woff2` |
| Medium | 500 | `Fontspring-DEMO-integralcf-medium.woff2` |
| DemiBold | 600 | `Fontspring-DEMO-integralcf-demibold.woff2` |
| Bold | 700 | `Fontspring-DEMO-integralcf-bold.woff2` |
| ExtraBold | 800 | `Fontspring-DEMO-integralcf-extrabold.woff2` |
| Heavy | 900 | `Fontspring-DEMO-integralcf-heavy.woff2` |

**CSS Variable:** `--font-integral`

**Usage Examples:**
- Logo ("SHOP.CO")
- Hero headline
- Section titles ("NEW ARRIVALS", "TOP SELLING")
- Style card titles ("Casual", "Formal", "Party", "Gym")

---

### Satoshi (Body Font)

**Purpose:** Body text, descriptions, labels, buttons, navigation

| Weight | Value | File |
|--------|-------|------|
| Light | 300 | `Satoshi-Light.woff2` |
| Regular | 400 | `Satoshi-Regular.woff2` |
| Medium | 500 | `Satoshi-Medium.woff2` |
| Bold | 700 | `Satoshi-Bold.woff2` |
| Black | 900 | `Satoshi-Black.woff2` |

**CSS Variable:** `--font-satoshi`

**Usage Examples:**
- Navigation links
- Body paragraphs
- Button text
- Product names
- Prices
- Form labels and inputs

---

## Type Scale

### Display Headings (Integral CF)

| Element | Desktop | Tablet | Mobile | Line Height | Weight |
|---------|---------|--------|--------|-------------|--------|
| Hero H1 | 64px | 48px | 36px | 1.0 | 700 |
| Section H2 | 48px | 40px | 32px | 1.2 | 700 |
| Card H3 | 36px | 28px | 24px | 1.2 | 700 |
| Product Title | 40px | 32px | 24px | 1.2 | 700 |

### Body Text (Satoshi)

| Type | Size | Line Height | Weight | Letter Spacing |
|------|------|-------------|--------|----------------|
| Body Large | 16px | 1.375 (22px) | 400 | normal |
| Body Medium | 14px | 1.35 (19px) | 400 | normal |
| Body Small | 12px | 1.35 (16px) | 400 | normal |
| Label | 14px | 1.35 (19px) | 500 | 0.03em (uppercase) |

### Specific Elements

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| Logo | 32px | 25px | 700 | 1 |
| Navigation | 16px | 16px | 400 | 1 |
| Button | 16px | 16px | 500 | 1 |
| Product Name | 20px | 16px | 700 | 1.2 |
| Product Price | 24px | 20px | 700 | 1 |
| Old Price | 24px | 20px | 700 | 1 |
| Discount Badge | 12px | 12px | 500 | 1 |
| Star Rating Text | 16px | 14px | 400 | 1 |
| Testimonial Name | 20px | 16px | 700 | 1.2 |
| Testimonial Text | 16px | 14px | 400 | 1.6 |
| Footer Heading | 16px | 14px | 500 | 1 |
| Footer Link | 16px | 14px | 400 | 1.5 |
| Copyright | 14px | 12px | 400 | 1 |

---

## Implementation

### Importing Fonts

```tsx
// In your component
import { integralCF, satoshi } from "@/lib/fonts";
```

### Using Integral CF (Headings)

```tsx
// Direct class application
<h1 className={`${integralCF.className} text-[64px] font-bold leading-[64px]`}>
  FIND CLOTHES THAT MATCHES YOUR STYLE
</h1>

// With responsive sizing
<h2 className={`${integralCF.className} text-[32px] lg:text-[48px] font-bold`}>
  NEW ARRIVALS
</h2>
```

### Using Satoshi (Body)

Satoshi is applied globally to the body, so you don't need to explicitly apply it:

```tsx
// Body text automatically uses Satoshi
<p className="text-base text-black/60">
  Browse through our diverse range of meticulously crafted garments.
</p>

// For emphasis
<span className="text-base font-medium">
  Sign Up Now
</span>
```

### CSS Utility Classes

Pre-defined typography utilities in `globals.css`:

```css
/* Display Headings */
.heading-hero {
  font-family: var(--font-integral), sans-serif;
  font-weight: 700;
  font-size: 64px;
  line-height: 64px;
}

.heading-section {
  font-family: var(--font-integral), sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1.2;
}

.heading-card {
  font-family: var(--font-integral), sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
}

/* Body Text */
.text-body-lg {
  font-family: var(--font-satoshi), sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.375;
}

.text-body-md {
  font-family: var(--font-satoshi), sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.35;
}

.text-body-sm {
  font-family: var(--font-satoshi), sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.35;
}

.text-label {
  font-family: var(--font-satoshi), sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.35;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
```

### Tailwind Responsive Utilities

```css
/* Hero heading with responsive sizing */
.h1-bold {
  @apply text-[36px] leading-[38px] md:text-[48px] md:leading-[48px] lg:text-[64px] lg:leading-[64px] font-bold;
}

/* Section heading */
.h2-bold {
  @apply text-[32px] lg:text-[48px] font-bold leading-[1.2];
}

/* Card heading */
.h3-bold {
  @apply text-[24px] lg:text-[32px] font-bold leading-[1.2];
}

/* Muted text */
.text-muted-sm {
  @apply text-sm text-black/60 dark:text-white/60;
}

.text-muted-base {
  @apply text-base text-black/60 dark:text-white/60;
}
```

---

## Responsive Typography

### Breakpoint Strategy

| Breakpoint | Width | Tailwind Prefix |
|------------|-------|-----------------|
| Mobile | < 768px | (default) |
| Tablet | ≥ 768px | `md:` |
| Desktop | ≥ 1024px | `lg:` |
| Wide | ≥ 1280px | `xl:` |

### Example: Hero Headline

```tsx
<h1 className={`
  ${integralCF.className}
  text-[36px] leading-[34px]     /* Mobile */
  md:text-[48px] md:leading-[48px]  /* Tablet */
  lg:text-[64px] lg:leading-[64px]  /* Desktop */
  font-bold
`}>
  FIND CLOTHES THAT MATCHES YOUR STYLE
</h1>
```

### Example: Section Title

```tsx
<h2 className={`
  ${integralCF.className}
  text-[32px]        /* Mobile */
  lg:text-[48px]     /* Desktop */
  font-bold
  leading-[1.2]
`}>
  NEW ARRIVALS
</h2>
```

### Example: Product Name

```tsx
<h3 className="
  font-bold
  text-base         /* Mobile: 16px */
  lg:text-xl        /* Desktop: 20px */
  line-clamp-1
">
  {product.name}
</h3>
```

### Example: Body Text

```tsx
<p className="
  text-sm           /* Mobile: 14px */
  md:text-base      /* Desktop: 16px */
  text-black/60
  dark:text-white/60
  leading-[1.4]
">
  {description}
</p>
```

---

## Best Practices

### ✅ Do's

1. **Use font imports correctly**
   ```tsx
   import { integralCF } from "@/lib/fonts";
   <h1 className={`${integralCF.className} ...`}>
   ```

2. **Always pair font-size with line-height**
   ```tsx
   <h1 className="text-[64px] leading-[64px]">
   ```

3. **Use semantic heading hierarchy**
   ```tsx
   <h1>Main Page Title</h1>
   <h2>Section Title</h2>
   <h3>Card Title</h3>
   ```

4. **Apply muted opacity for secondary text**
   ```tsx
   <p className="text-black/60 dark:text-white/60">
   ```

5. **Use responsive utilities consistently**
   ```tsx
   <span className="text-sm lg:text-base">
   ```

6. **Truncate long text properly**
   ```tsx
   <h3 className="line-clamp-1">{title}</h3>
   <p className="line-clamp-2">{description}</p>
   ```

### ❌ Don'ts

1. **Don't mix font families incorrectly**
   ```tsx
   // Bad: Integral CF for body text
   <p className={`${integralCF.className}`}>Body text</p>
   
   // Good: Let Satoshi apply naturally
   <p>Body text</p>
   ```

2. **Don't hardcode pixel values without line-height**
   ```tsx
   // Bad
   <h1 className="text-[64px]">
   
   // Good
   <h1 className="text-[64px] leading-[64px]">
   ```

3. **Don't forget dark mode variants**
   ```tsx
   // Bad
   <p className="text-black/60">
   
   // Good
   <p className="text-black/60 dark:text-white/60">
   ```

4. **Don't use arbitrary values when tokens exist**
   ```tsx
   // Bad
   <p className="text-[16px]">
   
   // Good
   <p className="text-base">
   ```

---

## Troubleshooting

### Font Not Loading

1. **Check font file paths in `lib/fonts.ts`**
   - Ensure paths point to `../public/fonts/`
   - Verify file names match exactly

2. **Verify font files exist**
   ```bash
   ls public/fonts/
   ```

3. **Check browser DevTools**
   - Network tab: Look for 404 errors on font files
   - Console: Look for font loading errors

### Wrong Font Weight Displaying

1. **Verify weight is defined in font configuration**
   ```ts
   // lib/fonts.ts
   {
     path: '../public/fonts/Satoshi-Bold.woff2',
     weight: '700',
     style: 'normal',
   }
   ```

2. **Use correct weight class**
   ```tsx
   // For Satoshi Bold
   <span className="font-bold">  // 700
   
   // For Satoshi Medium
   <span className="font-medium">  // 500
   ```

### Line Height Issues

1. **Use explicit line-height with custom font sizes**
   ```tsx
   // Custom size needs custom line-height
   <h1 className="text-[64px] leading-[64px]">
   
   // Standard sizes use default line-heights
   <p className="text-base">  // Uses default 1.5 line-height
   ```

2. **For tighter headlines**
   ```tsx
   <h1 className="text-[64px] leading-none">  // line-height: 1
   <h1 className="text-[64px] leading-tight">  // line-height: 1.25
   ```

### Text Not Responsive

1. **Add breakpoint prefixes**
   ```tsx
   // Non-responsive
   <h1 className="text-[64px]">
   
   // Responsive
   <h1 className="text-[36px] md:text-[48px] lg:text-[64px]">
   ```

### Dark Mode Text Issues

1. **Always pair light/dark variants**
   ```tsx
   <p className="text-black dark:text-white">
   <p className="text-black/60 dark:text-white/60">
   ```

---

## Quick Reference

### Font Classes

| Font | Class Usage |
|------|-------------|
| Integral CF | `${integralCF.className}` |
| Satoshi | Applied globally (default) |

### Weight Classes

| Weight | Class |
|--------|-------|
| Light | `font-light` (300) |
| Normal | `font-normal` (400) |
| Medium | `font-medium` (500) |
| Semibold | `font-semibold` (600) |
| Bold | `font-bold` (700) |
| Black | `font-black` (900) |

### Size Classes (Tailwind)

| Class | Size |
|-------|------|
| `text-xs` | 12px |
| `text-sm` | 14px |
| `text-base` | 16px |
| `text-lg` | 18px |
| `text-xl` | 20px |
| `text-2xl` | 24px |
| `text-3xl` | 30px |
| `text-4xl` | 36px |
| `text-5xl` | 48px |
| `text-6xl` | 60px |

### Opacity Classes for Muted Text

| Opacity | Class |
|---------|-------|
| 60% | `text-black/60 dark:text-white/60` |
| 40% | `text-black/40 dark:text-white/40` |
| 30% | `text-black/30 dark:text-white/30` |
| 10% | `text-black/10 dark:text-white/10` |

---

**Version:** 1.0.0
**Last Updated:** 2024
**Reference:** Figma file `lFowbS17HcZYFE9qzItCHH`
