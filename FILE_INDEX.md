# NextMove💲 Digital Agency - File Index

Quick reference guide to all files in the project.

## 📄 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete setup and usage guide |
| `FEATURES.md` | Detailed list of all features |
| `DEPLOYMENT.md` | Deployment instructions for all platforms |
| `PROJECT_SUMMARY.md` | Overview of what was built |
| `FILE_INDEX.md` | This file - quick reference |

## 🎨 Pages

| File | Route | Purpose |
|------|-------|---------|
| `app/page.tsx` | `/` | Home page with all main sections |
| `app/about/page.tsx` | `/about` | About company page |
| `app/services/page.tsx` | `/services` | Detailed services page |
| `app/portfolio/page.tsx` | `/portfolio` | Portfolio and case studies |
| `app/not-found.tsx` | `/404` | Custom 404 error page |

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with theme provider and metadata |
| `app/globals.css` | Global styles, animations, and design tokens |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |
| `next.config.mjs` | Next.js configuration |
| `package.json` | Dependencies and scripts |

## 🧩 Components

### Main Layout Components
| Component | File | Usage |
|-----------|------|-------|
| Navbar | `components/Navbar.tsx` | Navigation header on all pages |
| Footer | `components/Footer.tsx` | Footer on all pages |

### Home Page Sections
| Component | File | Usage |
|-----------|------|-------|
| Hero | `components/Hero.tsx` | Hero section with headline |
| ServicesGrid | `components/ServicesGrid.tsx` | 6 service cards grid |
| PortfolioSection | `components/PortfolioSection.tsx` | Portfolio showcase |
| StatsSection | `components/StatsSection.tsx` | Stats with animated counters |
| TeamSection | `components/TeamSection.tsx` | Team members display |
| TestimonialCarousel | `components/TestimonialCarousel.tsx` | Testimonials carousel |
| ContactForm | `components/ContactForm.tsx` | Contact form |

### Theme Components
| Component | File | Usage |
|-----------|------|-------|
| ThemeProvider | `components/ThemeProvider.tsx` | Context provider for theme |
| ThemeToggle | `components/ThemeToggle.tsx` | Theme switch button |

## 📁 Directory Structure

```
project-root/
├── 📄 README.md                    # Setup guide
├── 📄 FEATURES.md                  # Feature list
├── 📄 DEPLOYMENT.md                # Deploy instructions
├── 📄 PROJECT_SUMMARY.md           # Project overview
├── 📄 FILE_INDEX.md                # This file
│
├── app/                            # Next.js app directory
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   ├── globals.css                 # Global styles
│   ├── about/
│   │   └── page.tsx                # About page
│   ├── services/
│   │   └── page.tsx                # Services page
│   ├── portfolio/
│   │   └── page.tsx                # Portfolio page
│   └── not-found.tsx               # 404 page
│
├── components/                     # React components
│   ├── Navbar.tsx                  # Navigation
│   ├── Hero.tsx                    # Hero section
│   ├── ServicesGrid.tsx            # Services
│   ├── PortfolioSection.tsx        # Portfolio
│   ├── StatsSection.tsx            # Statistics
│   ├── TeamSection.tsx             # Team
│   ├── TestimonialCarousel.tsx     # Testimonials
│   ├── ContactForm.tsx             # Contact form
│   ├── Footer.tsx                  # Footer
│   ├── ThemeProvider.tsx           # Theme context
│   └── ThemeToggle.tsx             # Theme toggle
│
├── public/                         # Static assets
│   └── (images go here)
│
├── package.json                    # Dependencies
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
├── next.config.mjs                 # Next.js config
└── README.md                       # Project README
```

## 🎯 Quick Navigation Guide

### Want to...

**Change colors?**
→ Edit `app/globals.css` (CSS variables section)

**Update company info?**
→ Edit `components/Navbar.tsx` and `components/Footer.tsx`

**Add team members?**
→ Edit `components/TeamSection.tsx`

**Add services?**
→ Edit `components/ServicesGrid.tsx`

**Add portfolio projects?**
→ Edit `components/PortfolioSection.tsx`

**Change theme colors?**
→ Edit the dark theme section in `app/globals.css`

**Add animations?**
→ Add keyframes in `app/globals.css` and reference in components

**Add new page?**
1. Create `app/newpage/page.tsx`
2. Add route to `components/Navbar.tsx`
3. Update footer links

**Deploy?**
→ Follow `DEPLOYMENT.md`

**Need help?**
→ See `README.md` and `FEATURES.md`

## 📊 File Statistics

| Category | Count | Size |
|----------|-------|------|
| Pages | 5 | ~400 lines |
| Components | 12 | ~1800 lines |
| Styles | 1 | ~600 lines |
| Config | 4 | ~200 lines |
| Docs | 4 | ~1400 lines |
| **Total** | **26 files** | **~4400 lines** |

