import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  template: `
    <div class="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[--bg-surface-raised] text-[--text-muted]">
        <ng-content select="[slot=icon]"></ng-content>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium text-[--text-primary]">{{ message() }}</p>
        @if (description()) {
          <p class="text-xs text-[--text-muted]">{{ description() }}</p>
        }
      </div>
      @if (actionLabel()) {
        <ui-button variant="secondary" size="sm" (click)="action.emit()">
          {{ actionLabel() }}
        </ui-button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  message = input.required<string>();
  description = input('');
  actionLabel = input('');
  action = output<void>();
}
