# Pixel-Perfect QA Checklist - SHOP.CO E-commerce

## Overview
This document provides a comprehensive checklist for ensuring pixel-perfect alignment with the Figma design specifications across all breakpoints and components.

**Figma Reference:** `lFowbS17HcZYFE9qzItCHH`

---

## 🎯 Design Token Verification

### Colors
- [ ] **Background (Light):** `#ffffff`
- [ ] **Background (Dark):** `#000000`
- [ ] **Foreground (Light):** `#000000`
- [ ] **Foreground (Dark):** `#ffffff`
- [ ] **Primary (Light):** `#000000`
- [ ] **Primary (Dark):** `#ffffff`
- [ ] **Secondary Background:** `#f0f0f0`
- [ ] **Hero Background:** `#f2f0f1`
- [ ] **Product Card Background:** `#f0eeed`
- [ ] **Star Rating:** `#ffc633`
- [ ] **Verified Badge:** `#01ab31`
- [ ] **Sale/Discount:** `#ff3333`
- [ ] **Text Muted:** `rgba(0, 0, 0, 0.6)`
- [ ] **Text Light:** `rgba(0, 0, 0, 0.4)`
- [ ] **Border:** `rgba(0, 0, 0, 0.1)`

### Border Radius
- [ ] **Small (sm):** `8px` - Small buttons, inputs
- [ ] **Medium (md):** `13px` - Cards, badges
- [ ] **Large (lg):** `20px` - Product cards, style cards
- [ ] **Extra Large (xl):** `40px` - Browse by Style section
- [ ] **Full (pill):** `62px` - Primary buttons, search bars

### Typography

#### Integral CF (Headings)
- [ ] **Hero:** `64px / 64px` (700) - Desktop
- [ ] **Hero:** `48px / 48px` (700) - Tablet
- [ ] **Hero:** `36px / 34px` (700) - Mobile
- [ ] **Section:** `48px / 1.2` (700) - Desktop
- [ ] **Section:** `32px / 1.2` (700) - Mobile
- [ ] **Card:** `32px / 1.2` (700)
- [ ] **Product:** `40px / 1.2` (700)

#### Satoshi (Body)
- [ ] **Body Large:** `16px / 1.375` (400)
- [ ] **Body Medium:** `14px / 1.35` (400)
- [ ] **Body Small:** `12px / 1.35` (400)
- [ ] **Label:** `14px / 1.35` (500, uppercase, 0.03em tracking)

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- [ ] Container padding: `16px` (px-4)
- [ ] Header height: `60px`
- [ ] Button height: `52px`
- [ ] Button padding: `54px` horizontal
- [ ] Typography scales correctly
- [ ] Images maintain aspect ratios
- [ ] Navigation collapses to hamburger menu

### Tablet (768px - 1023px)
- [ ] Container padding: `32px` (px-8)
- [ ] Header height: `60px`
- [ ] Typography transitions smoothly
- [ ] Grid layouts adjust (2-column where appropriate)
- [ ] Images scale proportionally

### Desktop (≥ 1024px)
- [ ] Container padding: `100px` (px-[100px])
- [ ] Max width: `1440px`
- [ ] Header height: `93px`
- [ ] Full navigation visible
- [ ] All hover states functional
- [ ] Grid layouts at full width

---

## 🏠 Homepage Components

### Header
- [ ] **Logo:** "SHOP.CO" - Integral CF, 32px (lg), 25px (mobile)
- [ ] **Height:** 93px (desktop), 60px (mobile)
- [ ] **Top Banner:** Black bg, white text, 9px padding
- [ ] **Navigation Links:** 16px Satoshi, 24px gap
- [ ] **Search Bar:** 48px height, 62px radius, #F0F0F0 bg
- [ ] **Search Icon:** 20px, left 16px, 40% opacity
- [ ] **Icons:** 24px, 14px gap
- [ ] **Border:** 1px solid rgba(0,0,0,0.1)
- [ ] **Sticky positioning** works correctly
- [ ] **Mobile menu** slides in from left
- [ ] **Hover states** on navigation items

### Hero Section
- [ ] **Background:** #F2F0F1
- [ ] **Padding Top (Desktop):** 103px
- [ ] **Padding Bottom (Desktop):** 116px
- [ ] **Padding (Mobile):** 40px top, 24px bottom
- [ ] **H1 Size:** 64px/64px (desktop), 36px/34px (mobile)
- [ ] **Description:** 16px, 60% opacity, max-width 545px
- [ ] **Button:** 52px height, 210px width (tablet+), full width (mobile)
- [ ] **Stats Section:** 48px margin-top (desktop), 24px (mobile)
- [ ] **Stats Numbers:** Integral CF, 40px (desktop), 24px (mobile)
- [ ] **Stats Text:** 16px, 60% opacity
- [ ] **Hero Image:** Aspect ratio maintained, object-cover object-top
- [ ] **Decorative Stars:** SVG, positioned absolutely
- [ ] **Small Star:** 56x56 (40px mobile), top-right
- [ ] **Large Star:** 104x104 (64px mobile), bottom-left

