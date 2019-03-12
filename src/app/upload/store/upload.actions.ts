import { FileInfo } from './../../models/file-info.model';
import { Action } from '@ngrx/store';

/**
 * Contains all the possible action types.
 *
 * @export
 * @enum {number}
 */
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

/**
 * Used for getting the information about the files located on the server.
 *
 * @export
 * @class GetFilesInfo
 * @implements {Action}
 */
export class GetFilesInfo implements Action {
  readonly type = UploadActionTypes.GET_FILES_INFO;
}

/**
 * Dispatched when file info was retrieved successfully from the server.
 *
 * @export
 * @class GetFilesInfoSuccess
 * @implements {Action}
 */
export class GetFilesInfoSuccess implements Action {
  readonly type = UploadActionTypes.GET_FILES_INFO_SUCCESS;
  /**
   *Creates an instance of GetFilesInfoSuccess.
   * @param {FileInfo[]} payload - File information to be updated in the state.
   * @memberof GetFilesInfoSuccess
   */
  constructor(public payload: FileInfo[]) {}
}

/**
 * Start the upload of a file.
 *
 * @export
 * @class UploadStart
 * @implements {Action}
 */
export class UploadStart implements Action {
  readonly type = UploadActionTypes.UPLOAD_START;
  /**
   *Creates an instance of UploadStart.
   * @param {File} payload - File to be uploaded.
   * @memberof UploadStart
   */
  constructor(public payload: File) {}
}

/**
 * Dispatched if a file is successfully uploaded to the server.
 *
 * @export
 * @class UploadSuccess
 * @implements {Action}
 */
export class UploadSuccess implements Action {
  readonly type = UploadActionTypes.UPLOAD_SUCCESS;
  /**
   *Creates an instance of UploadSuccess.
   * @param {string} payload - Name of the file that was successfully uploaded.
   * @memberof UploadSuccess
   */
  constructor(public payload: string) {}
}

/**
 * Dispatched if an error occurs during file upload.
 *
 * @export
 * @class UploadFailure
 * @implements {Action}
 */
export class UploadFailure implements Action {
  readonly type = UploadActionTypes.UPLOAD_FAILURE;
  /**
   *Creates an instance of UploadFailure.
   * @param {string} payload - Name of the wile that was not uploaded successfully.
   * @memberof UploadFailure
   */
  constructor(public payload: string) {}
}

/**
 * Dispatched if an update occurs during the upload process.
 * Useful for implementing loading bars.
 *
 * @export
 * @class UploadUpdate
 * @implements {Action}
 */
export class UploadUpdate implements Action {
  readonly type = UploadActionTypes.UPLOAD_UPDATE;
}

/**
 * Start file download.
 *
 * @export
 * @class DownloadStart
 * @implements {Action}
 */
export class DownloadStart implements Action {
  readonly type = UploadActionTypes.DOWNLOAD_START;
  /**
   *Creates an instance of DownloadStart.
   * @param {string} payload - Name of the file to be downloaded
   * @memberof DownloadStart
   */
  constructor(public payload: string) {}
}

/**
 * Dispatched if a file is successfully downloaded.
 *
 * @export
 * @class DownloadSuccess
 * @implements {Action}
 */
export class DownloadSuccess implements Action {
  readonly type = UploadActionTypes.DOWNLOAD_SUCCESS;
  /**
   *Creates an instance of DownloadSuccess.
   * @param {{ file: Blob; fileName: string }} payload - Object containing the file and its name.
   * @memberof DownloadSuccess
   */
  constructor(public payload: { file: Blob; fileName: string }) {}
}

/**
 * Dispatched if an error occurs during file download.
 *
 * @export
 * @class DownloadFailure
 * @implements {Action}
 */
export class DownloadFailure implements Action {
  readonly type = UploadActionTypes.DOWNLOAD_FAILURE;
  /**
   *Creates an instance of DownloadFailure.
   * @param {string} payload - Name of the file that was not successfully downloaded.
   * @memberof DownloadFailure
   */
  constructor(public payload: string) {}
}

/**
 * Start file deletion.
 *
 * @export
 * @class DeleteStart
 * @implements {Action}
 */
export class DeleteStart implements Action {
  readonly type = UploadActionTypes.DELETE_START;
  /**
   *Creates an instance of DeleteStart.
   * @param {string} payload - File to be deleted.
   * @memberof DeleteStart
   */
  constructor(public payload: string) {}
}

/**
 * Dispatched if a file is successfully deleted.
 *
 * @export
 * @class DeleteSuccess
 * @implements {Action}
 */
export class DeleteSuccess implements Action {
  readonly type = UploadActionTypes.DELETE_SUCCESS;
  /**
   *Creates an instance of DeleteSuccess.
   * @param {string} payload - Name of the file that was successfully deleted.
   * @memberof DeleteSuccess
   */
  constructor(public payload: string) {}
}

/**
 * Dispatched if an error occurs during file deletion.
 *
 * @export
 * @class DeleteFailure
 * @implements {Action}
 */
export class DeleteFailure implements Action {
  readonly type = UploadActionTypes.DELETE_FAILURE;
  /**
   *Creates an instance of DeleteFailure.
   * @param {string} payload - Name of the file that was deleted unsuccessfully.
   * @memberof DeleteFailure
   */
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
