import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <button [type]="type()" [disabled]="disabled() || loading()" [class]="classes()">
      @if (loading()) {
        <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent shrink-0"></span>
      }
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  loading = input(false);

  protected classes = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--accent-primary]',
      'disabled:pointer-events-none disabled:opacity-40',
      this.variant() === 'primary' &&
        'bg-[--accent-primary] text-black hover:bg-[--accent-primary-hv]',
      this.variant() === 'secondary' &&
        'bg-[--bg-surface-raised] text-[--text-primary] border border-[--border-default] hover:border-[--accent-primary]/40',
      this.variant() === 'ghost' &&
        'text-[--text-muted] hover:bg-[--bg-surface-raised] hover:text-[--text-primary]',
      this.variant() === 'destructive' &&
        'bg-[--state-error-bg] text-[--state-error] border border-[--state-error]/30 hover:bg-[--state-error]/10',
      this.variant() === 'icon' &&
        'h-8 w-8 p-0 text-[--text-muted] hover:bg-[--bg-surface-raised] hover:text-[--text-primary]',
      this.variant() !== 'icon' && this.size() === 'sm' && 'h-7 px-3 text-xs',
      this.variant() !== 'icon' && this.size() === 'md' && 'h-9 px-4 text-sm',
      this.variant() !== 'icon' && this.size() === 'lg' && 'h-10 px-6 text-sm',
    ),
  );
}
