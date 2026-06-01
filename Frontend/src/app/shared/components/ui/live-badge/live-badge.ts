import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../../../shared/utils/cn';

export type LiveBadgeState = 'connecting' | 'live' | 'disconnected';

@Component({
  selector: 'ui-live-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes()">
      <span [class]="dotClass()"></span>
      {{ label() }}
    </span>
  `,
})
export class LiveBadgeComponent {
  state = input<LiveBadgeState>('disconnected');

  protected label = computed(() => {
    switch (this.state()) {
      case 'live': return 'LIVE';
      case 'connecting': return 'CONNECTING';
      default: return 'OFFLINE';
    }
  });

  protected classes = computed(() =>
    cn(
      'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
      this.state() === 'live' && 'bg-[--state-success-bg] text-[--state-success]',
      this.state() === 'connecting' && 'bg-[#0a1020] text-[--accent-blue]',
      this.state() === 'disconnected' && 'bg-[--state-neutral-bg] text-[--text-muted]',
    ),
  );

  protected dotClass = computed(() =>
    cn(
      'h-1.5 w-1.5 rounded-full',
      this.state() === 'live' && 'bg-[--state-success] animate-pulse',
      this.state() === 'connecting' && 'bg-[--accent-blue] animate-pulse',
      this.state() === 'disconnected' && 'bg-[--text-disabled]',
    ),
  );
}
