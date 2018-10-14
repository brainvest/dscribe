import {Injectable} from '@angular/core';
import {Metadata} from '../../metadata/metadata';
import {HttpClient} from '@angular/common/http';
import {DscribeService} from '../../dscribe.service';

@Injectable({
	providedIn: 'root'
})
export class MetadataService {
	private metadata: Metadata;

	constructor(private http: HttpClient, private config: DscribeService) {
	}

	getMetadata(): Metadata {
		if (!this.metadata) {
			this.metadata = new Metadata(this.http, this.config);
		}
		return this.metadata;
	}

	clearMetadata() {
		this.metadata = new Metadata(this.http, this.config);
	}
}
