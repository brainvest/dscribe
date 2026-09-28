import {DscribeFeatureArea} from './dscribe-feature-area.enum';

export interface DscribeCommandCallbackInput<T> {
	area: DscribeFeatureArea;
	sourceComponent: T;
}
