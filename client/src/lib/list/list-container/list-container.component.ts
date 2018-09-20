import {Component, OnInit} from '@angular/core';
import {MetadataService} from '../../common/services/metadata.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import {EntityMetadata} from '../../metadata/entity-metadata';

@Component({
	selector: 'dscribe-list-container',
	templateUrl: './list-container.component.html',
	styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {
	entity: EntityMetadata;

	constructor(private metadata: MetadataService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.paramMap.pipe(flatMap(params => {
			return this.metadata.getMetadata().getTypeByName(params.get('entity'));
		})).subscribe(type => {
			// TODO: if get type by name is unsuccessful type will be null,
			// we need a solution to handle this kind of errors
			this.entity = type;
		});
	}

}
