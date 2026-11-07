export type LazyRemote_NotLoaded = {
	state: 'not_loaded';
};

export const lazyRemoteNotLoaded: LazyRemote_NotLoaded = {
	state: 'not_loaded'
};

export type LazyRemote_Loading<T> = {
	state: 'loading';
	loadingRequestedAt: Date;
	value?: T;
};

export type LazyRemote_Loaded<T> = {
	state: 'loaded';
	value: T;
	loadingRequestedAt: Date;
	loadedAt: Date;
};

export type LazyRemote_Errored = {
	state: 'error';
	error: unknown;
	loadingRequestedAt: Date;
	errorOccurredAt: Date;
	retryCount: number;
};

export type LazyRemote_Reloading<T> = {
  state: 'reloading';
  value: T;
  loadingRequestedAt: Date;
  loadedAt: Date;
  reloadingRequestedAt: Date;
  reloadedAt: Date;
};

export type LazyRemote_Saving<T> = {
  state: 'saving';
  value: T;
  savingRequestedAt: Date;
  savedAt: Date;
};

export type LazyRemote_EditedLocally<T> = {
  state: 'editedLocally';
  value: T;
  originalValue?: T;
  loadingRequestedAt?: Date;
  loadedAt?: Date;
  editedLocallyAt: Date;
};

export type LazyRemoteData<T> = LazyRemote_NotLoaded | LazyRemote_Loading<T> | LazyRemote_Loaded<T> | LazyRemote_Errored; // | LazyRemote_Reloading<T> | LazyRemote_Saving<T> | LazyRemote_EditedLocally<T>;
