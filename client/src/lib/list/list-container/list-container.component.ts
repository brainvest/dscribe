import {Component, OnInit} from '@angular/core';
import {MetadataService} from '../../common/services/metadata.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {EntityMetadata} from '../../metadata/entity-metadata';
import {Observable, of} from 'rxjs';

@Component({
	selector: 'dscribe-list-container',
	templateUrl: './list-container.component.html',
	styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {
	entity: EntityMetadata;
	entities: EntityMetadata[];

	private entityName: string;

	constructor(private metadata: MetadataService, private route: ActivatedRoute,
							private router: Router) {
	}

	ngOnInit() {
		this.metadata.types$.subscribe(entities => {
			this.entities = entities;
		});

		this.route.params.pipe(flatMap(params => {
			this.entityName = params['entity'];
			return this.getCurrentEntity();
		})).subscribe(type => {
			if (!type) {
				this.router.navigate([this.entityName], {relativeTo: this.route});
				return;
			}
			this.entity = type;
		}, err => console.log(err));
	}

	private getCurrentEntity(): Observable<EntityMetadata> {
		const firstEntity$ = this.metadata.types$.pipe(map(allEntities => {
			this.entityName = allEntities[0].name;
			return null;
		}));
		if (!this.entityName) {
			return firstEntity$;
		}
		return this.metadata.getTypeByName(this.entityName).pipe(flatMap(entity => {
			if (entity) {
				return of(entity);
			}
			return firstEntity$;
		}));
	}

}
