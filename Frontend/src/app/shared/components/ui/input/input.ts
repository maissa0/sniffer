import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

export type InputType = 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url';

@Component({
  selector: 'ui-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <div class="relative flex items-center w-full">
      @if (iconStart()) {
        <span class="pointer-events-none absolute left-3 flex items-center text-[--text-muted]">
          <ng-content select="[slot=icon-start]"></ng-content>
        </span>
      }
      <input
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="value()"
        (input)="value.set($any($event.target).value)"
        [class]="inputClass()"
      />
      @if (iconEnd()) {
        <span class="pointer-events-none absolute right-3 flex items-center text-[--text-muted]">
          <ng-content select="[slot=icon-end]"></ng-content>
        </span>
      }
    </div>
  `,
})
export class InputComponent {
  type = input<InputType>('text');
  placeholder = input('');
  disabled = input(false);
  value = model('');
  iconStart = input(false);
  iconEnd = input(false);

  protected inputClass = computed(() =>
    cn(
      'h-9 w-full rounded-md border border-[--border-default] bg-[--bg-surface-raised]',
      'px-3 text-sm text-[--text-primary] placeholder:text-[--text-muted]',
      'transition-colors focus:border-[--accent-primary] focus:outline-none',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      this.iconStart() && 'pl-9',
      this.iconEnd() && 'pr-9',
    ),
  );
}
