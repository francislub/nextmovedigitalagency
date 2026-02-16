# NextMove Digital Agency - Deployment Guide

## Quick Start

### Option 1: Deploy to Vercel (Recommended)

Vercel is the fastest and easiest way to deploy Next.js applications.

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nextmove.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Vercel automatically configures Next.js
   - Your site is live in minutes!

3. **Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings > Domains
   - Add your domain
   - Follow DNS instructions
   - Domain is connected!

### Option 2: Deploy to Other Platforms

#### Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway deploy
```

#### Heroku
```bash
heroku create nextmove-agency
git push heroku main
```

#### Docker (Any Cloud Provider)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

## Pre-Deployment Checklist

### Content Updates
- [ ] Update company name and logo
- [ ] Add real team member names and bios
- [ ] Update contact email and phone
- [ ] Add company address
- [ ] Create real testimonials
- [ ] Add portfolio projects with images
- [ ] Update service descriptions
- [ ] Create about page content

### Configuration
- [ ] Update metadata in `layout.tsx`
- [ ] Set correct domain in `openGraph`
- [ ] Add analytics code (if using)
- [ ] Configure email service for forms
- [ ] Set up CDN for images (optional)
- [ ] Add security headers (if needed)

### Testing
- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test on desktop
- [ ] Test both light and dark themes
- [ ] Test all interactive elements
- [ ] Check form submission
- [ ] Test navigation between pages
- [ ] Check all links work
- [ ] Verify animations perform well

### Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Optimize images
- [ ] Minimize bundle size
- [ ] Test on slow networks
- [ ] Check browser compatibility

### SEO
- [ ] Verify meta descriptions
- [ ] Check Open Graph tags
- [ ] Add robots.txt
- [ ] Submit sitemap to search engines
- [ ] Add Google Analytics
- [ ] Test social sharing

### Security
- [ ] Update dependencies
- [ ] Check for vulnerabilities
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set security headers
- [ ] Validate form inputs
- [ ] Sanitize user inputs

## Environment Variables

Currently, this project doesn't require any environment variables. If you add features, you may need:

```env
# Optional: Email service
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-password

# Optional: Analytics
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# Optional: API endpoints
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Form Submission Setup

### Option 1: Vercel Functions (Free)

Create `app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json()

  // Validate
  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Send email (integrate with Resend, SendGrid, etc.)
  // For now, just log
  console.log({ name, email, subject, message })

  return NextResponse.json(
    { success: true, message: 'Message sent!' },
    { status: 200 }
  )
}
```

### Option 2: Third-Party Services

**Resend** (Email):
```bash
npm install resend
```

**SendGrid** (Email):
- Sign up at [sendgrid.com](https://sendgrid.com)
- Get API key
- Add to environment variables

**Formspree** (Forms):
- Visit [formspree.io](https://formspree.io)
- Create form
- Update form endpoint

**Basin** (Forms):
- Visit [basin.io](https://basin.io)
- Create form
- Update form action

## Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** (Built-in)
   - Automatic performance metrics
   - Real User Monitoring (RUM)
   - Web Analytics

2. **Google Analytics**
```html
<!-- Add to layout.tsx -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

3. **Sentry** (Error Tracking)
```bash
npm install @sentry/nextjs
```

4. **PostHog** (Product Analytics)
```bash
npm install posthog-js
```

## Maintenance

### Regular Tasks
- [ ] Monitor performance metrics
- [ ] Check error logs
- [ ] Update dependencies monthly
- [ ] Run security audits
- [ ] Backup content
- [ ] Monitor uptime
- [ ] Check analytics

### Monthly
```bash
npm audit
npm update
npm run build
npm run test (if tests added)
```

### Update Dependencies
```bash
npm outdated        # See what's outdated
npm update          # Update all
npm install -g npm  # Update npm itself
```

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules && npm install`
- Check for syntax errors in components

### Slow Performance
- Check image sizes
- Minimize CSS/JS
- Enable caching headers
- Use CDN for assets
- Optimize database queries (if added)

### Theme Not Switching
- Clear browser cache
- Check localStorage in DevTools
- Verify ThemeProvider is in layout
- Check CSS is loaded

### Mobile Layout Issues
- Test in actual device or DevTools
- Check responsive breakpoints
- Verify viewport meta tag
- Test touch interactions

### Form Not Submitting
- Check network tab in DevTools
- Verify API route exists
- Check for CORS issues
- Validate form fields

## Security Checklist

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Security headers configured
- [ ] Content Security Policy set
- [ ] CSRF protection (if forms)
- [ ] Input validation on server
- [ ] Rate limiting on APIs
- [ ] Secrets not in code
- [ ] Dependencies up to date
- [ ] No console errors
- [ ] No exposed sensitive data

## Performance Optimization

### Images
- Use Next.js Image component
- Compress images
- Use modern formats (WebP)
- Implement lazy loading
- Responsive images (srcset)

### Code
- Code splitting automatic with Next.js
- Tree shaking enabled
- Minified production builds
- CSS purging with Tailwind

### Caching
- Static generation where possible
- Incremental static regeneration
- Browser caching headers
- CDN caching

### Monitoring
```bash
npm run build
# Check output for bundle size warnings
```

## Domain Configuration

### DNS Records Needed
```
Type: A
Name: @
Value: 76.76.19.165 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Or use Vercel's nameservers for easier setup.

## Backup & Recovery

### Backup Code
```bash
git push origin main          # Pushed to GitHub
git tag -a v1.0 -m "Release"  # Tag releases
git push origin v1.0
```

### Database Backup (if added)
- Set up automated backups
- Test restore process
- Store backups securely

## Going Live Checklist

Final checklist before launch:

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Links work correctly
- [ ] Forms submit successfully
- [ ] Mobile layout is responsive
- [ ] Both themes work properly
- [ ] Animations perform smoothly
- [ ] SEO metadata is correct
- [ ] Analytics is tracking
- [ ] Domain points to site
- [ ] SSL certificate is valid
- [ ] Email confirmations work
- [ ] 404 page displays correctly
- [ ] Loading states work
- [ ] Error handling works
- [ ] Contact info is correct
- [ ] Social links work
- [ ] Newsletter signup works

## After Launch

1. **Monitor**: Keep eye on analytics and errors
2. **Collect Feedback**: Ask users for feedback
3. **Iterate**: Make improvements based on feedback
4. **Content**: Keep content fresh and updated
5. **Engage**: Post to social media
6. **Track**: Monitor rankings and traffic
7. **Convert**: Optimize for conversions
8. **Grow**: Scale successful strategies

---

**Your site is ready to deploy! Good luck with NextMove💲Digital Agency!**
