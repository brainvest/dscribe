import {Component, OnInit} from '@angular/core';
import {MetadataService} from '../../common/services/metadata.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {EntityTypeMetadata} from '../../metadata/entity-type-metadata';
import {Observable, of} from 'rxjs';

@Component({
	selector: 'dscribe-list-container',
	templateUrl: './list-container.component.html',
	styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {
	entityType: EntityTypeMetadata;
	entityTypes: EntityTypeMetadata[];

	private entityTypeName: string;

	constructor(private metadata: MetadataService, private route: ActivatedRoute,
							private router: Router) {
	}

	ngOnInit() {
		this.metadata.entityTypes$.subscribe(entityTypes => {
			this.entityTypes = entityTypes;
		});

		this.route.params.pipe(flatMap(params => {
			this.entityTypeName = params['entityTypeName'];
			return this.getCurrentEntityType();
		})).subscribe(type => {
			if (!type) {
				this.router.navigate([this.entityTypeName], {relativeTo: this.route});
				return;
			}
			this.entityType = type;
		}, err => console.log(err));
	}

	private getCurrentEntityType(): Observable<EntityTypeMetadata> {
		const firstEntityType$ = this.metadata.entityTypes$.pipe(map(allEntityTypes => {
			this.entityTypeName = allEntityTypes[0].name;
			return null;
		}));
		if (!this.entityTypeName) {
			return firstEntityType$;
		}
		return this.metadata.getEntityTypeByName(this.entityTypeName).pipe(flatMap(entityType => {
			if (entityType) {
				return of(entityType);
			}
			return firstEntityType$;
		}));
	}

}
