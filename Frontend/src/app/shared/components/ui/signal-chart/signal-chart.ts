import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnChanges,
  OnDestroy,
  viewChild,
} from '@angular/core';

export interface ChartDataPoint {
  x: number;
  y: number;
}

export interface ChartSeries {
  label: string;
  color: string;
  data: ChartDataPoint[];
}

@Component({
  selector: 'ui-signal-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative rounded-lg border border-[--border-default] bg-[--bg-surface] overflow-hidden"
      [style.height.px]="height()"
    >
      @if (!hasData()) {
        <div class="absolute inset-0 flex items-center justify-center text-xs text-[--text-muted]">
          No signal data
        </div>
      }
      <canvas #chartCanvas class="w-full h-full"></canvas>
    </div>
  `,
})
export class SignalChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  series = input<ChartSeries[]>([]);
  height = input(200);
  replayPosition = input<number | null>(null);

  readonly chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  protected hasData(): boolean {
    return this.series().some((s) => s.data.length > 0);
  }

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  ngOnDestroy(): void {}

  private render(): void {
    const canvas = this.chartCanvas()?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
