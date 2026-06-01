import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FaultBadgeComponent } from '../fault-badge/fault-badge';
import { PaginationComponent } from '../pagination/pagination';

export interface CanFrame {
  id: string;
  timestamp: number;
  relativeTs: number;
  msgId: string;
  msgName: string;
  channel: string;
  rawBytes: string;
  signals: Record<string, unknown>;
  hasFault: boolean;
  faultType?: string;
  isAnomaly: boolean;
  anomalyScore?: number;
}

@Component({
  selector: 'ui-frame-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaultBadgeComponent, PaginationComponent],
  template: `
    <div class="flex flex-col gap-2">
      <div class="overflow-auto rounded-lg border border-[--border-default]">
        <table class="w-full border-collapse">
          <thead class="sticky top-0 z-10 bg-[--bg-surface]">
            <tr>
              @for (col of cols; track col) {
                <th class="border-b border-[--border-default] px-3 py-2 text-left text-xs text-[--text-muted] font-medium">{{ col }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (frame of frames(); track frame.id) {
              <tr
                class="border-b border-[--border-default] text-xs transition-colors even:bg-[--bg-surface-raised] hover:bg-[--bg-surface-raised]/60 last:border-0"
                (click)="frameClick.emit(frame)"
              >
                <td class="px-3 py-1.5 font-mono text-[--text-muted]">+{{ frame.relativeTs.toFixed(3) }}s</td>
                <td class="px-3 py-1.5 font-mono text-[--accent-primary]">{{ frame.msgId }}</td>
                <td class="px-3 py-1.5 text-[--text-primary]">{{ frame.msgName }}</td>
                <td class="px-3 py-1.5 text-[--text-muted]">{{ frame.channel }}</td>
                <td class="px-3 py-1.5 font-mono text-[--text-muted]">{{ frame.rawBytes }}</td>
                <td class="px-3 py-1.5">
                  <ui-fault-badge [fault]="frame.hasFault" [anomaly]="frame.isAnomaly"></ui-fault-badge>
                </td>
              </tr>
            }
            @if (!frames().length) {
              <tr>
                <td [attr.colspan]="cols.length" class="px-3 py-8 text-center text-xs text-[--text-muted]">No frames</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <ui-pagination
        [currentPage]="currentPage()"
        [totalItems]="totalItems()"
        [pageSize]="pageSize()"
        (pageChange)="pageChange.emit($event)"
      ></ui-pagination>
    </div>
  `,
})
export class FrameTableComponent {
  frames = input<CanFrame[]>([]);
  currentPage = input(1);
  totalItems = input(0);
  pageSize = input(50);
  pageChange = output<number>();
  frameClick = output<CanFrame>();

  protected readonly cols = ['Time', 'Msg ID', 'Name', 'Channel', 'Bytes', 'Flags'];
}
