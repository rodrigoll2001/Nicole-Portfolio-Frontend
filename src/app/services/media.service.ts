import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Media {
  id: number;
  projectFk: number;
  type: string;
  url: string;
  description: string;
  active: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private apiUrl = 'https://nicole-portfolio-backend.onrender.com/media';

  constructor(private http: HttpClient) { }

  getMedia(projectFk: number): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}?projectFk=${projectFk}`);
  }

  createMedia(media: Media): Observable<Media> {
    return this.http.post<Media>(this.apiUrl, media);
  }

  updateMedia(id: number, media: Media): Observable<Media> {
    return this.http.put<Media>(`${this.apiUrl}/${id}`, media);
  }

  deleteMedia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
