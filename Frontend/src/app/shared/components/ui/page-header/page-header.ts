import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-page-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between py-4 px-6 border-b border-[--border-default]">
      <div class="flex flex-col gap-0.5">
        <ng-content select="[slot=breadcrumb]"></ng-content>
        <h1 class="text-lg font-semibold text-[--text-primary]">{{ title() }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <ng-content select="[slot=actions]"></ng-content>
      </div>
    </div>
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
}
