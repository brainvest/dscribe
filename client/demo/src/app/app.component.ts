import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {EntityMetadata} from '../../../src/lib/metadata/entity-metadata';
import {DscribeService} from '../../../src/lib/dscribe.service';
import {DscribeCommand} from '../../../src/lib/models/dscribe-command';
import {DscribeFeatureArea} from '../../../src/lib/models/dscribe-feature-area.enum';
import {DscribeCommandCallbackInput} from '../../../src/lib/models/dscribe-command-callback-input';
import {ListComponent} from '../../../src/lib/list/list/list.component';
import {DscribeCommandDisplayPredicate} from '../../../src/lib/models/dscribe-command-display-predicate';

@Component({
	selector: 'dscribe-host-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	entity: EntityMetadata;

	constructor(public authService: AuthService, private dscribeService: DscribeService) {
		const clbck = (x: DscribeCommandCallbackInput<ListComponent>) => x.sourceComponent.refreshData();
		const dispPred = (x: DscribeCommandDisplayPredicate<ListComponent>) => x.component.displayMode === 'grid';
		this.dscribeService.setCommands([new DscribeCommand(
			'refresh', 'Refresh', DscribeFeatureArea.Filter, clbck, dispPred)]);
	}
}
