export class ContractConstants {
	static get api() {return 'api';}
	static get appManagement() { return `${this.api}/appManagement`; }
	static get getAppInstancesInfoForHome() { return `${this.appManagement}/getAppInstancesInfoForHome`; }
	static get metadata() { return `${this.api}/metadata`; }
	static get getCompleteMetadata() { return `${this.metadata}/getComplete`; }
}
