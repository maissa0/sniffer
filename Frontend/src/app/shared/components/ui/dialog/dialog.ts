import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { LucideX } from '@lucide/angular';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, LucideX],
  template: `
    @if (open()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        (click)="onBackdropClick($event)"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div
          class="relative z-10 w-full max-w-lg rounded-xl border border-[--border-default] bg-[--bg-surface-raised] shadow-xl"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex items-center justify-between border-b border-[--border-default] px-5 py-4">
            <h2 class="text-sm font-semibold text-[--text-primary]">{{ title() }}</h2>
            @if (closable()) {
              <ui-button variant="icon" (click)="close()">
                <svg lucideX class="h-4 w-4"></svg>
              </ui-button>
            }
          </div>
          <div class="px-5 py-4">
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
export class DialogComponent {
  title = input('');
  open = model(false);
  closable = input(true);
  hasFooter = input(false);
  closeEvent = output<void>();

  protected close(): void {
    this.open.set(false);
    this.closeEvent.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (this.closable() && event.target === event.currentTarget) {
      this.close();
    }
  }
}
