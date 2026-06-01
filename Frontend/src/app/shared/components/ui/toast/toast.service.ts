import { Injectable, signal } from '@angular/core';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  show(message: string, variant: ToastVariant = 'info', duration = 4000): void {
    const id = crypto.randomUUID();
    this.toasts.update((list) => [...list, { id, message, variant, duration }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  dismiss(id: string): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
