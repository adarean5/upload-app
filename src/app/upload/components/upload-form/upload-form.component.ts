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
    // const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.fileToUpload = event.target.files[0];
      /*const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.uploadForm.patchValue({
          fileToUpload: reader.result
        });
      };*/
    }
  }

  uploadFIle(): void {
    // console.log(this.fileToUpload);
    this.uploadEmitter.emit(this.fileToUpload);
  }
}
