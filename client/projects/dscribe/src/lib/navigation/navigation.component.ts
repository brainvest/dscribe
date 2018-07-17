import {Component, OnInit} from '@angular/core';
import {MetadataService} from '../common/services/metadata.service';
import {EntityMetadata} from '../metadata/entity-metadata';
import {Router} from '@angular/router';

@Component({
	selector: 'dscribe-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	entities: EntityMetadata[];
	mainUrls = ['main', 'entity', 'administration'];
	sideNavOpen = true;

	constructor(private metadata: MetadataService, private router: Router) {
	}

	ngOnInit() {
		this.navigate(this.mainUrls[0]);
		this.metadata.getMetadata()
			.getAllTypes()
			.subscribe(entities => {
				this.entities = entities;
				this.mainUrls[1] = 'entity/' + this.entities[0].name;
			});
	}

	navigate(url: string) {
		this.router.navigateByUrl(url);
	}

}
