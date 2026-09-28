// Workaround for not being able to inject services inside a decorator

// @dynamic
import {Type} from '@angular/core';

export class EntityTypeTemplateMapper {
	private static map: Map<string, {
		component: Type<any>,
		options?: any
	}> = new Map();

	static register(entityTypeName: string, data: { component: Type<any>, options?: any }) {
		EntityTypeTemplateMapper.map = EntityTypeTemplateMapper.map.set(entityTypeName, data);
	}

	static get(entityTypeName: string) {
		return EntityTypeTemplateMapper.map.get(entityTypeName);
	}
}
