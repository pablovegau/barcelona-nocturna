# Copilot Instructions for AI Coding Agents

## Project Overview
This is an Astro-based web project with a modular structure for content, components, and domain logic. The codebase is organized to support a rich, content-driven site with custom UI elements and data models for characters, clans, factions, and posts.

## Key Directories & Files
- `src/components/`: Reusable UI components (e.g., `Polaroid`, `ClanSymbol`, `ThemeToggle`).
- `src/containers/`: Higher-level UI containers for grouping components (e.g., `PolaroidGroup`, `Filters`).
- `src/domain/`: TypeScript files modeling core entities (`characters.ts`, `clans.ts`, etc.).
- `src/content/`: Markdown/MDX content for site entities (characters, clans, posts, etc.).
- `src/layouts/`: Astro layout files for page structure.
- `src/lib/`: Utility functions for URL params, scroll locking, etc.
- `public/`: Static assets (images, fonts, SVGs).

## Developer Workflows
- **Start Dev Server:** `npm run dev` (serves site locally)
- **Build for Production:** `npm run build` (outputs to `dist/`)
- **Astro CLI:** Use `npm run astro ...` for tasks like `astro add`, `astro check`
- **Linting:** Project uses Biome (`biome.json`) for linting/formatting

## Patterns & Conventions
- **TypeScript-first:** All logic and data models are in `.ts` files; UI in `.astro` or `.ts`.
- **Content-driven:** Entities (characters, clans, etc.) are defined in both TypeScript (`domain/`) and Markdown (`content/`).
- **Componentization:** UI is split into atomic components and containers for maintainability.
- **Assets:** Images and SVGs are organized by type (e.g., `character_images/`, `clans_symbols/`).
- **URL Params:** Utilities in `lib/` handle search/filter state via URL parameters.

## Integration Points
- **Astro Framework:** All pages and layouts use Astro conventions.
- **External Links:** Some README links reference Astro docs and Discord for help.
- **No custom backend:** All data is static or client-side; no server code detected.

## Examples
- To add a new character: create a Markdown file in `src/content/characters/` and update `src/domain/characters.ts`.
- To add a new UI feature: create a component in `src/components/` and import it in the relevant page/layout.

## Tips for AI Agents
- Prefer updating both content and domain files for new entities.
- Follow existing folder conventions for assets and components.
- Use Biome for formatting before committing changes.
- Reference Astro docs for framework-specific questions.

---
For questions about project structure, see the README or [Astro docs](https://docs.astro.build/en/basics/project-structure/).
