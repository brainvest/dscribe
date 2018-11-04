import {EntityTypeTemplateMapper} from './entity-type-template-mapper';

export function DscribeListTemplate(data: {entityTypeName: string, options?: any}) {
	return function (constructor: Function) {
		EntityTypeTemplateMapper.register(data.entityTypeName, {component: constructor as any, options: data.options});
	};
}
