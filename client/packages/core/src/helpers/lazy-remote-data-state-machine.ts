import {BehaviorSubject, Observable} from "rxjs";
import {LazyRemote_Errored, LazyRemote_Loading, LazyRemoteData} from "../abstractions/lazy-remote-data";

export type NextStateParams<T> = {
	state$?: BehaviorSubject<LazyRemoteData<T>>;
	fetcher: () => Promise<T>;
};

export const nextState = <T>({state$: currentState, fetcher}: NextStateParams<T>): Observable<LazyRemoteData<T>> => {
	const {result, lastValue, firstValue} = getResult<T>({state$: currentState});
	fetcher().then(value => {
		result.next({
			state: 'loaded',
			value,
			loadingRequestedAt: firstValue.loadingRequestedAt,
			loadedAt: new Date(),
		});
	}).catch(error => {
		result.next({
			state: 'error',
			error: error as Error,
			loadingRequestedAt: firstValue.loadingRequestedAt,
			errorOccurredAt: new Date(),
			retryCount: (lastValue?.state === 'error' ? lastValue.retryCount : 0) + 1,
		});
	});
	return result.asObservable();
};

const getResult = <T>({state$: currentState}: Pick<NextStateParams<T>, 'state$'>): {result: BehaviorSubject<LazyRemoteData<T>>; lastValue: LazyRemoteData<T> | undefined; firstValue: LazyRemote_Errored | LazyRemote_Loading<T>;} => {
	const lastValue = currentState instanceof Observable ? (currentState as BehaviorSubject<LazyRemoteData<T>>).value : currentState;
	const firstValue = getInitialResponse<T>(lastValue);
	let result = getOrCreateObservable<T>(currentState, firstValue);
	return {result, lastValue, firstValue};
};

const getOrCreateObservable = <T>(currentState: LazyRemoteData<T> | Observable<LazyRemoteData<T>> | undefined, firstValue: LazyRemoteData<T>): BehaviorSubject<LazyRemoteData<T>> => {
	if (currentState instanceof Observable) {
		const result = currentState as BehaviorSubject<LazyRemoteData<T>>;
		result.next(firstValue);
		return result;
	} else {
		return new BehaviorSubject<LazyRemoteData<T>>(firstValue);
	}
};

const getInitialResponse = <T>(currentValue: LazyRemoteData<T> | undefined): LazyRemote_Errored | LazyRemote_Loading<T> => {
	if (currentValue?.state === 'error') {
		return {
			state: 'error',
			loadingRequestedAt: new Date(),
			errorOccurredAt: currentValue.errorOccurredAt,
			retryCount: currentValue?.state === 'error' ? currentValue.retryCount : 0,
			error: currentValue.error,
		};
	}
	return {
		state: 'loading',
		loadingRequestedAt: new Date(),
		value: currentValue?.state === 'loaded' ? currentValue.value : undefined
	};
};