### Brand Logos Section
- [ ] **Background:** Black (light mode), White (dark mode)
- [ ] **Padding:** 44px vertical (desktop), 24px (mobile)
- [ ] **Logo Heights:** 34px (desktop), 22px (mobile)
- [ ] **Logo Spacing:** 106px gap (desktop), 24px (mobile)
- [ ] **Logo Inversion:** brightness-0 invert in light, normal in dark
- [ ] **All 5 logos:** Versace, Zara, Gucci, Prada, Calvin Klein
- [ ] **Alignment:** Center (mobile), space-between (desktop)

### New Arrivals Section
- [ ] **Section Padding:** 72px vertical (desktop), 48px (mobile)
- [ ] **Title:** Integral CF, 48px (desktop), 32px (mobile)
- [ ] **Title Margin:** 55px bottom (desktop), 32px (mobile)
- [ ] **Product Grid:** 4 columns (desktop), 2 (tablet), 1-2 (mobile)
- [ ] **Grid Gap:** 20px
- [ ] **View All Button:** Center-aligned, 52px height
- [ ] **Products Load:** Data from getLatestProducts()

### Top Selling Section
- [ ] **Same specifications as New Arrivals**
- [ ] **Products Load:** Data from getLatestProducts()
- [ ] **Different products** than New Arrivals

### Browse by Style Section
- [ ] **Outer Padding:** 70px vertical (desktop), 48px (mobile)
- [ ] **Inner Background:** #F0F0F0, 40px radius
- [ ] **Inner Padding:** 64px horizontal, 70px vertical (desktop)
- [ ] **Title:** 48px (desktop), 32px (mobile), center-aligned
- [ ] **Title Margin:** 64px bottom (desktop), 32px (mobile)
- [ ] **Desktop Grid:** 3 columns, custom spans
- [ ] **Row 1:** Casual (1 col), Formal (2 cols)
- [ ] **Row 2:** Party (2 cols), Gym (1 col)
- [ ] **Card Height:** 289px
- [ ] **Mobile/Tablet:** 2 columns, equal heights (190px)
- [ ] **Card Radius:** 20px
- [ ] **Card Titles:** Integral CF, 36px (desktop), 24px (mobile)
- [ ] **Title Position:** 25px top, 36px left
- [ ] **Hover Effect:** Scale 1.05 on images
- [ ] **Images:** style-casual.png, style-formal.png, style-party.png, style-gym.png

### Happy Customers Section
- [ ] **Section Padding:** 80px vertical (desktop), 48px (mobile)
- [ ] **Title:** Integral CF, 48px (desktop), 32px (mobile)
- [ ] **Title Margin:** 40px bottom (desktop), 28px (mobile)
- [ ] **Testimonial Grid:** 3 columns (desktop), 1-2 (mobile)
- [ ] **Card Padding:** 28px-32px
- [ ] **Card Border:** 1px solid rgba(0,0,0,0.1), 20px radius
- [ ] **Star Rating:** 20px stars, 6.5px gap, #FFC633
- [ ] **Name:** 20px bold
- [ ] **Verified Badge:** Green checkmark icon
- [ ] **Testimonial Text:** 16px, 60% opacity

### Newsletter Section
- [ ] **Background:** None (transparent)
- [ ] **Section Padding:** 180px vertical (desktop), 80px (mobile)
- [ ] **Container Background:** Black (light), White (dark)
- [ ] **Container Padding:** 32px-36px (mobile), 64px (desktop)
- [ ] **Container Radius:** 20px
- [ ] **Title:** Integral CF, 40px (desktop), 32px (mobile)
- [ ] **Title Width:** 70% max on desktop
- [ ] **Input Height:** 48px
- [ ] **Input Radius:** 62px
- [ ] **Input Background:** White (in black container)
- [ ] **Email Icon:** 20px, left positioned
- [ ] **Subscribe Button:** Positioned inside input (right)

---

## 🛍️ Product Card Component

### Layout
- [ ] **Image Container:** Aspect ratio 1:1, 20px radius
- [ ] **Image Background:** #F0EEED (light), #1F1F1F (dark)
- [ ] **Image:** object-cover, hover scale effect
- [ ] **Content Padding:** 12px top

