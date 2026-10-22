import { Component, computed, input, model, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RibbonCommand, RibbonTab } from '../../core/navigation';

/**
 * Office-style ribbon: a tab strip over a band of command groups. Commands
 * that carry a `link` navigate; the rest are inert placeholders that report
 * back through the `command` output so the shell can show a hint.
 */
@Component({
  selector: 'app-ribbon',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, RouterLink, RouterLinkActive],
  templateUrl: './ribbon.html',
  styleUrl: './ribbon.scss',
})
export class Ribbon {
  readonly tabs = input.required<RibbonTab[]>();
  readonly selectionCount = input(0);
  readonly collapsed = model(false);

  readonly command = output<RibbonCommand>();

  readonly activeIndex = signal(0);
  readonly activeTab = computed(() => this.tabs()[this.activeIndex()] ?? this.tabs()[0]);

  selectTab(index: number): void {
    if (this.activeIndex() === index && this.collapsed()) {
      this.collapsed.set(false);
      return;
    }
    this.activeIndex.set(index);
  }

  isDisabled(cmd: RibbonCommand): boolean {
    return !!cmd.needsSelection && this.selectionCount() === 0;
  }
}
