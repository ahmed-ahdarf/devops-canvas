# CLAUDE.md

Keep your replies extremely concise and focus on coveying the key information. No unnecessary fluff, no long code snippets.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal DevOps portfolio website for Ahmed AHDARF, built as a single-page React application. It features an interactive CI/CD pipeline simulator, animated sections, and a dark/light theme toggle.

## Commands

```bash
# Development
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run build:dev    # Development mode build
npm run preview      # Preview production build locally

# Code quality
npm run lint         # Run ESLint

# Testing
npm test             # Run Vitest once
npm run test:watch   # Run Vitest in watch mode
# Playwright E2E tests are configured via playwright.config.ts
```

## Architecture

**Entry points:**
- [src/main.tsx](src/main.tsx) — ReactDOM render
- [src/App.tsx](src/App.tsx) — BrowserRouter, React Query client, global providers (Toaster, Sonner, TooltipProvider)
- [src/pages/Index.tsx](src/pages/Index.tsx) — Composes all portfolio sections in order

**Section components** (rendered in order by Index.tsx):
- `HeroSection` — Profile intro + interactive CI/CD threat-squashing game
- `SkillsSection` — 8 DevOps skill categories
- `CICDPipelineAnimation` — Animated Source → Build → Test → Deploy → Live flow
- `ExperienceSection`, `EducationSection`, `CertificationsSection`
- `ContactSection` — Contact form
- `Navbar` — Sticky top nav with theme toggle and smooth-scroll links

**UI layer:** All generic UI primitives live in [src/components/ui/](src/components/ui/) — these are shadcn-ui components and should generally not be modified directly. Use the shadcn CLI to add new ones.

**Styling conventions:**
- Tailwind CSS with custom DevOps-themed color tokens: `--terminal`, `--terminal-bg`, `--pipeline`, `--pipeline-success`, `--pipeline-warning`
- Custom keyframe animations: `fade-in`, `slide-up`, `pulse-glow` (defined in [tailwind.config.ts](tailwind.config.ts))
- Dark mode via CSS variables toggled at the `:root`/`.dark` level
- Path alias `@/` maps to `src/`

**No backend:** This is a fully static site. React Query is initialized but unused — kept for future integration. The contact form is client-side only.

## Key Config Files

| File | Purpose |
|------|---------|
| [vite.config.ts](vite.config.ts) | Dev server port 8080, `@/` alias, Lovable component tagger in dev |
| [tailwind.config.ts](tailwind.config.ts) | Custom theme colors and animations |
| [components.json](components.json) | shadcn-ui CLI configuration |
| [vitest.config.ts](vitest.config.ts) | jsdom environment, test pattern `src/**/*.{test,spec}.{ts,tsx}`, setup in `src/test/setup.ts` |

## Notes

- The project uses both `package-lock.json` (npm) and `bun.lock` — prefer npm for consistency with the lock file.
- Framer Motion `useInView` is the pattern used for scroll-triggered animations throughout section components.
- The Lovable component tagger plugin is active in dev mode — this is expected and not an error.
