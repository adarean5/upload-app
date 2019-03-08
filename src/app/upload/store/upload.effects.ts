import {
  UploadActionTypes,
  UploadSuccess,
  UploadStart,
  UploadFailure
} from './upload.actions';
import { UploadFilesService } from './../../services/upload-files.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { defer, of, Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { FileInfo } from 'src/app/models/file-info.model';

@Injectable()
export class UploadEffects {
  constructor(
    private actions$: Actions,
    private uploadFilesService: UploadFilesService
  ) {}

  @Effect()
  upload$: Observable<UploadSuccess | UploadFailure> = this.actions$.pipe(
    ofType<UploadStart>(UploadActionTypes.UPLOAD_START),
    map((action: UploadStart) => action.payload as File),
    switchMap((file: File) => {
      return this.uploadFilesService.uploadFile(file).pipe(
        map(response => {
          console.log('Success uploading ', file.name);
          // TODO getListFiles();
          return new UploadSuccess(file.name);
        }),
        catchError(error => {
          console.log('Error uploading ' + file.name + ' : ', error);
          return of(new UploadFailure(file.name));
        })
      );
    })
  );
}
