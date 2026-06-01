import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

@Component({
  selector: 'ui-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClass()">
      @if (header()) {
        <div class="border-b border-[--border-default] px-4 py-3">
          <h3 class="text-sm font-semibold text-[--text-primary]">{{ header() }}</h3>
        </div>
      }
      <div [class]="bodyClass()">
        <ng-content></ng-content>
      </div>
      @if (footer()) {
        <div class="border-t border-[--border-default] px-4 py-3 text-xs text-[--text-muted]">
          {{ footer() }}
        </div>
      }
    </div>
  `,
})
export class CardComponent {
  header = input('');
  footer = input('');
  noPadding = input(false);

  protected cardClass() {
    return 'bg-[--bg-surface] border border-[--border-default] rounded-lg overflow-hidden';
  }

  protected bodyClass() {
    return cn(!this.noPadding() && 'p-4');
  }
}
