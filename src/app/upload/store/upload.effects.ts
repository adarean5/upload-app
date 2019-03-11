import {
  UploadActionTypes,
  UploadSuccess,
  UploadStart,
  UploadFailure,
  UploadUpdate,
  GetFilesInfo,
  GetFilesInfoSuccess
} from './upload.actions';
import { UploadFilesService } from './../../services/upload-files.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class UploadEffects {
  constructor(
    private actions$: Actions,
    private uploadFilesService: UploadFilesService
  ) {}

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
}
