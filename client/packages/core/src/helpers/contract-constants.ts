export class ContractConstants {
  static get api() {return 'api';}
  static get appManagement() { return `${this.api}/appManagement`; }
  static get getAppInstancesInfoForHome() { return `${this.appManagement}/getAppInstancesInfoForHome`; }
}
