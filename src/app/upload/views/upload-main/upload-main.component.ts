import { saveAs } from 'file-saver';
import { FileSizePipe } from './../../../widgets/pipes/file-size.pipe';
import { UploadDialogueComponent } from './../../components/upload-dialogue/upload-dialogue.component';
import { Component, OnInit, Renderer, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { FileInfo } from 'src/app/models/file-info.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['./upload-main.component.scss'],
  providers: [FileSizePipe]
})
export class UploadMainComponent implements OnInit {
  public filesInfo: FileInfo[];

  constructor(
    private uploadFIlesService: UploadFilesService,
    private fileSizePipe: FileSizePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getListFiles();
  }

  getListFiles(): void {
    this.uploadFIlesService.getListFiles().subscribe((response: FileInfo[]) => {
      this.filesInfo = response.map((fileInfo: FileInfo) => {
        fileInfo.displaySize = this.fileSizePipe.transform(fileInfo.size);
        console.log('File info: ', fileInfo);
        return fileInfo;
      });
    });
  }

  uploadFile(file: File): void {
    const progress = this.uploadFIlesService.uploadFile(file).subscribe(end => {
      console.log(end);
      this.getListFiles();
    });
  }

  downloadFile(fileName: string): void {
    this.uploadFIlesService.downloadFile(fileName).subscribe(result => {
      console.log('Download result: ', result);
      saveAs(result, fileName);
    });
  }

  deleteFile(fileName: string): void {
    console.log('delete from main', fileName);
    this.uploadFIlesService.deleteFile(fileName).subscribe(result => {
      this.getListFiles();
    });
  }

  // Openes the file upload dialogue
  openUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogueComponent, {
      width: '400px',
      data: { something: 'sadad' }
    });

    dialogRef.afterClosed().subscribe((result: File) => {
      console.log('The dialog was closed');
      console.log('Result: ', result);
      this.uploadFile(result);
    });
  }
}