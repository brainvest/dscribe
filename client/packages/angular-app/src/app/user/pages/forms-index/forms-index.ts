import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {EntityTypeMetadata, ManageEntityModes} from '@waltzar/core';
import {ActiveApp} from '../../../core/active-app';

/** Every form the active application's metadata defines, as a grid of cards. */
@Component({
	selector: 'app-forms-index',
	imports: [MatIconModule, RouterLink],
	templateUrl: './forms-index.html',
	styleUrl: './forms-index.scss',
})
export class FormsIndex {
	protected readonly activeApp = inject(ActiveApp);

	/** The fields the form shows, not every property: the metadata hides keys and navigation properties. */
	protected fieldCount(form: EntityTypeMetadata): number {
		return form.getPropertiesForManage(ManageEntityModes.Insert).length;
	}
}
