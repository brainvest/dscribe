import {EntityTypeBase} from '../../metadata/entity-type-base';
import {MetadataBasicInfoModel} from '../../metadata/metadata-basic-info-model';

export class AddNEditEntityTypeComponentData {
    constructor(public entityType: EntityTypeBase, public isNew: boolean, public basicInfo: MetadataBasicInfoModel) {}
    get action() {
        return this.isNew ? 'Add' : 'Edit';
    }
}
