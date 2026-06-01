import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <textarea
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [rows]="rows()"
      [value]="value()"
      (input)="value.set($any($event.target).value)"
      class="w-full rounded-md border border-[--border-default] bg-[--bg-surface-raised] px-3 py-2 text-sm text-[--text-primary] placeholder:text-[--text-muted] transition-colors focus:border-[--accent-primary] focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed resize-none"
    ></textarea>
  `,
})
export class TextareaComponent {
  placeholder = input('');
  disabled = input(false);
  rows = input(3);
  value = model('');
}
