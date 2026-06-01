import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BadgeComponent } from '../badge/badge';
import { ButtonComponent } from '../button/button';
import { LucideTrash2 } from '@lucide/angular';

export type SessionStatus = 'LIVE' | 'COMPLETE' | 'PROCESSING' | 'ERROR';

export interface SessionItem {
  id: string;
  name: string;
  frameCount: number;
  status: SessionStatus;
  filename?: string;
}

@Component({
  selector: 'ui-session-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, ButtonComponent, LucideTrash2, DecimalPipe],
  template: `
    <div
      class="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-colors hover:bg-[--bg-surface-raised]"
      [class.border-l-2]="active()"
      [class.pl-[10px]]="active()"
      (click)="select.emit(session())"
    >
      <div class="flex-1 min-w-0">
        <p class="truncate text-xs font-medium text-[--text-primary]">{{ session().name }}</p>
        @if (session().filename) {
          <p class="truncate text-[0.65rem] text-[--text-muted] font-mono">{{ session().filename }}</p>
        }
        <p class="text-[0.65rem] text-[--text-muted]">{{ session().frameCount | number }} frames</p>
      </div>
      <ui-badge [variant]="statusVariant()">{{ session().status }}</ui-badge>
      <ui-button variant="icon" (click)="onDelete($event)">
        <svg lucideTrash2 class="h-3.5 w-3.5"></svg>
      </ui-button>
    </div>
  `,
  host: {
    '[class.bg-[--bg-surface-raised]]': 'active()',
    '[class.border-l-2]': 'active()',
    '[class.border-[--accent-primary]]': 'active()',
  },
})
export class SessionListItemComponent {
  session = input.required<SessionItem>();
  active = input(false);
  select = output<SessionItem>();
  delete = output<SessionItem>();

  protected statusVariant() {
    switch (this.session().status) {
      case 'LIVE': return 'live' as const;
      case 'COMPLETE': return 'complete' as const;
      case 'PROCESSING': return 'processing' as const;
      default: return 'fault' as const;
    }
  }

  protected onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.session());
  }
}
