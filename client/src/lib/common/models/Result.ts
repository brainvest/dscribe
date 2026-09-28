export class FieldError {
	Message: string;
}

export class Result<T> {
	Succeeded: Boolean;
	ErrorType: ErrorResultType;
	Message: string;
	Errors: { [key: string]: FieldError[] };
	Data: T;
}

export enum ErrorResultType {
	UnknownError = 1,
	BadInput,
	NotLoggedIn,
	PermissionDenied
}
