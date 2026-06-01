import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-stat',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1 rounded-lg border border-[--border-default] bg-[--bg-surface] p-4">
      <span class="text-[0.65rem] font-medium uppercase tracking-wider text-[--text-muted]">{{ label() }}</span>
      <span class="text-2xl font-bold font-mono text-[--text-primary]">{{ value() }}</span>
      @if (sub()) {
        <span class="text-xs text-[--text-muted]">{{ sub() }}</span>
      }
    </div>
  `,
})
export class StatComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  sub = input('');
}
