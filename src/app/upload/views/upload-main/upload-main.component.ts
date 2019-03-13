import { getDownloading, getDeleting } from './../../store/upload.selectors';
import { DownloadStart, DeleteStart } from './../../store/upload.actions';
import { FileSizePipe } from './../../../widgets/pipes/file-size.pipe';
import { UploadDialogueComponent } from './../../components/upload-dialogue/upload-dialogue.component';
import { Component, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/file-info.model';
import { MatDialog } from '@angular/material';
import { UploadState } from '../../store/upload.reducers';
import { Store } from '@ngrx/store';
import { UploadStart, GetFilesInfo } from '../../store/upload.actions';
import { getFilesInfo, getUploading } from '../../store/upload.selectors';

/**
 * The main component for downloading, uploading, deleting and viewing files.
 *
 * @export
 * @class UploadMainComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['./upload-main.component.scss'],
  providers: [FileSizePipe]
})
export class UploadMainComponent implements OnInit {
  /**
   * Stores the information which is displayed in the file-table component.
   *
   * @type {FileInfo[]}
   * @memberof UploadMainComponent
   */
  public filesInfo: FileInfo[];

  /**
   * Stores the files that are currently uploading.
   *
   * @type {string[]}
   * @memberof UploadMainComponent
   */
  public uploading: string[];

  /**
   * Stores the files that are currently downloading.
   *
   * @type {string[]}
   * @memberof UploadMainComponent
   */
  public downloading: string[];

  /**
   * Stores the files that are currently being deleted.
   *
   * @type {string[]}
   * @memberof UploadMainComponent
   */
  public deleting: string[];

  /**
   * Creates an instance of UploadMainComponent.
   * @param {FileSizePipe} fileSizePipe - Pipe for converting file size in bytes to more readable format.
   * @param {MatDialog} dialog - Opens up a dialog for file upload.
   * @param {Store<UploadState>} store - Store for keeping track of upload state.
   * @memberof UploadMainComponent
   */
  constructor(
    private fileSizePipe: FileSizePipe,
    public dialog: MatDialog,
    private store: Store<UploadState>
  ) {}

  /**
   * On init dispatches a new GetFilesInfo action.
   *
   * Subscribes to the getFilesInfo selector and updates the filesInfo array.
   * Subscribes to the getUploading selector and updates the uploading array.
   * Subscribes to the getDownloading selector and updates the downloading array
   * Subscribes to the getDeleting selector and updates the deleting array.
   *
   * @memberof UploadMainComponent
   */
  ngOnInit() {
    this.store.dispatch(new GetFilesInfo());

    this.store.select(getFilesInfo).subscribe(result => {
      if (result !== undefined) {
        this.filesInfo = result.map((fileInfo: FileInfo) => {
          fileInfo.displaySize = this.fileSizePipe.transform(fileInfo.size);
          return fileInfo;
        });
      }
    });

    this.store.select(getUploading).subscribe(result => {
      if (result !== undefined) {
        this.uploading = [...result];
      }
    });

    this.store.select(getDownloading).subscribe(result => {
      if (result !== undefined) {
        this.downloading = [...result];
      }
    });

    this.store.select(getDeleting).subscribe(result => {
      if (result !== undefined) {
        this.deleting = [...result];
      }
    });
  }

  /**
   * Dispatches a new UploadStart action from the store.
   *
   * Triggered when the Upload dialog is closed.
   *
   * @param {File} file - File to be uploaded.
   * @memberof UploadMainComponent
   */
  uploadFile(file: File): void {
    this.store.dispatch(new UploadStart(file));
  }

  /**

   * @param fileName
   */
  /**
   * Dispatches a new DownloadStart action from the store.
   *
   * Triggered when Download button is pressed in the file-table component.
   *
   * @param {string} fileName - Name of the file to be downloaded.
   * @memberof UploadMainComponent
   */
  downloadFile(fileName: string): void {
    this.store.dispatch(new DownloadStart(fileName));
  }

  /**
   * Dispatches a new DeleteStart action from the store.
   *
   * Triggered when the Delete button in the file-table component is clicked.
   *
   * @param {string} fileName - Name of the file to be deleted.
   * @memberof UploadMainComponent
   */
  deleteFile(fileName: string): void {
    this.store.dispatch(new DeleteStart(fileName));
  }

  /**
   * Opens the file upload dialog
   * @memberof UploadMainComponent
   */
  openUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogueComponent, {
      width: '400px'
    });

    /** Call the uploadFile function after file dialog closes and if a file was picked.
     * @param result - The file that was picked for upload.
     */
    dialogRef.afterClosed().subscribe((result: File) => {
      if (result !== undefined) {
        this.uploadFile(result);
      }
    });
  }

  // Old method for getting files from server, using the service directly from component.
  // This was replaced using the NgRx store.
  /*getListFiles(): void {
    this.uploadFilesService.getListFiles().subscribe((response: FileInfo[]) => {
      console.log(response);
      this.filesInfo = response.map((fileInfo: FileInfo) => {
        fileInfo.displaySize = this.fileSizePipe.transform(fileInfo.size);
        return fileInfo;
      });
    });
  }*/

  // Old method for downloading files, now replaced with NgRx
  /*downloadFile(fileName: string): void {
    this.uploadFilesService.downloadFile(fileName).subscribe(result => {
      saveAs(result, fileName);
    });
  }*/

  // Old method for deleting files, now replaced with NgRx
  /*deleteFile(fileName: string): void {
    this.uploadFilesService.deleteFile(fileName).subscribe(result => {
      this.store.dispatch(new GetFilesInfo());
    });
  }*/
}
