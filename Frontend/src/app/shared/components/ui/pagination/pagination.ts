import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, LucideChevronLeft, LucideChevronRight],
  template: `
    <div class="flex items-center justify-between px-1 py-2 text-xs text-[--text-muted]">
      <span>Showing {{ start() }}–{{ end() }} of {{ totalItems() }}</span>
      <div class="flex items-center gap-1">
        <ui-button
          variant="ghost"
          size="sm"
          [disabled]="currentPage() <= 1"
          (click)="prev()"
        >
          <svg lucideChevronLeft class="h-4 w-4"></svg>
        </ui-button>
        <span class="px-2 text-[--text-primary]">{{ currentPage() }} / {{ totalPages() }}</span>
        <ui-button
          variant="ghost"
          size="sm"
          [disabled]="currentPage() >= totalPages()"
          (click)="next()"
        >
          <svg lucideChevronRight class="h-4 w-4"></svg>
        </ui-button>
      </div>
    </div>
  `,
})
export class PaginationComponent {
  currentPage = input(1);
  totalItems = input(0);
  pageSize = input(20);
  pageChange = output<number>();

  protected totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));
  protected start = computed(() => Math.min((this.currentPage() - 1) * this.pageSize() + 1, this.totalItems()));
  protected end = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalItems()));

  protected prev(): void {
    if (this.currentPage() > 1) this.pageChange.emit(this.currentPage() - 1);
  }

  protected next(): void {
    if (this.currentPage() < this.totalPages()) this.pageChange.emit(this.currentPage() + 1);
  }
}
