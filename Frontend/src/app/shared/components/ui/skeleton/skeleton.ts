import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div [class]="classes()"></div>`,
})
export class SkeletonComponent {
  variant = input<'bar' | 'row' | 'circle'>('bar');
  class = input('');

  protected classes() {
    return cn(
      'animate-pulse bg-[--bg-surface-raised] rounded',
      this.variant() === 'bar' && 'h-4 w-full',
      this.variant() === 'row' && 'h-9 w-full',
      this.variant() === 'circle' && 'h-8 w-8 rounded-full',
      this.class(),
    );
  }
}
