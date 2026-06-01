import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

@Component({
  selector: 'ui-nav-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [href]="href()"
      [class]="classes()"
      [attr.aria-current]="active() ? 'page' : null"
    >
      <span class="flex h-4 w-4 shrink-0 items-center justify-center">
        <ng-content select="[slot=icon]"></ng-content>
      </span>
      <span class="truncate text-sm">{{ label() }}</span>
    </a>
  `,
})
export class NavItemComponent {
  label = input.required<string>();
  href = input('#');
  active = input(false);

  protected classes() {
    return cn(
      'flex items-center gap-3 rounded-md px-3 py-2 transition-colors',
      this.active()
        ? 'border-l-2 border-[--accent-primary] pl-[10px] text-[--text-primary] bg-[--bg-surface-raised]'
        : 'text-[--text-muted] hover:bg-[--bg-surface-raised] hover:text-[--text-primary]',
    );
  }
}
