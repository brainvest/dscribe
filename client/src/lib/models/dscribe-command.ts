import {Observable} from 'rxjs';
import {DscribeFeatureArea} from './dscribe-feature-area.enum';
import {DscribeCommandDisplayPredicate} from './dscribe-command-display-predicate';
import {DscribeCommandCallbackOutput} from './dscribe-command-callback-output';
import {DscribeCommandCallbackInput} from './dscribe-command-callback-input';

export interface BadgeInfo {
	text?: string;
	size?: string;
	color?: string;
	position?: string;
}
export interface DscribeCommand {
	name: string;
	title: string;
	tooltip?: string;
	badge?: BadgeInfo;
	iconName?: string;
	featureAreas: DscribeFeatureArea | DscribeFeatureArea[];
	callback: (data: DscribeCommandCallbackInput<any>) => void | DscribeCommandCallbackOutput | Observable<DscribeCommandCallbackOutput>;
	displayPredicate?: (data: DscribeCommandDisplayPredicate<any>) => boolean;
}

