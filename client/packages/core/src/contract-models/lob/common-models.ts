export interface LobSummaryInfo {
	AttachmentsCount: number;
	CommentsCount: number;
}

export type LobSummaryResponse = {
	entityTypeName: string;
	summaries: { [key: number]: LobSummaryInfo };
}

export class LobSummaryRequest {
	constructor(public EntityTypeName: string, public Identifiers: number[]) {
	}
}
