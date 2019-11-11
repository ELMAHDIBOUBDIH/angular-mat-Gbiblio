import {Injectable} from '@angular/core';
import {FilePickerAdapter, FilePreviewModel} from 'ngx-awesome-uploader';
import {HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageFileUploadService extends FilePickerAdapter {
  constructor(private http: HttpClient) {
    super();
  }

  public uploadFile(fileItem: FilePreviewModel): Observable<any> {
    const form = new FormData();
    form.append('file', fileItem.file);
    const api = 'https://demo-file-uploader.free.beeceptor.com';
    const req = new HttpRequest('POST', api, form, {reportProgress: true});
    return this.http.request(req)
      .pipe(map((res: HttpEvent<any>) => {
          if (res.type === HttpEventType.Response) {
            return res.body.id.toString();
          } else if (res.type === HttpEventType.UploadProgress) {
            // Compute and show the % done:
            const UploadProgress = +Math.round((100 * res.loaded) / res.total);
            return UploadProgress;
          }
        })
      );
  }

  public removeFile(fileItem): Observable<any> {
    const removeApi = 'https://file-remove-demo.free.beeceptor.com';
    return this.http.post(removeApi, {});
  }
}
