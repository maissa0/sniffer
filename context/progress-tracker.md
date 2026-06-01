# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- In Progress

## Current Goal

- Feature spec 01 — Design System: all shared UI primitives built and verified compiling.

## Completed

- **Design System (feature-spec 01)** — all 35 UI components + utilities implemented under `Frontend/src/app/shared/components/ui/`
  - Installed: `tailwindcss@3`, `postcss`, `autoprefixer`, `@lucide/angular`, `clsx`, `tailwind-merge`
  - `tailwind.config.js` and `postcss.config.js` configured
  - `src/styles.css` populated with all KPIT CSS custom property tokens and Tailwind directives
  - `src/app/shared/utils/cn.ts` — clsx + tailwind-merge class merger
  - **Core**: Button (5 variants), Input (with icon slots), Textarea, Label, Select, Checkbox, Badge (9 variants), Avatar (3 sizes), Separator
  - **Layout**: Card, PageHeader, ScrollArea, Tabs, EmptyState, Skeleton
  - **Overlays**: Dialog, Drawer, DropdownMenu, Tooltip, ToastOutlet + ToastService
  - **Data Display**: Table + TableRow + TableCell, DataTable (sortable + paginated), Pagination, Stat
  - **Navigation**: Breadcrumb, NavItem, Topbar
  - **Domain**: LiveBadge, FaultBadge, PipelineStage, SessionListItem, ReplayBar, SignalChart (stub), FrameTable, UploadDropzone
  - Barrel export: `src/app/shared/components/ui/index.ts`
  - `ng build --configuration development` passes with zero errors

## In Progress

- None.

## Next Up

- Feature spec 02 (next spec file in `context/feature-specs/`)

## Open Questions

- `@lucide/angular` v1 ships ESM-only (`.mjs`); the Angular Language Service shows false-positive "Value could not be determined statically" IDE errors for components that import Lucide icons. `ng build` compiles cleanly — no runtime issue. May resolve once the Language Service updates its ESM resolution.

## Architecture Decisions

- **`@lucide/angular` over `lucide-angular`**: `lucide-angular` is deprecated. Replaced with `@lucide/angular` v1 which is zoneless and signal-based. Icons are individual standalone Angular components with attribute selectors (e.g. `<svg lucideMenu />`), imported per-component.
- **`model()` for two-way binding**: Used Angular 21 `model()` signal instead of `ControlValueAccessor` for form inputs. Full CVA wiring to be added when features start consuming the inputs in real Angular Forms.
- **CSS custom properties for all color tokens**: All colors go through CSS variables (`--bg-base`, `--accent-primary`, etc.) referenced via Tailwind arbitrary-value syntax (`bg-[--bg-base]`). No hex values in component code.
- **No component-scoped CSS files**: All styling is Tailwind utility classes in inline templates. Zero `.css` files under `shared/`.

## Session Notes

- All design system components live under `Frontend/src/app/shared/components/ui/`
- Import from the barrel: `import { ButtonComponent, BadgeComponent } from '../shared/components/ui'`
- `ToastService` is `providedIn: 'root'` — inject and call `.success()`, `.error()`, `.warning()` anywhere. Mount `<ui-toast-outlet>` once at the app shell level.
- `SignalChart` is a visual stub — Chart.js wiring to be completed in the sniffer feature spec.
- Icon names in `@lucide/angular` v1 changed vs the old package: `AlertTriangle` → `TriangleAlert`, `CheckCircle` → `CircleCheck`, `AlertCircle` → `CircleAlert`, `UploadCloud` → `CloudUpload`.
