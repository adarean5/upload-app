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

/**
 * Contains the side effects of the file upload store.
 *
 * @export
 * @class UploadEffects
 */
@Injectable()
export class UploadEffects {
  /**
   *Creates an instance of UploadEffects.
   * @param {Actions} actions$ - An observable of NgRx actions
   * @param {UploadFilesService} uploadFilesService - Service used for sending
   *  upload, download, get requests to the API.
   * @memberof UploadEffects
   */
  constructor(
    private actions$: Actions,
    private uploadFilesService: UploadFilesService
  ) {}

  /**
   * Side effect triggered when a GetFilesInfo action is dispatched.
   * Uses the uploadFilesService to get the list of all files from the API.
   * Dispatches a new GetFilesInfoSuccess action if the list of files was
   *  successfully retrieved.
   *
   * Uses the switchMap flattening strategy for updating the outer observable,
   *  which means that the old observable is replaced with the new one.
   *
   * @type {Observable<GetFilesInfoSuccess>}
   * @memberof UploadEffects
   */
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

  /**
   * Side effect triggered when an UploadStart action is dispatched.
   * Uses the uploadFilesService to upload a file to the server.
   * Dispatches a new UploadSuccess action, if the file was
   *  successfully uploaded, else dispatches a new UploadFailure action.
   *
   * Uses the mergeMap flattening strategy for updating the outer observable,
   *  which means that the old observable is merged with the new one.
   *
   * @type {(Observable<UploadSuccess | UploadFailure | UploadUpdate>)}
   * @memberof UploadEffects
   */
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

  /**
   * Side effect triggered when an UploadSuccess action is dispatched.
   * Dispatches a new GetFilesInfo action, to refresh the list of files
   *  in the table after a successful upload.
   *
   * @type {Observable<GetFilesInfo>}
   * @memberof UploadEffects
   */
  @Effect()
  uploadSuccess$: Observable<GetFilesInfo> = this.actions$.pipe(
    ofType<UploadSuccess>(UploadActionTypes.UPLOAD_SUCCESS),
    map((action: UploadSuccess) => {
      return new GetFilesInfo();
    })
  );

  /**
   * Side effect triggered when a DownloadStart action is dispatched.
   * Uses the uploadFilesService to download a file from the server.
   * Dispatches a new DownloadSuccess action, if the file was
   *  successfully downloaded, else dispatches a new DownloadFailure action.
   *
   * Uses the mergeMap flattening strategy for updating the outer observable,
   *  which means that the old observable is merged with the new one.
   *
   * @type {(Observable<DownloadSuccess | DownloadFailure>)}
   * @memberof UploadEffects
   */
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

  /**
   * Side effect triggered when a DownloadSuccess action is dispatched.
   * Does not dispatch a new action, instead saves the received file.
   *
   * Uses the mergeMap flattening strategy for updating the outer observable,
   *  which means that the old observable is merged with the new one.
   * @type {Observable<any>}
   * @memberof UploadEffects
   */
  @Effect({ dispatch: false })
  downloadSuccess$: Observable<any> = this.actions$.pipe(
    ofType<DownloadSuccess>(UploadActionTypes.DOWNLOAD_SUCCESS),
    map((action: DownloadSuccess) => action.payload),
    mergeMap(result => {
      return of(saveAs(result.file, result.fileName));
    })
  );

  /**
   * Side effect triggered when a DeleteStart action is dispatched.
   * Uses the uploadFilesService to delete a file located on the server.
   * Dispatches a new DeleteSuccess action, if the file was
   *  successfully deleted, else dispatches a new DeleteFailure action.
   *
   * Uses the mergeMap flattening strategy for updating the outer observable,
   *  which means that the old observable is merged with the new one.
   *
   * @type {(Observable<DeleteSuccess | DeleteFailure>)}
   * @memberof UploadEffects
   */
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

  /**
   * Side effect triggered when a DeleteSuccess action is dispatched.
   * Dispatches a new GetFilesInfo action, to refresh the list of files
   *  in the table after a successful deletion.
   *
   * Uses the switchMap flattening strategy for updating the outer observable,
   *  which means that the old observable is replaced with the new one.
   *
   * @type {Observable<GetFilesInfo>}
   * @memberof UploadEffects
   */
  @Effect()
  deleteSuccess$: Observable<GetFilesInfo> = this.actions$.pipe(
    ofType<DeleteSuccess>(UploadActionTypes.DELETE_SUCCESS),
    switchMap(() => {
      return of(new GetFilesInfo());
    })
  );
}