## 🔐 Important Files NOT to Delete

- `app/layout.tsx` - Root layout
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles
- `components/Navbar.tsx` - Navigation
- `components/Footer.tsx` - Footer
- `tailwind.config.ts` - Tailwind setup
- `package.json` - Dependencies

## 📝 How to Edit Files

### CSS & Styles
- Edit `app/globals.css` for global styles
- Edit individual components for component styles
- Use Tailwind classes wherever possible

### Components
- Keep components in `components/` folder
- Use TypeScript for type safety
- Import from relative paths
- Use 'use client' for client components

### Pages
- Create new folders in `app/` for routes
- Each route needs a `page.tsx` file
- Use layout.tsx for shared layout
- Import components as needed

### Configuration
- `tailwind.config.ts` - Tailwind CSS settings
- `next.config.mjs` - Next.js settings
- `tsconfig.json` - TypeScript settings
- `package.json` - Dependencies

## 🚀 Deployment Files

Files needed for deployment:
- All files in `app/` folder ✓
- All files in `components/` folder ✓
- `package.json` ✓
- `tailwind.config.ts` ✓
- `tsconfig.json` ✓
- `next.config.mjs` ✓

Optional (can add later):
- Images in `public/` folder
- `.env` files for environment variables
- Analytics tracking code

## 🔍 Finding Things

### Find by Feature

**Navigation**
- `components/Navbar.tsx`

**Hero Section**
- `components/Hero.tsx`

**Services**
- `components/ServicesGrid.tsx`
- `app/services/page.tsx`

**Portfolio**
- `components/PortfolioSection.tsx`
- `app/portfolio/page.tsx`

**Team**
- `components/TeamSection.tsx`

**Testimonials**
- `components/TestimonialCarousel.tsx`

**Contact/Form**
- `components/ContactForm.tsx`

**Footer**
- `components/Footer.tsx`

**Theme**
- `components/ThemeProvider.tsx`
- `components/ThemeToggle.tsx`
- `app/globals.css`

### Find by Page

**Home (`/`)**
- `app/page.tsx` (imports all components)

**Services (`/services`)**
- `app/services/page.tsx`

**Portfolio (`/portfolio`)**
- `app/portfolio/page.tsx`

**About (`/about`)**
- `app/about/page.tsx`

**Error (404)**
- `app/not-found.tsx`

## 📚 Learning Resources

### Next.js
- https://nextjs.org/docs
- `app/layout.tsx` - Server components
- `components/` - Client components ('use client')

### Tailwind CSS
- https://tailwindcss.com/docs
- `app/globals.css` - Custom classes
- `tailwind.config.ts` - Configuration

### React Hooks
- `components/Navbar.tsx` - useState, useEffect
- `components/ThemeProvider.tsx` - useContext
- `components/TestimonialCarousel.tsx` - useState

## 🎓 Code Examples in Files

### useEffect Example
→ `components/Navbar.tsx` (scroll detection)

### useState Example
→ `components/Navbar.tsx` (mobile menu)

### Context Example
→ `components/ThemeProvider.tsx` (theme system)

### Client Component
→ `components/ContactForm.tsx` (with 'use client')

### Server Component
→ `app/page.tsx` (root layout)

### Animation Example
→ `app/globals.css` (keyframes section)

### Responsive Design
→ `components/Hero.tsx` (responsive classes)

### Theme System
→ `app/globals.css` (CSS variables)

## 🔧 Commonly Edited Files

1. **`app/globals.css`** - Colors, animations, fonts
2. **`components/Navbar.tsx`** - Navigation, company info
3. **`components/Footer.tsx`** - Contact info, links
4. **`components/Hero.tsx`** - Main headline, CTA
5. **`components/TeamSection.tsx`** - Team members
6. **`components/ServicesGrid.tsx`** - Services
7. **`app/layout.tsx`** - Metadata, title, description

## ✅ Pre-Deployment Checklist

Check these files before deploying:

- [ ] `app/layout.tsx` - Update title and description
- [ ] `components/Navbar.tsx` - Check navigation links
- [ ] `components/Footer.tsx` - Update contact info
- [ ] `app/globals.css` - Colors look good
- [ ] `app/page.tsx` - Content is correct
- [ ] `app/about/page.tsx` - About info updated
- [ ] `app/services/page.tsx` - Services listed
- [ ] `app/portfolio/page.tsx` - Portfolio ready
- [ ] `package.json` - Dependencies updated
- [ ] `README.md` - Instructions are clear

## 🎉 You're All Set!

All files are organized, documented, and ready to use. Reference this index whenever you need to find or edit something.

Happy coding! 🚀

---

**NextMove💲 Digital Agency - Your next move into digital starts here!**
