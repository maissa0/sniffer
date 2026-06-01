import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideChevronRight } from '@lucide/angular';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideChevronRight],
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="flex items-center gap-1 text-xs text-[--text-muted]">
        @for (item of items(); track item.label; let last = $last) {
          <li class="flex items-center gap-1">
            @if (item.href && !last) {
              <a [href]="item.href" class="hover:text-[--text-primary] transition-colors">{{ item.label }}</a>
            } @else {
              <span [class.text-[--text-primary]]="last">{{ item.label }}</span>
            }
            @if (!last) {
              <svg lucideChevronRight class="h-3 w-3 shrink-0"></svg>
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent {
  items = input<BreadcrumbItem[]>([]);
}
