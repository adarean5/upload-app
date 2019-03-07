import { FileInfo } from '../models/file-info.model';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UploadFilesService {
  private fileAPIAddress = 'http://127.0.0.1:8081/';

  constructor(private http: HttpClient) {}

  // Gets the list of all files uploaded to the server
  public getListFiles(): Observable<FileInfo[]> {
    return this.http.get<FileInfo[]>(this.fileAPIAddress + 'list-files');
  }

  public uploadFile(file: File): Observable<number> {
    const progress = new Subject<number>();

    const formData: FormData = new FormData();
    formData.append('file-to-upload', file, file.name);

    // Create a file upload request
    const req = new HttpRequest(
      'POST',
      this.fileAPIAddress + 'file-upload',
      formData,
      {
        reportProgress: true
      }
    );

    // Send the upload request and subscribe to upload progress
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // Calucaltes the upload percentage
        const percentDone = Math.round((100 * event.loaded) / event.loaded);
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        progress.complete();
      }
    });

    return progress;
  }

  public downloadFile(fileName: string): Observable<Blob> {
    console.log('s');

    const url = this.fileAPIAddress + 'download';
    const body = {
      fileName
    };

    return this.http.post(url, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  public deleteFile(fileName: string): Observable<any> {
    const url = this.fileAPIAddress + 'delete/' + fileName;
    return this.http.delete(url);
  }
}
