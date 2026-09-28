export class UserModel {
	Id: string;
	UserName: string;
	Email: string;
}

export class RoleModel {
	Id: string;
	Name: string;
}

export class UserRoleModel {
	UserId: string;
	RoleId: string;
}
