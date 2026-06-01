import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  output,
  signal,
} from '@angular/core';
import { SeparatorComponent } from '../separator/separator';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

@Component({
  selector: 'ui-dropdown-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeparatorComponent],
  template: `
    <div class="relative inline-block">
      <div (click)="toggle()">
        <ng-content select="[slot=trigger]"></ng-content>
      </div>
      @if (isOpen()) {
        <div class="absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-[--border-default] bg-[--bg-surface-raised] py-1 shadow-xl">
          @for (item of items(); track item.id) {
            @if (item.separator) {
              <ui-separator class="my-1"></ui-separator>
            } @else {
              <button
                type="button"
                [disabled]="item.disabled ?? false"
                (click)="select(item)"
                class="flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors disabled:pointer-events-none disabled:opacity-40"
                [class.text-[--state-error]]="item.danger"
                [class.text-[--text-primary]]="!item.danger"
                [class.hover:bg-[--bg-surface]]="true"
              >
                {{ item.label }}
              </button>
            }
          }
        </div>
      }
    </div>
  `,
})
export class DropdownMenuComponent {
  items = signal<DropdownItem[]>([]);
  itemSelect = output<DropdownItem>();

  protected isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  setItems(items: DropdownItem[]): void {
    this.items.set(items);
  }

  protected select(item: DropdownItem): void {
    this.itemSelect.emit(item);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  protected onDocClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const el = event.target as HTMLElement;
    if (!el.closest('ui-dropdown-menu')) {
      this.close();
    }
  }
}
