import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { LucideX } from '@lucide/angular';

@Component({
  selector: 'ui-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, LucideX],
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex">
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          (click)="close()"
        ></div>
        <div class="relative ml-auto flex h-full w-full max-w-md flex-col border-l border-[--border-default] bg-[--bg-surface-raised] shadow-xl">
          <div class="flex items-center justify-between border-b border-[--border-default] px-5 py-4">
            <h2 class="text-sm font-semibold text-[--text-primary]">{{ title() }}</h2>
            <ui-button variant="icon" (click)="close()">
              <svg lucideX class="h-4 w-4"></svg>
            </ui-button>
          </div>
          <div class="flex-1 overflow-auto px-5 py-4">
            <ng-content></ng-content>
          </div>
          @if (hasFooter()) {
            <div class="flex items-center justify-end gap-2 border-t border-[--border-default] px-5 py-4">
              <ng-content select="[slot=footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class DrawerComponent {
  title = input('');
  open = model(false);
  hasFooter = input(false);
  closeEvent = output<void>();

  protected close(): void {
    this.open.set(false);
    this.closeEvent.emit();
  }
}
