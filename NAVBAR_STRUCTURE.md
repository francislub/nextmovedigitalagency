# NextMove Navbar Structure Guide

## Navigation Links Overview

The navbar includes 5 main navigation items with 3 having dropdown menus (like Cybasoft).

### 1. Home
- Direct link to `/`
- No dropdown

### 2. Services (with Dropdown)
**Main Link**: `/services`
**Dropdown Items**:
- Web Design → `/services#web-design`
- Brand Building → `/services#branding`
- Content Creation → `/services#content`
- Social Media → `/services#social`

### 3. Portfolio (with Dropdown)
**Main Link**: `/portfolio`
**Dropdown Items**:
- Case Studies → `/portfolio#cases`
- All Projects → `/portfolio#all`

### 4. Resources (with Dropdown)
**Main Link**: `#`
**Dropdown Items**:
- Blog → `/blog`
- Free Consultation → `#contact`
- Website Audit → `#`

### 5. About
- Direct link to `/about`
- No dropdown

### 6. Contact
- Direct link to `#contact`
- No dropdown

## Navbar Features

### Desktop Navigation
- Hover effects on links
- Dropdown menus appear on hover
- Smooth animations
- Underline animation on hover
- Theme toggle button
- "Get Started" CTA button

### Mobile Navigation
- Hamburger menu icon
- Collapsible navigation
- Expandable dropdowns with chevron icons
- Theme toggle button
- Responsive design

### Theme Support
- All links change color based on theme
- Hover states work in both themes
- Dropdown backgrounds adapt to theme
- Smooth theme transitions

## Customization

### To Add a New Link
Edit `/components/Navbar.tsx`:
```typescript
const navLinks = [
  {
    label: 'New Page',
    href: '/new-page',
    submenu: [ // optional
      { label: 'Submenu Item', href: '/new-page#item' }
    ]
  }
]
```

### To Change Dropdown Items
Edit the submenu array for any navigation item:
```typescript
{
  label: 'Services',
  href: '/services',
  submenu: [
    { label: 'New Service', href: '/services#new' }
  ]
}
```

### To Style Dropdowns
Edit the dropdown menu styles in `/components/Navbar.tsx`:
```typescript
<div className="...border border-border rounded-lg shadow-lg...">
```

## Colors in Both Themes

### Light Theme
- Text: Dark gray/black
- Hover: Primary purple
- Background: White
- Border: Light gray

### Dark Theme (Light Blue)
- Text: Light gray
- Hover: Cyan/Light blue
- Background: Dark blue
- Border: Medium blue

All colors automatically adapt based on theme tokens in `/app/globals.css`.

## Mobile Behavior

The navbar collapses into a hamburger menu on screens smaller than 768px (md breakpoint).

Dropdown menus on mobile:
- Tap to expand/collapse
- Chevron icon rotates 180°
- Sub-items slide down smoothly
- Click item to navigate and close menu

## Sticky Navbar

The navbar:
- Remains fixed at top
- Changes from transparent to semi-transparent on scroll
- Shows border and shadow when scrolled
- Works on all pages

---
**Last Updated**: Feb 16, 2026
