# Moltverse → Forge AI Rebrand Plan

**Date:** 2026-02-03
**Type:** Feature (Major)
**Status:** In Progress

## Overview

Rebrand all three Moltverse sites (moltfeed, moltstream, openclawviewer) with Forge AI visual identity and add Payload CMS + blog functionality.

## Requirements

1. **Backend Infrastructure**
   - Add Payload CMS to each site
   - Connect to Neon DB (Excelsior account)
   - Create Blog collection for unique content per site

2. **Visual Rebrand**
   - Forge AI identity: yellow-orange gradient (#F5A623 → #FF6B35)
   - Dark theme (keep existing dark base)
   - Replace lobster/red theme with Forge AI colors
   - Update logo references

3. **Purpose**
   - Experimental tools driving traffic to forgeai.gg
   - Each site maintains its identity but under Forge AI umbrella

## Sites

| Site | Path | Domain | Current Theme |
|------|------|--------|---------------|
| moltfeed | ~/clawd/projects/moltfeed | moltfeed.com | Lobster red |
| moltstream | ~/projects/moltstream | moltstream.com | TBD |
| openclawviewer | ~/projects/moltview | openclawviewer.com | TBD |

## Technical Approach

### Phase 1: Moltfeed Template (This Session)

1. **Install Payload CMS**
   ```bash
   npx create-payload-app@latest --template blank
   # Or add to existing Next.js
   npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical
   ```

2. **Configure Neon DB**
   - Create database in Excelsior Neon account
   - Add connection string to .env.local

3. **Create Blog Collection**
   ```typescript
   // collections/Blog.ts
   export const Blog: CollectionConfig = {
     slug: 'blog',
     admin: { useAsTitle: 'title' },
     fields: [
       { name: 'title', type: 'text', required: true },
       { name: 'slug', type: 'text', required: true, unique: true },
       { name: 'content', type: 'richText' },
       { name: 'excerpt', type: 'textarea' },
       { name: 'publishedAt', type: 'date' },
       { name: 'featured', type: 'checkbox' },
     ],
   };
   ```

4. **Rebrand Colors**
   - Update tailwind.config.ts with Forge AI palette
   - Update globals.css with new gradient/glow effects
   - Update components to use new color tokens

5. **Add Blog Route**
   - `/blog` - Blog listing page
   - `/blog/[slug]` - Individual post page

### Phase 2: Replicate to Other Sites

After moltfeed is complete:
1. Copy Payload config and collections
2. Create separate Neon DBs for each site
3. Apply same color rebrand
4. Customize per-site content

## Color Palette (Forge AI)

```css
--forge-primary: #F5A623;      /* Yellow-orange */
--forge-secondary: #FF6B35;    /* Orange */
--forge-accent: #FFD93D;       /* Bright yellow */
--forge-bg: #0a0a0f;           /* Dark background */
--forge-card: #14141f;         /* Card background */
--forge-text: #f0f0f5;         /* Light text */
--forge-muted: #6b7280;        /* Muted text */
```

## Acceptance Criteria

- [ ] Payload CMS admin accessible at /admin
- [ ] Blog posts can be created/edited via CMS
- [ ] Blog listing page shows all published posts
- [ ] Individual blog posts render with rich text
- [ ] All UI elements use Forge AI color scheme
- [ ] Site maintains functionality (existing features work)
- [ ] Database connected to Neon

## References

- Payload CMS Docs: https://payloadcms.com/docs
- Neon DB: https://neon.tech
- Existing moltfeed: ~/clawd/projects/moltfeed

## Progress Log

- 2026-02-03 00:13 - Plan created, beginning Phase 1
- 2026-02-03 00:25 - Visual rebrand complete: tailwind.config.ts, globals.css, Header.tsx, layout.tsx updated with Forge AI colors
- 2026-02-03 00:30 - Blog infrastructure added: /blog and /blog/[slug] pages with static content
- 2026-02-03 00:35 - Neon DB created: moltfeed-cms (divine-frost-98153071)
- 2026-02-03 00:40 - Build verified successful with new blog pages

## Next Steps (Phase 2)

1. **Full Payload CMS Integration** - Requires proper setup following nextjs-payload-template structure
2. **Deploy to Vercel** - Push changes and verify production build
3. **Replicate to moltstream** - Apply same template
4. **Replicate to openclawviewer** - Apply same template

## Database Credentials (Created)

- **Neon Project:** moltfeed-cms
- **Project ID:** divine-frost-98153071
- **Connection:** In .env.local (not committed)
