import { createSelector } from '@ngrx/store';
import { getUploadState, UploadState } from './upload.reducers';

export const getFilesInfo = createSelector(
  getUploadState,
  (state: UploadState) => state.filesInfo
);
