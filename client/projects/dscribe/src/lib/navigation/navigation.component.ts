import { Component, OnInit } from '@angular/core';
import {MetadataService} from '../common/services/metadata.service';
import {EntityMetadata} from '../metadata/entity-metadata';

@Component({
  selector: 'dscribe-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	entities: EntityMetadata[];
  constructor(private metadata: MetadataService) { }

  ngOnInit() {
  	this.metadata.getMetadata()
			.getAllTypes()
			.subscribe(entities => this.entities = entities);
  }

}
