import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export type RemoteOverlayState =
	| 'none'
	| 'loading'
	| 'reloading'
	| 'saving'
	| 'error';

@Component({
	selector: 'remote-overlay',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './remote-overlay.component.html',
	styleUrl: './remote-overlay.component.scss',
})
export class RemoteOverlayComponent {
	readonly state = input.required<RemoteOverlayState>();
	readonly allowRetry = input(false);

	readonly retry = output<void>();
}