### Typography
- [ ] **Product Name:** 16px-20px bold, line-clamp-1
- [ ] **Rating:** 13px-14px, yellow stars + text
- [ ] **Price:** 20px-24px bold
- [ ] **Old Price:** 20px-24px bold, 30% opacity, line-through
- [ ] **Discount Badge:** 12px, red bg 10% opacity, 62px radius

### Interactions
- [ ] **Card Hover:** Subtle shadow or scale
- [ ] **Image Hover:** Transform scale(1.05)
- [ ] **Link:** Entire card clickable
- [ ] **Accessibility:** Alt text on images

---

## 🦶 Footer Component

### Layout
- [ ] **Background:** #F0F0F0 (light), #1a1a1a (dark)
- [ ] **Padding Top:** 140px (mobile), 188px (desktop)
- [ ] **Container Padding:** 100px horizontal (desktop), 16px (mobile)
- [ ] **Grid:** 5 columns (desktop), 2-3 (tablet), 2 (mobile)
- [ ] **Column Gap:** 110px (desktop), 24px (mobile)

### Brand Column
- [ ] **Logo:** Integral CF, 33.45px (desktop), 29px (mobile)
- [ ] **Logo Margin:** 24px bottom
- [ ] **Description:** 14px, 60% opacity, max-width 248px
- [ ] **Social Icons:** 28px size, 12px gap
- [ ] **Social Buttons:** 28px, round, border, hover effects

### Link Columns
- [ ] **Heading:** 16px medium, 3px tracking, uppercase, 24px margin
- [ ] **Links:** 16px, 60% opacity, 16px gap
- [ ] **Hover:** 100% opacity transition

### Bottom Bar
- [ ] **Border Top:** 1px solid rgba(0,0,0,0.1)
- [ ] **Padding:** 24px vertical
- [ ] **Copyright:** 14px, 60% opacity
- [ ] **Payment Icons:** 30px height, 47px width, 5px radius
- [ ] **Icons Layout:** Flex, 12px gap

---

## ♿ Accessibility Checklist

### Semantic HTML
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] `<nav>` for navigation sections
- [ ] `<main>` for main content
- [ ] `<section>` with descriptive names
- [ ] `<article>` for independent content
- [ ] `<footer>` for footer content

