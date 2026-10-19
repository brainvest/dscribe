import type {WaltzarState} from '../abstractions/waltzar-state';

export type RequestInfo = {
	url: string;
	signal?: AbortSignal;
	state: WaltzarState;
};

export type PostRequestInfo<TRequest> = RequestInfo & {
	body: TRequest;
};

export const postJson = async <TResponse, TRequest>(info: PostRequestInfo<TRequest>): Promise<TResponse> => {
	const loadingRequestedAt = new Date();
	const authToken = info.state.authState.tokenProvider();
	const response = await fetch(url(info.url, info.state), {
		method: "POST",
		signal: info.signal,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...authToken.reduce((acc, {headerName, headerValue}) => {
				acc[headerName] = headerValue;
				return acc;
			}, {} as Record<string, string>),
		},
		body: JSON.stringify(info.body),
	});

	if (!response.ok) {
		throw new Error(
			`HTTP ${response.status}: ${response.statusText}`
		);
	}

	return await response.json() as TResponse;
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
