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
import { tap, map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { defer, of, Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { FileInfo } from 'src/app/models/file-info.model';
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
          console.log('Upload response ', response);
          if (response instanceof HttpResponse) {
            console.log('Success uploading ', file.name);
            return new UploadSuccess(file.name);
          } else {
            console.log('Upload update ', file.name);
            return new UploadUpdate();
          }
        }),
        catchError(error => {
          console.log('Error uploading ' + file.name + ' : ', error);
          return of(new UploadFailure(file.name));
        })
      );
    })
  );

  @Effect()
  uploadSuccess$: Observable<GetFilesInfo> = this.actions$.pipe(
    ofType<UploadSuccess>(UploadActionTypes.UPLOAD_SUCCESS),
    map((action: UploadSuccess) => {
      console.log('Getting file info');
      return new GetFilesInfo();
    })
  );

  @Effect()
  getFilesInfo$: Observable<GetFilesInfoSuccess> = this.actions$.pipe(
    ofType<GetFilesInfo>(UploadActionTypes.GET_FILES_INFO),
    switchMap((event: GetFilesInfo) => {
      return this.uploadFilesService.getListFiles().pipe(
        map(response => {
          console.log('Got file info ', response);
          return new GetFilesInfoSuccess(response);
        })
      );
    })
  );
}
