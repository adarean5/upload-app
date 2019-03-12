import {
  UploadActionTypes,
  UploadSuccess,
  UploadStart,
  UploadFailure,
  UploadUpdate,
  GetFilesInfo,
  GetFilesInfoSuccess,
  DownloadSuccess,
  DownloadFailure,
  DownloadStart,
  DeleteSuccess,
  DeleteFailure,
  DeleteStart
} from './upload.actions';
import { UploadFilesService } from './../../services/upload-files.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable()
export class UploadEffects {
  constructor(
    private actions$: Actions,
    private uploadFilesService: UploadFilesService
  ) {}

  @Effect()
  getFilesInfo$: Observable<GetFilesInfoSuccess> = this.actions$.pipe(
    ofType<GetFilesInfo>(UploadActionTypes.GET_FILES_INFO),
    switchMap((event: GetFilesInfo) => {
      return this.uploadFilesService.getListFiles().pipe(
        map(response => {
          return new GetFilesInfoSuccess(response);
        })
      );
    })
  );

  @Effect()
  upload$: Observable<
    UploadSuccess | UploadFailure | UploadUpdate
  > = this.actions$.pipe(
    ofType<UploadStart>(UploadActionTypes.UPLOAD_START),
    map((action: UploadStart) => action.payload as File),
    mergeMap((file: File) => {
      return this.uploadFilesService.uploadFile(file).pipe(
        map(response => {
          if (response instanceof HttpResponse) {
            return new UploadSuccess(file.name);
          } else {
            return new UploadUpdate();
          }
        }),
        catchError(error => {
          return of(new UploadFailure(file.name));
        })
      );
    })
  );

  @Effect()
  uploadSuccess$: Observable<GetFilesInfo> = this.actions$.pipe(
    ofType<UploadSuccess>(UploadActionTypes.UPLOAD_SUCCESS),
    map((action: UploadSuccess) => {
      return new GetFilesInfo();
    })
  );

  @Effect()
  downloadStart$: Observable<
    DownloadSuccess | DownloadFailure
  > = this.actions$.pipe(
    ofType<DownloadStart>(UploadActionTypes.DOWNLOAD_START),
    map((action: DownloadStart) => action.payload),
    mergeMap((fileName: string) => {
      return this.uploadFilesService.downloadFile(fileName).pipe(
        map(response => {
          if (response !== undefined) {
            console.log(fileName, response);
            return new DownloadSuccess({ file: response, fileName });
          } else {
            return new DownloadFailure(fileName);
          }
        })
      );
    })
  );

  @Effect({ dispatch: false })
  downloadSuccess$: Observable<any> = this.actions$.pipe(
    ofType<DownloadSuccess>(UploadActionTypes.DOWNLOAD_SUCCESS),
    map((action: DownloadSuccess) => action.payload),
    mergeMap(result => {
      return of(saveAs(result.file, result.fileName));
    })
  );

  @Effect()
  deleteStart$: Observable<DeleteSuccess | DeleteFailure> = this.actions$.pipe(
    ofType<DeleteStart>(UploadActionTypes.DELETE_START),
    map((action: DeleteStart) => action.payload),
    mergeMap((fileName: string) => {
      return this.uploadFilesService.deleteFile(fileName).pipe(
        map(response => {
          if (response !== undefined) {
            console.log(response);
            return new DeleteSuccess(fileName);
          } else {
            return new DeleteFailure(fileName);
          }
        })
      );
    })
  );

  @Effect()
  deleteSuccess$: Observable<GetFilesInfo> = this.actions$.pipe(
    ofType<DeleteSuccess>(UploadActionTypes.DELETE_SUCCESS),
    switchMap(() => {
      return of(new GetFilesInfo());
    })
  );
}
