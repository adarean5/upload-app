import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * FIle upload form nested inside the upload-dialogue component.
 * Contains one file input for selecting a file to be uploaded to the server.
 *
 * @export
 * @class UploadFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  /**
   * Form group for the file upload form.
   *
   * @type {FormGroup}
   * @memberof UploadFormComponent
   */
  public uploadForm: FormGroup = new FormGroup({
    fileToUpload: new FormControl('', Validators.required)
  });

  /**
   * File to be uploaded to the server.
   *
   * @type {File}
   * @memberof UploadFormComponent
   */
  public fileToUpload: File;

  /**
   * Emits the file to be uploaded to the parent component
   *
   * @type {EventEmitter<File>}
   * @memberof UploadFormComponent
   */
  @Output()
  uploadEmitter: EventEmitter<File> = new EventEmitter();

  /**
   * Creates an instance of UploadFormComponent.
   * @memberof UploadFormComponent
   */
  constructor() {}

  ngOnInit() {}

  /**
   * Gets called when the file input in the HTML changes.
   * Used to get the file from the HTML file input.
   *
   * @param {*} event - Event that contains the file that was picked.
   * @memberof UploadFormComponent
   */
  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      this.fileToUpload = event.target.files[0];
    }
  }

  /**
   * Passes the file to be uploaded to the parent component.
   * Triggered when the "Upload" button within this form is clicked.
   *
   * @memberof UploadFormComponent
   */
  uploadFIle(): void {
    this.uploadEmitter.emit(this.fileToUpload);
  }
}
