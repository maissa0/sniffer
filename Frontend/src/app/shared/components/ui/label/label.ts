import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [for]="for()" class="block text-[0.65rem] font-medium uppercase tracking-wider text-[--text-muted]">
      <ng-content></ng-content>
    </label>
  `,
})
export class LabelComponent {
  for = input('');
}
