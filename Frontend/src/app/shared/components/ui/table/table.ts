import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  mono?: boolean;
  align?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'ui-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-auto rounded-lg border border-[--border-default]">
      <table class="w-full border-collapse text-sm">
        <thead class="sticky top-0 z-10 bg-[--bg-surface]">
          <tr>
            @for (col of columns(); track col.key) {
              <th
                class="border-b border-[--border-default] px-3 py-2 text-left text-xs text-[--text-muted] font-medium"
                [class.text-right]="col.align === 'right'"
                [class.text-center]="col.align === 'center'"
              >
                {{ col.label }}
              </th>
            }
          </tr>
        </thead>
        <tbody>
          <ng-content></ng-content>
        </tbody>
      </table>
    </div>
  `,
})
export class TableComponent {
  columns = input<TableColumn[]>([]);
}

@Component({
  selector: 'ui-table-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tr class="border-b border-[--border-default] transition-colors even:bg-[--bg-surface-raised] hover:bg-[--bg-surface-raised]/60 cursor-pointer last:border-0">
      <ng-content></ng-content>
    </tr>
  `,
})
export class TableRowComponent {}

@Component({
  selector: 'ui-table-cell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<td class="px-3 py-2 text-xs text-[--text-primary]" [class.font-mono]="mono()"><ng-content></ng-content></td>`,
})
export class TableCellComponent {
  mono = input(false);
}
