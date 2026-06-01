import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideTriangleAlert } from '@lucide/angular';

export type FaultType = 'timing_gap' | 'counter_error' | 'range_violation' | 'anomaly';

@Component({
  selector: 'ui-fault-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideTriangleAlert],
  template: `
    @if (fault()) {
      <span
        class="inline-flex items-center gap-1 rounded-full bg-[--state-error-bg] px-2 py-0.5 text-xs font-medium text-[--state-error]"
        [title]="faultLabel()"
      >
        <svg lucideTriangleAlert class="h-3 w-3"></svg>
        ⚠
      </span>
    }
    @if (anomaly()) {
      <span
        class="inline-flex items-center gap-1 rounded-full bg-[--state-warning-bg] px-2 py-0.5 text-xs font-medium text-[--state-warning]"
        title="Anomaly"
      >
        🔴
      </span>
    }
  `,
})
export class FaultBadgeComponent {
  fault = input(false);
  anomaly = input(false);
  faultType = input<FaultType | ''>('');

  protected faultLabel = computed(() => {
    switch (this.faultType()) {
      case 'timing_gap': return 'Timing gap';
      case 'counter_error': return 'Counter error';
      case 'range_violation': return 'Range violation';
      default: return 'Integrity fault';
    }
  });
}
