import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';
import { ToastService, ToastVariant } from './toast.service';
import {
  LucideX,
  LucideCircleCheck,
  LucideCircleAlert,
  LucideTriangleAlert,
  LucideInfo,
} from '@lucide/angular';

@Component({
  selector: 'ui-toast-outlet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideX, LucideCircleCheck, LucideCircleAlert, LucideTriangleAlert, LucideInfo],
  template: `
    <div class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80">
      @for (toast of toastService.toasts(); track toast.id) {
        <div [class]="toastClass(toast.variant)">
          @switch (toast.variant) {
            @case ('success') { <svg lucideCircleCheck class="h-4 w-4 shrink-0"></svg> }
            @case ('error') { <svg lucideCircleAlert class="h-4 w-4 shrink-0"></svg> }
            @case ('warning') { <svg lucideTriangleAlert class="h-4 w-4 shrink-0"></svg> }
            @default { <svg lucideInfo class="h-4 w-4 shrink-0"></svg> }
          }
          <span class="flex-1 text-sm">{{ toast.message }}</span>
          <button
            type="button"
            (click)="toastService.dismiss(toast.id)"
            class="ml-2 shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg lucideX class="h-3 w-3"></svg>
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastOutletComponent {
  protected readonly toastService = inject(ToastService);

  protected toastClass(variant: ToastVariant): string {
    return cn(
      'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg',
      variant === 'success' &&
        'bg-[--state-success-bg] border-[--state-success]/30 text-[--state-success]',
      variant === 'error' &&
        'bg-[--state-error-bg] border-[--state-error]/30 text-[--state-error]',
      variant === 'warning' &&
        'bg-[--state-warning-bg] border-[--state-warning]/30 text-[--state-warning]',
      variant === 'info' &&
        'bg-[--bg-surface-raised] border-[--border-default] text-[--text-primary]',
    );
  }
}
