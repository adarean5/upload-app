import { saveAs } from 'file-saver';
import { FileSizePipe } from './../../../widgets/pipes/file-size.pipe';
import { UploadDialogueComponent } from './../../components/upload-dialogue/upload-dialogue.component';
import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { FileInfo } from 'src/app/models/file-info.model';
import { MatDialog } from '@angular/material';
import { UploadState } from '../../store/upload.reducers';
import { Store } from '@ngrx/store';
import { UploadStart, GetFilesInfo } from '../../store/upload.actions';
import { getFilesInfo } from '../../store/upload.selectors';

@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['./upload-main.component.scss'],
  providers: [FileSizePipe]
})
export class UploadMainComponent implements OnInit {
  public filesInfo: FileInfo[];

  constructor(
    private uploadFilesService: UploadFilesService,
    private fileSizePipe: FileSizePipe,
    public dialog: MatDialog,
    private store: Store<UploadState>
  ) {}

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
  }

  uploadFile(file: File): void {
    this.store.dispatch(new UploadStart(file));
  }

  downloadFile(fileName: string): void {
    this.uploadFilesService.downloadFile(fileName).subscribe(result => {
      saveAs(result, fileName);
    });
  }

  deleteFile(fileName: string): void {
    this.uploadFilesService.deleteFile(fileName).subscribe(result => {
      this.store.dispatch(new GetFilesInfo());
    });
  }

  // Opens the file upload dialogue
  openUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogueComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: File) => {
      this.uploadFile(result);
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
}
