import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative inline-flex"
      (mouseenter)="show.set(true)"
      (mouseleave)="show.set(false)"
      (focusin)="show.set(true)"
      (focusout)="show.set(false)"
    >
      <ng-content></ng-content>
      @if (show() && text()) {
        <div
          class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[--border-default] bg-[--bg-surface-raised] px-2 py-1 text-xs text-[--text-primary] shadow-lg"
        >
          {{ text() }}
          <span class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[--bg-surface-raised]"></span>
        </div>
      }
    </div>
  `,
})
export class TooltipComponent {
  text = input('');
  protected show = signal(false);
}
