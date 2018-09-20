import {EntityTemplateMapper} from './entity-template-mapper';

export function DscribeListTemplate(data: {entityTypeName: string, options?: any}) {
	return function (constructor: Function) {
		EntityTemplateMapper.register(data.entityTypeName, {component: constructor as any, options: data.options});
	};
}
