import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface PipelineStep {
  label: string;
  count: number;
  active?: boolean;
}

@Component({
  selector: 'ui-pipeline-stage',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-0">
      @for (step of steps(); track step.label; let last = $last) {
        <div class="flex flex-col items-center gap-1 min-w-[80px]">
          <span
            class="text-2xl font-bold font-mono"
            [class.text-[--accent-primary]]="step.active"
            [class.text-[--text-primary]]="!step.active"
          >
            {{ step.count }}
          </span>
          <span class="text-[0.65rem] uppercase tracking-wider text-[--text-muted]">{{ step.label }}</span>
        </div>
        @if (!last) {
          <span class="mx-1 text-[--text-disabled] text-lg pb-4">→</span>
        }
      }
    </div>
  `,
})
export class PipelineStageComponent {
  steps = input<PipelineStep[]>([]);
}
