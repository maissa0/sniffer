import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="checked.set($any($event.target).checked)"
        class="h-4 w-4 rounded border border-[--border-default] bg-[--bg-surface-raised] accent-[--accent-primary] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      />
      @if (label()) {
        <span class="text-sm text-[--text-primary]">{{ label() }}</span>
      }
    </label>
  `,
})
export class CheckboxComponent {
  label = input('');
  disabled = input(false);
  checked = model(false);
}
