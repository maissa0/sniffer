import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

@Component({
  selector: 'ui-scroll-area',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes()">
      <ng-content></ng-content>
    </div>
  `,
})
export class ScrollAreaComponent {
  class = input('');

  protected classes() {
    return cn('overflow-auto', this.class());
  }
}
