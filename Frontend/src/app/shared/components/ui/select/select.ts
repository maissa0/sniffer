import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <select
      [disabled]="disabled()"
      [value]="value()"
      (change)="onChange($event)"
      class="h-9 w-full rounded-md border border-[--border-default] bg-[--bg-surface-raised] px-3 text-sm text-[--text-primary] transition-colors focus:border-[--accent-primary] focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
    >
      @if (placeholder()) {
        <option value="" disabled [selected]="!value()">{{ placeholder() }}</option>
      }
      @for (opt of options(); track opt.value) {
        <option [value]="opt.value" [disabled]="opt.disabled ?? false">{{ opt.label }}</option>
      }
    </select>
  `,
})
export class SelectComponent {
  options = input<SelectOption[]>([]);
  placeholder = input('');
  disabled = input(false);
  value = model('');
  valueChange = output<string>();

  protected onChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.value.set(val);
    this.valueChange.emit(val);
  }
}
