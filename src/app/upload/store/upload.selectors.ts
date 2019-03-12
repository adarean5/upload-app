import { createSelector } from '@ngrx/store';
import { getUploadState, UploadState } from './upload.reducers';

/** Selector for selecting the filesInfo part of the UploadState. */
export const getFilesInfo = createSelector(
  getUploadState,
  (state: UploadState) => state.filesInfo
);
