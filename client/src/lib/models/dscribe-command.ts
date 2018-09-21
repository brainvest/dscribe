import {Observable} from 'rxjs';
import {DscribeFeatureArea} from './dscribe-feature-area.enum';
import {DscribeCommandDisplayPredicate} from './dscribe-command-display-predicate';
import {DscribeCommandCallbackOutput} from './dscribe-command-callback-output';
import {DscribeCommandCallbackInput} from './dscribe-command-callback-input';

export class DscribeCommand {
	constructor(public name: string, public title: string,
							public featureAreas: DscribeFeatureArea | DscribeFeatureArea[],
							public callback: (data: DscribeCommandCallbackInput<any>) =>
								void | DscribeCommandCallbackOutput | Observable<DscribeCommandCallbackOutput>,
							public displayPredicate: (data: DscribeCommandDisplayPredicate) => boolean = () => true) {
	}
}
