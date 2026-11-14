import type {WaltzarState} from '../abstractions/waltzar-state';

export type RequestInfo = {
	url: string;
	signal?: AbortSignal;
	state: WaltzarState;
	/** Selects the tenant on the server (the `AppInstance` header); omit for app-independent endpoints. */
	appInstanceId?: number;
};

export type PostRequestInfo<TRequest> = RequestInfo & {
	body: TRequest;
};

const buildHeaders = (info: RequestInfo): Record<string, string> => {
	const authToken = info.state.authState.tokenProvider();
	return {
		"Content-Type": "application/json",
		Accept: "application/json",
		...(info.appInstanceId === undefined ? {} : {AppInstance: String(info.appInstanceId)}),
		...authToken.reduce((acc, {headerName, headerValue}) => {
			acc[headerName] = headerValue;
			return acc;
		}, {} as Record<string, string>),
	};
};

const readResponse = async <TResponse>(response: Response): Promise<TResponse> => {
	if (!response.ok) {
		throw new Error(
			`HTTP ${response.status}: ${response.statusText}`
		);
	}

	return await response.json() as TResponse;
};

export const postJson = async <TResponse, TRequest>(info: PostRequestInfo<TRequest>): Promise<TResponse> => {
	const response = await fetch(url(info.url, info.state), {
		method: "POST",
		signal: info.signal,
		headers: buildHeaders(info),
		body: JSON.stringify(info.body),
	});
	return readResponse<TResponse>(response);
}

export const getJson = async <TResponse>(info: RequestInfo): Promise<TResponse> => {
	const response = await fetch(url(info.url, info.state), {
		method: "GET",
		signal: info.signal,
		headers: buildHeaders(info),
	});
	return readResponse<TResponse>(response);
}

export function url(relativeToRoot: string, state: WaltzarState) {
	const server = state.config.serverRoot || '';
	if (server.endsWith('/')) {
		if (relativeToRoot.startsWith('/')) {
			return server + relativeToRoot.substring(1);
		} else {
			return server + relativeToRoot;
		}
	} else {
		if (relativeToRoot.startsWith('/')) {
			return server + relativeToRoot;
		} else {
			return server + '/' + relativeToRoot;
		}
	}
}
