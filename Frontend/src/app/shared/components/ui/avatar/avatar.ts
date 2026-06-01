import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

export type AvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes()">
      @if (src()) {
        <img [src]="src()" [alt]="alt()" class="h-full w-full object-cover rounded-full" />
      } @else {
        <span [class]="initialsClass()">{{ initials() }}</span>
      }
    </div>
  `,
})
export class AvatarComponent {
  src = input('');
  alt = input('');
  name = input('');
  size = input<AvatarSize>('md');

  protected initials = computed(() => {
    const n = this.name();
    if (!n) return '?';
    return n
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  });

  protected classes = computed(() =>
    cn(
      'rounded-full bg-[--bg-surface-raised] border border-[--border-default] overflow-hidden flex items-center justify-center shrink-0',
      this.size() === 'sm' && 'h-8 w-8',
      this.size() === 'md' && 'h-[38px] w-[38px]',
      this.size() === 'lg' && 'h-16 w-16',
    ),
  );

  protected initialsClass = computed(() =>
    cn(
      'font-medium text-[--text-muted] select-none',
      this.size() === 'sm' && 'text-xs',
      this.size() === 'md' && 'text-sm',
      this.size() === 'lg' && 'text-lg',
    ),
  );
}
