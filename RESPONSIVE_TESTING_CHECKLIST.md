# Product Detail Page - Responsive Testing Checklist

## Testing Instructions
1. Server is running at: **http://localhost:3001**
2. Navigate to any product page, e.g., `/product/polo-sporting-stretch-shirt`
3. Open Chrome DevTools (F12) → Toggle Device Toolbar (Ctrl+Shift+M)
4. Test at each breakpoint below

---

## Mobile View (390px width)

### Layout
- [ ] Container padding: 16px (px-4)
- [ ] Product layout uses vertical stack (flex-col)
- [ ] Images appear above product details

### Image Gallery
- [ ] Main image: 358px × 530px
- [ ] Thumbnail size: 111px × 106px (w-[111px] h-[106px])
- [ ] Thumbnail gap: 14px (gap-3.5)
- [ ] Thumbnails display in horizontal row with scrolling

### Typography
- [ ] Product title: 24px (text-2xl)
- [ ] Star rating icons: 19px × 19px (w-[19px] h-[19px])
- [ ] Price: 24px (text-2xl)
- [ ] Description: 14px with 20px line-height (text-sm leading-[20px])

### Interactive Elements
- [ ] Color swatches: 37px × 37px (w-[37px] h-[37px])
- [ ] Size buttons: padding-x: 20px, padding-y: 10px (px-5 py-2.5)
- [ ] Add to Cart button displays full width

---

## Tablet View (768px - md breakpoint)

### Layout
- [ ] Container padding: 32px (md:px-8)
- [ ] Smooth transition from mobile to tablet layout
- [ ] Product layout starts transitioning to horizontal

### Typography & Spacing
- [ ] Elements begin scaling up smoothly
- [ ] No layout breaks or overlapping content

---

## Desktop View (1024px+ - lg breakpoint)

### Layout
- [ ] Container padding: 100px (lg:px-[100px])
- [ ] Product layout: horizontal (lg:flex-row)
- [ ] Gap between images and details: 40px (lg:gap-10)

### Image Gallery
- [ ] Main image: larger desktop size
- [ ] Thumbnail size: 152px × 167px (lg:w-[152px] lg:h-[167px])
- [ ] Thumbnail gap: 14px (lg:gap-[14px])

### Typography
- [ ] Product title: 40px (lg:text-[40px])
- [ ] Star rating icons: 24px × 24px (lg:w-[24px] lg:h-[24px])
- [ ] Price: 32px (lg:text-[32px])
- [ ] Description: 16px with 22px line-height (lg:text-base lg:leading-[22px])

### Interactive Elements
- [ ] Color swatches: 37px × 37px (same as mobile)
- [ ] Size buttons: padding-x: 24px, padding-y: 12px (lg:px-6 lg:py-3)
- [ ] Add to Cart button: appropriate desktop width

---

## Transition Testing (Resize Browser)

### Smooth Scaling
- [ ] Resize from 390px → 768px → 1024px → 1440px
- [ ] No sudden jumps or layout breaks
- [ ] All elements scale proportionally
- [ ] Images load correctly at all sizes

### Breakpoint Boundaries
- [ ] Test at 767px (just before md)
- [ ] Test at 768px (md breakpoint)
- [ ] Test at 1023px (just before lg)
- [ ] Test at 1024px (lg breakpoint)

---

## Cross-Browser Testing (Optional)

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

---

## Final QA Checklist

- [ ] No console errors at any breakpoint
- [ ] All images load correctly
- [ ] All interactive elements clickable/tappable
- [ ] Text remains readable at all sizes
- [ ] No horizontal scrolling on mobile
- [ ] Layout matches Figma design at 390px and 1440px
- [ ] All previous fixes still working (star ratings, line-heights, etc.)

---

## Status: Ready for Manual Testing

**Code Verification:** ✅ All responsive classes correctly implemented
**Build Status:** ✅ Production build passes
**Server:** ✅ Running on port 3001

**Action Required:** Manual visual testing in browser using checklist above
