import {PropertyBehavior} from "src/lib/metadata/property-metadata";

export class ListColumn {
	constructor(
		public name: string,
		public title: string,
		public dataType: string,
		public dataEntityTypeName: string,
		public behaviors: PropertyBehavior[]) {
	}
}
