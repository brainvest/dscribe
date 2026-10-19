export type FieldError = {
	message: string;
};

export type Result<T> = {
	succeeded: boolean;
	errorType: ErrorResultType;
	message: string;
	errors: { [key: string]: FieldError[] };
	data: T;
};

export enum ErrorResultType {
	UnknownError = 1,
	BadInput,
	NotLoggedIn,
	PermissionDenied
}
