import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { ButtonComponent } from '../button/button';
import { LucidePlay, LucidePause, LucideSkipBack } from '@lucide/angular';

@Component({
  selector: 'ui-replay-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, LucidePlay, LucidePause, LucideSkipBack],
  template: `
    <div class="flex items-center gap-3 rounded-lg border border-[--border-default] bg-[--bg-surface] px-4 py-2">
      <ui-button variant="icon" (click)="seek.emit(0)" title="Rewind">
        <svg lucideSkipBack class="h-4 w-4"></svg>
      </ui-button>
      <ui-button variant="icon" (click)="toggle()">
        @if (playing()) {
          <svg lucidePause class="h-4 w-4"></svg>
        } @else {
          <svg lucidePlay class="h-4 w-4"></svg>
        }
      </ui-button>

      <div class="relative flex-1 h-1 rounded-full bg-[--bg-surface-raised] cursor-pointer" (click)="onProgressClick($event)">
        <div
          class="h-full rounded-full bg-[--accent-primary] transition-[width]"
          [style.width.%]="progressPercent()"
        ></div>
      </div>

      <span class="font-mono text-xs text-[--text-muted] shrink-0">{{ formatTime(position()) }} / {{ formatTime(duration()) }}</span>

      <select
        [value]="speed()"
        (change)="speed.set(+$any($event.target).value)"
        class="h-7 rounded border border-[--border-default] bg-[--bg-surface-raised] px-1 text-xs text-[--text-primary] focus:outline-none"
      >
        <option value="0.1">0.1×</option>
        <option value="0.5">0.5×</option>
        <option value="1">1×</option>
        <option value="2">2×</option>
        <option value="4">4×</option>
      </select>
    </div>
  `,
})
export class ReplayBarComponent {
  playing = model(false);
  position = input(0);
  duration = input(0);
  speed = model(1);
  seek = output<number>();
  playPause = output<boolean>();

  protected progressPercent = computed(() =>
    this.duration() > 0 ? (this.position() / this.duration()) * 100 : 0,
  );

  protected toggle(): void {
    this.playing.update((v) => !v);
    this.playPause.emit(this.playing());
  }

  protected onProgressClick(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    this.seek.emit(Math.round(ratio * this.duration()));
  }

  protected formatTime(ms: number): string {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  }
}
