import { FileInfo } from './../../models/file-info.model';
import { Action } from '@ngrx/store';

export enum UploadActionTypes {
  GET_FILES_INFO = '[Uploads] GetFilesInfo',
  GET_FILES_INFO_SUCCESS = '[Uploads] GetFilesInfoSuccess',

  UPLOAD_START = '[Uploads] UploadStart',
  UPLOAD_SUCCESS = '[Uploads] UploadSuccess',
  UPLOAD_UPDATE = '[Uploads] UploadUpdate',
  UPLOAD_FAILURE = '[Uploads] UploadFailure',

  DOWNLOAD_START = '[Uploads] DownloadStart',
  DOWNLOAD_SUCCESS = '[Uploads] DownloadSuccess',
  DOWNLOAD_FAILURE = '[Uploads] DownloadFailure',

  DELETE_START = '[Uploads] DeleteStart',
  DELETE_SUCCESS = '[Uploads] DeleteSuccess',
  DELETE_FAILURE = '[Uploads] DeleteFailure'
}

export class GetFilesInfo implements Action {
  readonly type = UploadActionTypes.GET_FILES_INFO;
}

export class GetFilesInfoSuccess implements Action {
  readonly type = UploadActionTypes.GET_FILES_INFO_SUCCESS;
  constructor(public payload: FileInfo[]) {}
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

export class UploadUpdate implements Action {
  readonly type = UploadActionTypes.UPLOAD_UPDATE;
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
  | GetFilesInfo
  | GetFilesInfoSuccess
  | UploadStart
  | UploadSuccess
  | UploadFailure
  | UploadUpdate
  | DownloadStart
  | DownloadSuccess
  | DownloadFailure
  | DeleteStart
  | DeleteSuccess
  | DeleteFailure;
