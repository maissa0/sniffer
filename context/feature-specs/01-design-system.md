Read `AGENTS.md` before starting

We're adding the design system and UI promitive components.

## Shared UI components (Tailwind)

Build these once under `shared/components/ui/` and reuse everywhere.
Style with KPIT dark tokens (`#07090b`, `#0d1117`, `#b0ff44`).

### Core

- **Button** — primary, secondary, ghost, destructive, icon-only, loading/disabled
- **Input** — text, email, password, search (with icon slot)
- **Textarea** — same border/focus styles as Input
- **Label** — uppercase micro-label (`0.65rem`, letter-spacing)
- **Select** — native or custom dropdown, matches Input height
- **Checkbox** — filter lists, permissions grid
- **Badge** — active, inactive, pending, live, role
- **Avatar** — image or initials circle (32px / 38px / 64px sizes)
- **Separator** — horizontal rule (`rgba(176,255,68,0.1)`)

### Layout & surfaces

- **Card** — surface panel, optional header/footer, `12px` radius
- **PageHeader** — title + breadcrumb slot + primary action slot
- **ScrollArea** — sidebar nav, modals, long tables
- **Tabs** — table / charts / integrity (sniffer-style pill tabs)
- **EmptyState** — icon + message + action (e.g. “No users found”)
- **Skeleton** — bar + table row placeholders

### Overlays

- **Dialog** — centered modal (invite, delete confirm, deactivate)
- **Drawer** — right slide-over (user detail, quick edit)
- **DropdownMenu** — profile menu, row actions
- **Tooltip** — icon buttons, status badges
- **Toast** — already exists; keep as global only

### Data display

- **Table** — header, row hover, empty row, sticky header
- **DataTable** — already exists; wire pagination + sort footer
- **Pagination** — prev/next + page indicator + “Showing X of Y”
- **Stat** — KPI number + label (dashboard cards)

### Navigation

- **Breadcrumb** — already exists
- **NavItem** — sidebar link + icon + active left border
- **Topbar** — already in layout; extract search + icon cluster if needed

### Domain-specific (CAN / admin)

- **LiveBadge** — connecting / LIVE pulse dot
- **ReplayBar** — already exists as feature component; treat as canonical transport UI
- **SignalChart** — already exists; stepped Chart.js wrapper
- **FrameTable** — already exists; CAN frame rows + expand
- **PipelineStage** — live pipeline progress bars
- **SessionListItem** — sidebar session row (filename, frame count, delete)
- **FaultBadge** — integrity warning on frame rows
- **UploadDropzone** — drag-and-drop log upload

### Icons

- Use **Lucide** via `lucide-angular` (not `lucide-react`)
- Standard set: `Menu`, `Search`, `Bell`, `LayoutGrid`, `Globe`, `LogOut`, `User`, `ChevronRight`, `Play`, `Pause`, `Trash2`, `Upload`, `Activity`, `Car`, `Settings`, `Users`, `FileText`

### Class helper

- **`cn()`** — optional utility in `shared/utils/cn.ts` for merging Tailwind classes in templates/TS  
  (Angular equivalent of the `lib/utils.ts` pattern in the image)


### Check when done 
- All components import withou errors
- `cn()` works properly
- no default light styling appears