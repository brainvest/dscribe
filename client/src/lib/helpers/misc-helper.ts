import {HttpResponse} from '@angular/common/http';

export class MiscHelper {

	static getFileNameFromHeaders(response: HttpResponse<any>) {
		const contentDisposition = response.headers.get('content-disposition');
		if (!contentDisposition) {
			return null;
		}
		const regex = new RegExp('filename="(.*)"', 'i');
		const m = regex.exec(contentDisposition);
		if (!m) {
			return null;
		}
		return m[1];
	}
}
