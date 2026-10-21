import {Directive, inject, input, TemplateRef} from '@angular/core';
import {LazyRemoteData} from '@waltzar/core';

export interface RemoteContentContext<T> {
	$implicit: T;
}

@Directive({
	selector: 'ng-template[remoteContent]',
	standalone: true,
})
export class RemoteContentDirective<T> {
	readonly remoteContent = input.required<LazyRemoteData<T>>();

	readonly template =
		inject<TemplateRef<RemoteContentContext<T>>>(TemplateRef);

	static ngTemplateContextGuard<T>(
		directive: RemoteContentDirective<T>,
		context: unknown,
	): context is RemoteContentContext<T> {
		return true;
	}
}
