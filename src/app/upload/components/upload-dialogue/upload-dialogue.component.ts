import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './dialog-data';

@Component({
  selector: 'app-upload-dialogue',
  templateUrl: './upload-dialogue.component.html',
  styleUrls: ['./upload-dialogue.component.scss']
})
export class UploadDialogueComponent implements OnInit {
  @Output()
  uploadEmitter: EventEmitter<File> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<UploadDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  uploadFileAndClose(file: File): void {
    console.log('file from dia: ', file);
    // this.data.file = file;
    this.dialogRef.close(file);
  }
}
