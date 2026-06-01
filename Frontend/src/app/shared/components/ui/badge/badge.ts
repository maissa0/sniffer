import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

export type BadgeVariant = 'live' | 'complete' | 'fault' | 'anomaly' | 'processing' | 'active' | 'inactive' | 'pending' | 'role' | 'default';

@Component({
  selector: 'ui-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes()">
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');

  protected classes = computed(() =>
    cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
      this.variant() === 'live' &&
        'bg-[--state-success-bg] text-[--state-success]',
      this.variant() === 'complete' &&
        'bg-[--state-neutral-bg] text-[--text-muted]',
      this.variant() === 'fault' &&
        'bg-[--state-error-bg] text-[--state-error]',
      this.variant() === 'anomaly' &&
        'bg-[--state-warning-bg] text-[--state-warning]',
      this.variant() === 'processing' &&
        'bg-[#0a1020] text-[--accent-blue]',
      this.variant() === 'active' &&
        'bg-[--state-success-bg] text-[--state-success]',
      this.variant() === 'inactive' &&
        'bg-[--state-neutral-bg] text-[--text-muted]',
      this.variant() === 'pending' &&
        'bg-[#0a1020] text-[--accent-blue]',
      this.variant() === 'role' &&
        'bg-[--bg-surface-raised] text-[--text-primary] border border-[--border-default]',
      this.variant() === 'default' &&
        'bg-[--bg-surface-raised] text-[--text-muted]',
    ),
  );
}
