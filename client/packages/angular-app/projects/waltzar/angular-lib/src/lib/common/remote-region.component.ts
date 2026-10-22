import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	output,
} from '@angular/core';

import {NgTemplateOutlet} from '@angular/common';

import {
	RemoteContentDirective,
} from './remote-content.directive';

import {
	RemoteOverlayComponent,
	RemoteOverlayState,
} from './remote-overlay.component';
import {LazyRemoteData} from '@waltzar/core';


function hasValue<T>(
	data: LazyRemoteData<T>,
): data is Extract<LazyRemoteData<T>, {value: T}> {
	return 'value' in data && data.value !== undefined;
}

@Component({
	selector: 'remote-region',
	standalone: true,
	imports: [
		NgTemplateOutlet,
		RemoteOverlayComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './remote-region.component.html',
	styleUrl: './remote-region.component.scss',
})
export class RemoteRegionComponent {
	readonly retry = output<void>();
	readonly reload = output<void>();

	protected readonly template =
		contentChild.required(RemoteContentDirective);

	protected readonly remote = computed(
		() => this.template().remoteContent(),
	);

	protected readonly displayValue = computed(() => {
		const data = this.remote();

		if (hasValue(data)) {
			return {value: data.value};
		}

		return null;
	});

	protected readonly overlayState =
		computed<RemoteOverlayState>(() => {
			const data = this.remote();

			switch (data.state) {
				case 'not_loaded':
				case 'loading':
					return 'loading';

				case 'error':
					return 'error';

				case 'loaded':
					return 'none';

				default:
					return 'none';
			}
		});

	protected readonly busy = computed(
		() => this.overlayState() !== 'none',
	);
}
