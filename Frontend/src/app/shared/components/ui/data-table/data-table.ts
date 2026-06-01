import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { TableColumn } from '../table/table';
import { PaginationComponent } from '../pagination/pagination';

export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'ui-data-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginationComponent],
  template: `
    <div class="flex flex-col gap-2">
      <div class="overflow-auto rounded-lg border border-[--border-default]">
        <table class="w-full border-collapse text-sm">
          <thead class="sticky top-0 z-10 bg-[--bg-surface]">
            <tr>
              @for (col of columns(); track col.key) {
                <th
                  (click)="sortBy(col.key)"
                  class="border-b border-[--border-default] px-3 py-2 text-left text-xs text-[--text-muted] font-medium cursor-pointer select-none hover:text-[--text-primary] transition-colors"
                >
                  <span class="inline-flex items-center gap-1">
                    {{ col.label }}
                    @if (sort().key === col.key) {
                      <span class="text-[--accent-primary]">{{ sort().direction === 'asc' ? '↑' : '↓' }}</span>
                    }
                  </span>
                </th>
              }
            </tr>
          </thead>
          <tbody>
            <ng-content></ng-content>
          </tbody>
        </table>
      </div>
      @if (totalItems() > 0) {
        <ui-pagination
          [currentPage]="currentPage()"
          [totalItems]="totalItems()"
          [pageSize]="pageSize()"
          (pageChange)="pageChange.emit($event)"
        ></ui-pagination>
      }
    </div>
  `,
})
export class DataTableComponent {
  columns = input<TableColumn[]>([]);
  currentPage = input(1);
  totalItems = input(0);
  pageSize = input(20);
  pageChange = output<number>();
  sortChange = output<SortState>();

  protected sort = signal<SortState>({ key: '', direction: 'asc' });

  protected sortBy(key: string): void {
    const current = this.sort();
    const next: SortState =
      current.key === key
        ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' };
    this.sort.set(next);
    this.sortChange.emit(next);
  }
}
