import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {EntityTypeMetadata} from '../../../src/lib/metadata/entity-type-metadata';
import {DscribeService} from '../../../src/lib/dscribe.service';
import {DscribeFeatureArea} from '../../../src/lib/models/dscribe-feature-area.enum';
import {DscribeCommandCallbackInput} from '../../../src/lib/models/dscribe-command-callback-input';
import {ListComponent} from '../../../src/lib/list/list/list.component';
import {DscribeCommandDisplayPredicate} from '../../../src/lib/models/dscribe-command-display-predicate';
import {environment} from '../environments/environment';

@Component({
	selector: 'dscribe-host-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	entityType: EntityTypeMetadata;

	constructor(public authService: AuthService, private dscribeService: DscribeService) {
		this.setupDscribe();
		this.dscribeService.setServerRoot(environment.apiServerRoot);
	}

	private setupDscribe() {
		const clbck = (x: DscribeCommandCallbackInput<ListComponent>) => x.sourceComponent.refreshData();
		const dispPred = (x: DscribeCommandDisplayPredicate<ListComponent>) => x.component.displayMode === 'grid';
		this.dscribeService.setCommands([{
			name: 'refresh',
			title: 'Refresh',
			iconName: 'refresh',
			featureAreas: DscribeFeatureArea.Filter,
			callback: clbck,
			displayPredicate: dispPred
		}, {
			name: 'cart',
			title: 'add to cart',
			iconName: 'add_shopping_cart',
			featureAreas: DscribeFeatureArea.List,
			badge: {
				text: '2'
			},
			callback: clbck,
			displayPredicate: dispPred
		}, {
			name: 'textCommand',
			title: 'Test Text Command',
			featureAreas: DscribeFeatureArea.List,
			badge: {
				text: '3',
				position: 'below after',
				size: 'large',
				color: 'warn'
			},
			callback: clbck,
			displayPredicate: dispPred
		}]);
	}
}
