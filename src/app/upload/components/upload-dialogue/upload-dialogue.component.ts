import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

/**
 * Upload dialog that pops up when the "Upload File" button is clicked
 * in the upload-main component.
 *
 * @export
 * @class UploadDialogueComponent
 */
@Component({
  selector: 'app-upload-dialogue',
  templateUrl: './upload-dialogue.component.html',
  styleUrls: ['./upload-dialogue.component.scss']
})
export class UploadDialogueComponent {
  /**
   * Creates an instance of UploadDialogueComponent.
   *
   * @param {MatDialogRef<UploadDialogueComponent>} dialogRef - Reference to the dialog
   *  opened via the MatDialog service from the upload-main component.
   * @memberof UploadDialogueComponent
   */
  constructor(public dialogRef: MatDialogRef<UploadDialogueComponent>) {}

  /**
   * Closes the dialog and passes the file selected for upload
   * back to the parent component.
   *
   * @param {File} file - File that was picked for upload,
   *  can be undefined if no file was picked.
   * @memberof UploadDialogueComponent
   */
  uploadFileAndClose(file: File): void {
    this.dialogRef.close(file);
  }
}
