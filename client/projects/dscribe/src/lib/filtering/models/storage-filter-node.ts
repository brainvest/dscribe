import {FilterNodeType} from './filter-node-type';

export class StorageFilterNode {
	constructor(public nodeType?: FilterNodeType,
							public operator?: string,
							public dataType?: string,
							public values?: any[],
							public children?: StorageFilterNode[],
							public propertyName?: string,
							public parameterName?: string,
							public subtreeName?: string) {
	}
}
