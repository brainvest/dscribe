import {EntityTypeMetadata} from '../metadata/entity-type-metadata';
import {ManageEntityModes} from './models/manage-entity-modes';
import {MasterReference} from '../list/models/master-reference';
import {AddNEditStructure, EditorComponentTypes, ListBehaviors} from './models/add-n-edit-structure';
import {DataTypes} from '../metadata/data-types';
import {AddNEditHelper as Helper} from './add-n-edit-helper';

export class AddNEditStructureLogic {
	public static getStructure(entity: any, entityTypeMetaData: EntityTypeMetadata
		, mode: ManageEntityModes, masters: MasterReference[], path: string, pathTitle: string): AddNEditStructure {
		const structure: AddNEditStructure = {
			path: path,
			pathTitle: pathTitle,
			currentEntity: entity,
			componentType: EditorComponentTypes.FlatPropertiesEditor
		};
		const allProperties = entityTypeMetaData.getPropertiesForManage(mode);
		const navProps = allProperties.filter(x => x.DataType === DataTypes.NavigationEntity || x.DataType === DataTypes.NavigationList);
		for (const nav of navProps) {
			const childMasters = masters ? [...masters, new MasterReference(entity, nav)] : [new MasterReference(entity, nav)];
			let navStructure: AddNEditStructure;
			if (nav.DataType === DataTypes.NavigationEntity) {
				let subEntity = entity[nav.Name];
				if (!subEntity) {
					subEntity = {};
					entity[nav.Name] = subEntity;
				}
				navStructure = AddNEditStructureLogic.getStructure(subEntity, nav.EntityType, mode, childMasters
					, Helper.joinPath(path, nav.Name), Helper.joinPath(pathTitle, nav.Title));
				navStructure.parentEntity = entity;
				navStructure.masterReferences = childMasters;
			} else {
				let list = entity[nav.Name];
				if (!list) {
					list = [];
					entity[nav.Name] = list;
				}
				navStructure = {
					componentType: EditorComponentTypes.List,
					entityTypeMetadata: nav.EntityType,
					listBehavior: ListBehaviors.SaveInObject,
					masterReferences: childMasters,
					currentEntity: list,
					parentEntity: entity,
					path: Helper.joinPath(path, nav.Name),
					pathTitle: Helper.joinPath(pathTitle, nav.Title),
					propertyMetadata: nav
				};
			}
			if (structure.children) {
				structure.children.push(navStructure);
			} else {
				structure.children = [navStructure];
			}
		}

		for (const prop of allProperties.filter(x => x.DataType !== DataTypes.NavigationList && x.DataType !== DataTypes.NavigationEntity)) {
			if (masters &&
				masters.find(m =>
					m.masterProperty
					&& m.masterProperty.InverseProperty
					&& m.masterProperty.InverseProperty.ForeignKeyProperty === prop)) {
				continue;
			}
			if (structure.directProperties) {
				structure.directProperties.push(prop);
			} else {
				structure.directProperties = [prop];
			}
		}
		return structure;
	}
}
