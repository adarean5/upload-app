import { UploadActions, UploadActionTypes } from './upload.actions';

// Upload state interface
export interface UploadState {
  uploading: string[];
  downloading: string[];
  deleting: string[];
}

// Initial upload state
export const initialUploadState: UploadState = {
  uploading: [],
  downloading: [],
  deleting: []
};

// Upload state reducer
export function uploadReducers(
  uploadState: UploadState = initialUploadState,
  uploadAction: UploadActions
): UploadState {
  switch (uploadAction.type) {
    /**
     * Upload cases
     */

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

    /**
     * Download cases
     */

    case UploadActionTypes.DOWNLOAD_START:
      return {
        ...uploadState,
        downloading: [...uploadState.downloading, uploadAction.payload]
      };

    case UploadActionTypes.DOWNLOAD_SUCCESS:
      return {
        ...uploadState,
        downloading: uploadState.downloading.filter(
          (fileName: string) => fileName !== uploadAction.payload
        )
      };

    case UploadActionTypes.UPLOAD_FAILURE:
      return {
        ...uploadState,
        downloading: uploadState.downloading.filter(
          (fileName: string) => fileName !== uploadAction.payload
        )
      };

    /**
     * Delete cases
     */

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

// Basic state selectors
export const getUploadUploading = (uploadState: UploadState) =>
  uploadState.uploading;

export const getUploadDownloading = (uploadState: UploadState) =>
  uploadState.downloading;

export const getUploadDeleting = (uploadState: UploadState) =>
  uploadState.deleting;
