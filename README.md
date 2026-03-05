# NextMove💲 Digital Agency Website

A modern, responsive digital agency website built with Next.js 16, featuring advanced animations, professional components, and complete light/dark theme support with light blue dark mode.

## Features

### Design & UX
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Dual Themes**: Light and dark modes with light blue dark theme colors
- **Advanced Animations**: 20+ custom CSS animations including fade-ins, slides, bounces, and floating effects
- **Modern Components**: Professional UI components with hover effects and interactions
- **Gradient Effects**: Eye-catching gradient text, buttons, and background elements

### Pages
1. **Home** (`/`) - Hero section with services, portfolio, team, testimonials, and contact form
2. **Services** (`/services`) - Detailed services with features and benefits
3. **Portfolio** (`/portfolio`) - Case studies showcase with project results and metrics
4. **About** (`/about`) - Company mission, values, and team statistics

### Components
- **Navbar** - Sticky navigation with theme toggle and mobile menu
- **Hero** - Eye-catching headline with animations and CTAs
- **Services Grid** - 6 service cards with hover effects
- **Portfolio Section** - Case studies showcase with filtering
- **Team Section** - Team member cards with social links
- **Stats Section** - Animated counter metrics
- **Testimonials** - Auto-rotating carousel
- **Contact Form** - Full-featured contact form with validation
- **Footer** - Complete footer with newsletter and links
- **Theme Provider** - Light/dark theme switching with localStorage persistence

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: CSS Keyframes and Tailwind animations
- **Icons**: Lucide React
- **Theme**: Custom context-based theme system
- **Hosting**: Ready for Vercel deployment

## Color Palette

### Light Theme
- **Primary**: Deep Purple (270° 70% 45%)
- **Secondary**: Teal (180° 55% 50%)
- **Accent**: Gold (45° 90% 55%)
- **Background**: White (0° 0% 100%)
- **Foreground**: Dark Gray (240° 10% 12%)

### Dark Theme (Light Blue)
- **Primary**: Light Blue (200° 80% 55%)
- **Secondary**: Light Cyan (190° 70% 60%)
- **Accent**: Bright Cyan (180° 90% 65%)
- **Background**: Deep Blue (210° 40% 10%)
- **Foreground**: Off-white (0° 0% 95%)

## Installation & Setup

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Steps

1. **Install dependencies**
```bash
pnpm install
# or
npm install
```

2. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

3. **Open in browser**
Navigate to `http://localhost:3000`

4. **Build for production**
```bash
pnpm build
pnpm start
# or
npm run build
npm run start
```

## Project Structure

```
.
├── app/
│   ├── page.tsx              # Home page
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── services/
│   │   └── page.tsx          # Services page
│   ├── portfolio/
│   │   └── page.tsx          # Portfolio page
│   ├── layout.tsx            # Root layout with theme provider
│   └── globals.css           # Global styles and animations
├── components/
│   ├── Navbar.tsx            # Navigation component
│   ├── Hero.tsx              # Hero section
│   ├── ServicesGrid.tsx      # Services grid
│   ├── PortfolioSection.tsx  # Portfolio showcase
│   ├── StatsSection.tsx      # Stats with animated counters
│   ├── TeamSection.tsx       # Team members
│   ├── TestimonialCarousel.tsx # Testimonials carousel
│   ├── ContactForm.tsx       # Contact form
│   ├── Footer.tsx            # Footer component
│   ├── ThemeProvider.tsx     # Theme context provider
│   └── ThemeToggle.tsx       # Theme toggle button
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Customization

### Changing Colors
1. Open `app/globals.css`
2. Update the CSS variables in `:root` and `.dark` sections
3. All components automatically use the new colors

### Adding New Pages
1. Create new folder in `/app` (e.g., `/app/new-page`)
2. Add `page.tsx` file
3. Import `Navbar` and `Footer` components
4. Update navigation links in `Navbar.tsx`

### Modifying Animations
All animations are defined in `app/globals.css` and `tailwind.config.ts`. Edit the `@keyframes` to customize timing and effects.

### Theme Switching
Theme toggle is automatically available in the navbar. Users can switch between light and light-blue dark mode. Preference is saved to localStorage.

## Performance Optimizations

- Server-side rendering for better SEO
- Image optimization with Next.js Image component
- CSS animations use hardware acceleration
- Intersection Observer for lazy animations
- Optimized font loading
- Responsive images and lazy loading

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: 1024px+ (lg, xl, 2xl)

All components are optimized for each breakpoint with appropriate typography sizing, spacing, and layout adjustments.

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically detects Next.js and deploys
4. Environment variables are automatically configured

### Deploy to Other Platforms
This project uses standard Next.js and requires Node.js 18+. Works with any Node.js hosting platform (AWS, Heroku, Railway, etc.).

## SEO

- Optimized metadata in `layout.tsx`
- Semantic HTML structure
- Open Graph and Twitter card integration
- Mobile-friendly and responsive design
- Fast page load times
- Proper heading hierarchy

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Sufficient color contrast

## Performance Tips

1. **Lighthouse Score**: Aim for 90+
2. **Core Web Vitals**: Monitor and optimize
3. **Caching**: Leverage browser and server caching
4. **CDN**: Use Vercel's global CDN for fast delivery
5. **Analytics**: Add Google Analytics for insights

## Troubleshooting

### Theme not switching?
- Clear browser cache and localStorage
- Ensure ThemeProvider is wrapping the app
- Check that `suppressHydrationWarning` is on `<html>`

### Animations not working?
- Verify CSS is loaded in `globals.css`
- Check browser supports CSS animations
- Ensure Tailwind build process completes

### Mobile layout issues?
- Test with actual devices or DevTools
- Check responsive breakpoints in Tailwind config
- Use mobile-first approach (mobile classes, then md:, lg:, etc.)

## License

This project is available for personal and commercial use.

## Support

For issues or questions:
1. Check existing documentation
2. Review component code and comments
3. Test in different browsers
4. Check browser console for errors

## Future Enhancements

- [ ] Blog page with CMS integration
- [ ] Client testimonials management
- [ ] Advanced portfolio filtering
- [ ] Email notification system
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] API integration for dynamic content
- [ ] E-commerce functionality

---

**Built with ❤️ by NextMove Digital Agency**

Your next move into digital starts here.
