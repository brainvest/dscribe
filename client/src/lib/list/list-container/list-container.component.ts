import {Component, OnInit} from '@angular/core';
import {MetadataService} from '../../common/services/metadata.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {EntityTypeMetadata} from '../../metadata/entity-type-metadata';
import {Observable, of} from 'rxjs';
import { DscribeService } from '../../dscribe.service';

@Component({
	selector: 'dscribe-list-container',
	templateUrl: './list-container.component.html',
	styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {
	entityType: EntityTypeMetadata;
	entityTypes: EntityTypeMetadata[];
	navFixed = true;
	navOpened = true;
	clientRoot: string;

	private entityTypeName: string;

	constructor(private metadata: MetadataService, private route: ActivatedRoute,
							private router: Router, private config: DscribeService) {
		this.clientRoot = config.getClientRoot();
	}

	ngOnInit() {
		this.metadata.entityTypes$.subscribe(entityTypes => {
			this.entityTypes = entityTypes.sort(function (a, b) {
				const n = a.PluralTitle || a.SingularTitle || a.Name;
				const m = b.PluralTitle || b.SingularTitle || b.Name;
				if (n < m) {
					return -1;
				}
				if (n > m) {
					return 1;
				}
				return 0;
			});
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
			this.entityTypeName = allEntityTypes[0].Name;
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
