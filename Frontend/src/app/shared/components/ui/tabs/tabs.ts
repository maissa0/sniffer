import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex border-b border-[--border-default]">
      @for (tab of tabs(); track tab.id) {
        <button
          type="button"
          [disabled]="tab.disabled ?? false"
          (click)="select(tab.id)"
          [class]="tabClass(tab.id)"
        >
          {{ tab.label }}
        </button>
      }
    </div>
    <ng-content></ng-content>
  `,
})
export class TabsComponent {
  tabs = input<TabItem[]>([]);
  active = model('');
  tabChange = output<string>();

  protected tabClass = (id: string) =>
    cn(
      'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer',
      'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40',
      id === this.active()
        ? 'border-[--accent-primary] text-[--text-primary]'
        : 'border-transparent text-[--text-muted] hover:text-[--text-primary]',
    );

  protected select(id: string): void {
    this.active.set(id);
    this.tabChange.emit(id);
  }
}
