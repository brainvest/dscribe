
import { Injectable } from '@angular/core';
import { Message } from 'primeng/components/common/message';

@Injectable()
export class HttpStatusProxy {
    translateError(error: any): Message[] {
        return [{ severity: 'error', summary: 'Error Message', detail: error.message }];
    }
}