### ARIA Attributes
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-expanded` on dropdown triggers
- [ ] `aria-current="page"` on active nav links
- [ ] `aria-live` for dynamic content updates
- [ ] `role="navigation"` on nav elements
- [ ] `role="banner"` on header
- [ ] `role="contentinfo"` on footer

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Visible focus indicators (2px outline)
- [ ] Tab order logical and sequential
- [ ] Enter/Space activate buttons/links
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys navigate dropdowns
- [ ] Skip to main content link

### Screen Reader Support
- [ ] Alt text on all images (descriptive)
- [ ] Empty alt="" on decorative images
- [ ] Form labels associated with inputs
- [ ] Button text descriptive (not just "Click here")
- [ ] Link text descriptive (avoid "Read more")
- [ ] Error messages announced
- [ ] Loading states announced

### Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text 18px+)
- [ ] Interactive elements contrast ≥ 3:1
- [ ] Focus indicators contrast ≥ 3:1
- [ ] Color not sole indicator of information

---

## 🎨 Dark Mode Verification

### Colors Switch Properly
- [ ] Background: white → black
- [ ] Foreground: black → white
- [ ] Borders: rgba(0,0,0,0.1) → rgba(255,255,255,0.1)
- [ ] Card backgrounds adjusted
- [ ] Button colors inverted
- [ ] Logo/images inverted where needed

### Components
- [ ] Header styling updates
- [ ] Hero section background
- [ ] Product card backgrounds
- [ ] Browse by Style background
- [ ] Testimonial cards
- [ ] Newsletter section inverts
- [ ] Footer background
- [ ] Input fields update

### Toggle Functionality
- [ ] Theme toggle visible in header
- [ ] Smooth transition between modes
- [ ] Preference saved in localStorage
- [ ] System preference respected
- [ ] No FOUC (Flash of Unstyled Content)

---

## 🔍 Cross-Browser Testing

### Chrome/Edge (Chromium)
- [ ] Layout renders correctly
- [ ] Fonts load properly
- [ ] Animations smooth
- [ ] CSS Grid/Flexbox works

### Firefox
- [ ] Layout consistent with Chrome
- [ ] Font rendering acceptable
- [ ] All interactions work

### Safari (Desktop)
- [ ] Backdrop-filter works (or fallback)
- [ ] Border radius renders
- [ ] Font smoothing acceptable
- [ ] Sticky positioning works

### Safari (iOS)
- [ ] Touch interactions work
- [ ] Viewport height handled
- [ ] Scroll behavior smooth
- [ ] No layout shifts

---

## ⚡ Performance Checklist

### Images
- [ ] Proper formats (WebP with fallbacks)
- [ ] Appropriate sizes for breakpoints
- [ ] Lazy loading on non-critical images
- [ ] Priority loading on hero image
- [ ] Alt text on all images
- [ ] Aspect ratios prevent layout shift

### Fonts
- [ ] font-display: swap
- [ ] Preload critical fonts
- [ ] WOFF2 format used
- [ ] Subset fonts if possible

### Assets
- [ ] SVGs optimized
- [ ] Images compressed
- [ ] Icons from sprite/component
- [ ] No duplicate assets

### Core Web Vitals
- [ ] LCP < 2.5s (Largest Contentful Paint)
- [ ] FID < 100ms (First Input Delay)
- [ ] CLS < 0.1 (Cumulative Layout Shift)

---

## 🧪 Testing Procedure

### Visual QA Process
1. **Open Figma design** in one window
2. **Open live site** in another window
3. **Use pixel ruler extension** to measure
4. **Compare at each breakpoint:**
   - Mobile: 375px, 414px
   - Tablet: 768px, 834px
   - Desktop: 1024px, 1280px, 1440px
5. **Check each component** against this list
6. **Document discrepancies** with screenshots
7. **Prioritize fixes** (P0: Breaking, P1: Visual, P2: Nice-to-have)

### Automated Tools
- [ ] **Lighthouse** - Performance, Accessibility, Best Practices
- [ ] **axe DevTools** - Accessibility violations
- [ ] **WAVE** - Web Accessibility Evaluation
- [ ] **Contrast Checker** - WCAG compliance
- [ ] **Browser DevTools** - Layout/spacing verification

### Manual Testing
- [ ] Test keyboard navigation flow
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Test all interactive states (hover, focus, active)
- [ ] Test form validation and errors
- [ ] Test loading states
- [ ] Test error states
- [ ] Test empty states

---

## 📝 Sign-Off Criteria

### Component Level
- [ ] Matches Figma design within 2px tolerance
- [ ] All responsive breakpoints tested
- [ ] All interactive states work
- [ ] Accessibility requirements met
- [ ] Performance acceptable (< 3s load)
- [ ] No console errors

### Page Level
- [ ] All sections implemented
- [ ] Smooth scrolling between sections
- [ ] Consistent spacing throughout
- [ ] Typography hierarchy clear
- [ ] Color scheme consistent
- [ ] No layout shifts on load

### Overall
- [ ] Cross-browser tested
- [ ] Mobile responsive verified
- [ ] Dark mode fully functional
- [ ] Lighthouse score > 90
- [ ] Accessibility score > 95
- [ ] No major bugs
- [ ] Code reviewed
- [ ] Documentation complete

---

## 🐛 Common Issues to Watch For

### Spacing Issues
- Inconsistent padding/margins
- Wrong gap values in grids
- Section spacing not matching Figma
- Component spacing varies

### Typography Issues
- Wrong font family loaded
- Font size doesn't scale properly
- Line height causing layout issues
- Font weight incorrect

### Color Issues
- Colors don't match exactly
- Opacity values wrong
- Dark mode colors incorrect
- Border colors too prominent/subtle

### Layout Issues
- Max-width not applied
- Container padding wrong
- Grid columns not aligning
- Flex items not centered

### Responsive Issues
- Breakpoint jumps jarring
- Mobile menu not working
- Images not scaling properly
- Text wrapping awkwardly

### Interaction Issues
- Hover states missing/wrong
- Focus states not visible
- Transitions too fast/slow
- Click targets too small (< 44px)

---

## 📚 Resources

### Design Tokens Reference
- See `app/globals.css` for all token values
- See `lib/fonts.ts` for font configuration
- See Figma file for source of truth

### Documentation
- Design System Guide: `docs/DESIGN_SYSTEM.md`
- Typography Guide: `docs/TYPOGRAPHY_GUIDE.md`
- Component Library: `components/` directory

### Tools
- Figma: Design reference
- Browser DevTools: Inspection and debugging
- Lighthouse: Performance and accessibility
- axe DevTools: Accessibility testing
- PerfectPixel: Overlay comparison

---

**Last Updated:** 2024
**Maintained By:** Development Team
**Figma File:** lFowbS17HcZYFE9qzItCHH