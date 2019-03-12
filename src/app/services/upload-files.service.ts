import { FileInfo } from '../models/file-info.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UploadFilesService {
  /**
   * Base address of the API server
   *
   * @private
   * @memberof UploadFilesService
   */
  private fileAPIAddress = 'http://127.0.0.1:8081/';

  /**
   * Creates an instance of UploadFilesService.
   * @param {HttpClient} http - HttpClient used for sending requests to the API.
   * @memberof UploadFilesService
   */
  constructor(private http: HttpClient) {}

  // Gets the list of all files uploaded to the server
  /**
   * Gets the list of all files located on the server.
   *
   * @returns {Observable<FileInfo[]>}
   * @memberof UploadFilesService
   */
  public getListFiles(): Observable<FileInfo[]> {
    return this.http.get<FileInfo[]>(this.fileAPIAddress + 'list-files');
  }

  /**
   * Attempts to upload a file to the server.
   *
   * @param {File} file - File to be uploaded.
   * @returns
   * @memberof UploadFilesService
   */
  public uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file-to-upload', file, file.name);

    // Create a file upload request
    const req = new HttpRequest(
      'POST',
      this.fileAPIAddress + 'file-upload',
      formData,
      {
        reportProgress: false
      }
    );

    // Send the upload request and subscribe to upload progress
    return this.http.request(req);
  }

  /**
   * Attempts to download a file fom the server.
   *
   * @param {string} fileName - Name of the file to be downloaded.
   * @returns {Observable<Blob>} - File sent back from the server.
   * @memberof UploadFilesService
   */
  public downloadFile(fileName: string): Observable<Blob> {
    const url = this.fileAPIAddress + 'download';
    const body = {
      fileName
    };

    return this.http.post(url, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  /**
   * Attempts to delete a file from the server.
   *
   * @param {string} fileName - Name of the file to be deleted
   * @returns {Observable<any>}
   * @memberof UploadFilesService
   */
  public deleteFile(fileName: string): Observable<any> {
    const url = this.fileAPIAddress + 'delete/' + fileName;
    return this.http.delete(url);
  }
}
