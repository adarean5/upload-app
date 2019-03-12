import { FileInfo } from 'src/app/models/file-info.model';
import { UploadActions, UploadActionTypes } from './upload.actions';
import { createFeatureSelector } from '@ngrx/store';

/**
 * Sate of the Upload module.
 *
 * @export
 * @interface UploadState
 *
 * @param uploading - Files currently being uploaded.
 * @param downloading - Files currently being downloaded.
 * @param deleting - Files currently being deleted.
 * @param filesInfo - List of all the files on the server.
 */
export interface UploadState {
  uploading: string[];
  downloading: string[];
  deleting: string[];
  filesInfo: FileInfo[];
}

/**
 * Initial state of the Upload module.
 *
 * @export
 */
export const initialUploadState: UploadState = {
  uploading: [],
  downloading: [],
  deleting: [],
  filesInfo: []
};

// Upload state reducer
/**
 * Reducer for the Upload module store.
 *
 * @export
 * @param {UploadState} [uploadState=initialUploadState] - Current state.
 * @param {UploadActions} uploadAction - Action to reduce.
 * @returns {UploadState}
 */
export function uploadReducers(
  uploadState: UploadState = initialUploadState,
  uploadAction: UploadActions
): UploadState {
  switch (uploadAction.type) {
    case UploadActionTypes.GET_FILES_INFO_SUCCESS:
      return {
        ...uploadState,
        filesInfo: [...uploadAction.payload]
      };

    case UploadActionTypes.UPLOAD_START:
      return {
        ...uploadState,
        uploading: [...uploadState.uploading, uploadAction.payload.name]
      };

    case UploadActionTypes.UPLOAD_SUCCESS:
      return {
        ...uploadState,
        uploading: uploadState.uploading.filter(
          (fileName: string) => fileName !== uploadAction.payload
        )
      };

    case UploadActionTypes.UPLOAD_FAILURE:
      return {
        ...uploadState,
        uploading: uploadState.uploading.filter(
          (fileName: string) => fileName !== uploadAction.payload
        )
      };

    case UploadActionTypes.DOWNLOAD_START:
      return {
        ...uploadState,
        downloading: [...uploadState.downloading, uploadAction.payload]
      };

    case UploadActionTypes.DOWNLOAD_SUCCESS:
      return {
        ...uploadState,
        downloading: uploadState.downloading.filter(
          (fileName: string) => fileName !== uploadAction.payload.fileName
        )
      };

    case UploadActionTypes.UPLOAD_FAILURE:
      return {
        ...uploadState,
        downloading: uploadState.downloading.filter(
          (fileName: string) => fileName !== uploadAction.payload
        )
      };

    case UploadActionTypes.DELETE_START:
      return {
        ...uploadState,
        deleting: [...uploadState.deleting, uploadAction.payload]
      };

    case UploadActionTypes.DELETE_SUCCESS:
      return {
        ...uploadState,
        deleting: uploadState.deleting.filter(
          (fileName: string) => fileName !== uploadAction.payload
        )
      };

    case UploadActionTypes.DELETE_FAILURE:
      return {
        ...uploadState,
        deleting: uploadState.deleting.filter(
          (fileName: string) => fileName !== uploadAction.payload
        )
      };

    default:
      return uploadState;
  }
}

export const getUploadState = createFeatureSelector<UploadState>('upload');
