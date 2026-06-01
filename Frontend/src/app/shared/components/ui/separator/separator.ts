import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

@Component({
  selector: 'ui-separator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<hr [class]="classes()" />`,
})
export class SeparatorComponent {
  orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected classes() {
    return cn(
      'border-0 bg-[rgba(176,255,68,0.1)]',
      this.orientation() === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
    );
  }
}
