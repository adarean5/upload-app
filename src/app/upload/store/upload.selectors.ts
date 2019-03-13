import { createSelector } from '@ngrx/store';
import { getUploadState, UploadState } from './upload.reducers';

/** Selector for selecting the filesInfo part of the UploadState. */
export const getFilesInfo = createSelector(
  getUploadState,
  (state: UploadState) => state.filesInfo
);

export const getUploading = createSelector(
  getUploadState,
  (state: UploadState) => state.uploading
);

export const getDownloading = createSelector(
  getUploadState,
  (state: UploadState) => state.downloading
);

export const getDeleting = createSelector(
  getUploadState,
  (state: UploadState) => state.deleting
);
