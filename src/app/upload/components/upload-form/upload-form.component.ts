import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  public uploadForm: FormGroup = new FormGroup({
    fileToUpload: new FormControl('', Validators.required)
  });

  public fileToUpload: File;

  @Output()
  uploadEmitter: EventEmitter<File> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      this.fileToUpload = event.target.files[0];
    }
  }

  uploadFIle(): void {
    this.uploadEmitter.emit(this.fileToUpload);
  }
}
