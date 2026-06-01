import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar';
import { LucideBell } from '@lucide/angular';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'ui-topbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, ButtonComponent, LucideBell],
  template: `
    <header class="flex h-12 items-center justify-between border-b border-[--border-default] bg-[--bg-base] px-4">
      <div class="flex items-center gap-3">
        <ng-content select="[slot=logo]"></ng-content>
        <span class="text-sm font-semibold text-[--text-primary]">{{ title() }}</span>
      </div>
      <div class="flex items-center gap-2">
        <ng-content select="[slot=search]"></ng-content>
        <ng-content select="[slot=status]"></ng-content>
        <ui-button variant="icon">
          <svg lucideBell class="h-4 w-4"></svg>
        </ui-button>
        <ui-avatar [name]="userName()" size="sm"></ui-avatar>
      </div>
    </header>
  `,
})
export class TopbarComponent {
  title = input('');
  userName = input('');
}
