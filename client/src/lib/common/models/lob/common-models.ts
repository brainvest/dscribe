export class LobSummaryResponse {
	EntityTypeName: string;
	Summaries: { [key: number]: LobSummaryInfo };
}

export interface LobSummaryInfo {
	AttachmentsCount: number;
	CommentsCount: number;
}

export class LobSummaryRequest {
	constructor(public EntityTypeName: string, public Identifiers: number[]) {
	}
}
