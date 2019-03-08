import { Action } from '@ngrx/store';

export enum UploadActionTypes {
  UPLOAD_START = '[Uploads] UploadStart',
  UPLOAD_SUCCESS = '[Uploads] UploadSuccess',
  UPLOAD_FAILURE = '[Uploads] UploadFailure',

  DOWNLOAD_START = '[Uploads] DownloadStart',
  DOWNLOAD_SUCCESS = '[Uploads] DownloadSuccess',
  DOWNLOAD_FAILURE = '[Uploads] DownloadFailure',

  DELETE_START = '[Uploads] DeleteStart',
  DELETE_SUCCESS = '[Uploads] DeleteSuccess',
  DELETE_FAILURE = '[Uploads] DeleteFailure'
}

/**
 * Upload actions
 */

export class UploadStart implements Action {
  readonly type = UploadActionTypes.UPLOAD_START;
  constructor(public payload: File) {}
}

export class UploadSuccess implements Action {
  readonly type = UploadActionTypes.UPLOAD_SUCCESS;
  constructor(public payload: string) {}
}

export class UploadFailure implements Action {
  readonly type = UploadActionTypes.UPLOAD_FAILURE;
  constructor(public payload: string) {}
}

/**
 * Download actions
 */

export class DownloadStart implements Action {
  readonly type = UploadActionTypes.DOWNLOAD_START;
  constructor(public payload: string) {}
}

export class DownloadSuccess implements Action {
  readonly type = UploadActionTypes.DOWNLOAD_SUCCESS;
  constructor(public payload: string) {}
}

export class DownloadFailure implements Action {
  readonly type = UploadActionTypes.DOWNLOAD_FAILURE;
  constructor(public payload: string) {}
}

/**
 * Delete actions
 */

export class DeleteStart implements Action {
  readonly type = UploadActionTypes.DELETE_START;
  constructor(public payload: string) {}
}

export class DeleteSuccess implements Action {
  readonly type = UploadActionTypes.DELETE_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteFailure implements Action {
  readonly type = UploadActionTypes.DELETE_FAILURE;
  constructor(public payload: string) {}
}

export type UploadActions =
  | UploadStart
  | UploadSuccess
  | UploadFailure
  | DownloadStart
  | DownloadSuccess
  | DownloadFailure
  | DeleteStart
  | DeleteSuccess
  | DeleteFailure;
