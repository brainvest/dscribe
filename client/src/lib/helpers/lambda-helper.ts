import {LambdaFilterNode} from '../filtering/models/filter-nodes/lambda-filter-node';
import {MasterReference} from '../list/models/master-reference';
import {EntityMetadata} from '../metadata/entity-metadata';
import {ParameterInfo} from '../filtering/models/parameter-info';
import {ComparisonFilterNode} from '../filtering/models/filter-nodes/comparison-filter-node';
import {PropertyFilterNode} from '../filtering/models/filter-nodes/property-filter-node';
import {HasId} from '../common/models/has-id';
import {ConstantFilterNode} from '../filtering/models/filter-nodes/constant-filter-node';

export class LambdaHelper {

	public static getMasterDetailFilter(master: MasterReference, entity: EntityMetadata): LambdaFilterNode | null {
		if (!master) {
			return null;
		}
		const lambda = new LambdaFilterNode(null, entity, false);
		lambda.parameter = new ParameterInfo(entity.name[0].toLowerCase(), entity.name);

		const body = lambda.children[0] as ComparisonFilterNode;
		const left = body.children[0] as PropertyFilterNode;
		left.property = entity.getPropertiesForFilter()
			.find(x => x.foreignKeyName === master.masterProperty.inverseProperty.foreignKeyName)
			.foreignKeyProperty;
		body.operator = body.operators.find(x => x && x.name === 'Equal');
		const masterId = master.master ? (master.master as HasId).id : -1;
		const right = body.children[1] as ConstantFilterNode;
		right.values = [{value: masterId}];
		return lambda;
	}

}
