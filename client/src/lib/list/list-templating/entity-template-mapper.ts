// Workaround for not being able to inject services inside a decorator

// @dynamic
import {Type} from '@angular/core';

export class EntityTemplateMapper {
	private static map: Map<string, {
		component: Type<any>,
		options?: any
	}> = new Map();

	static register(entityTypeName: string, data: { component: Type<any>, options?: any }) {
		EntityTemplateMapper.map = EntityTemplateMapper.map.set(entityTypeName, data);
	}

	static get(entityTypeName: string) {
		return EntityTemplateMapper.map.get(entityTypeName);
	}
}
