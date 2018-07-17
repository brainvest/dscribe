import {Injectable} from '@angular/core';
import {Metadata} from '../../metadata/metadata';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MetadataService {
	private metadata: Metadata;

	constructor(private http: HttpClient) {
	}

	getMetadata(): Metadata {
		if (!this.metadata) {
			this.metadata = new Metadata(this.http);
		}
		return this.metadata;
	}

	clearMetadata() {
		this.metadata = new Metadata(this.http);
	}
}
