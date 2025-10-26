import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media } from './media.service';
import { Category } from './category.service';

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  categoryFk: number;
  categoryName: string;
  active: string;
  medias: Media[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = 'https://nicole-portfolio-backend.onrender.com/projects';

  constructor(private http: HttpClient) { }

  getProjects(title?: string): Observable<Project[]> {
    if (title) {
      return this.http.get<Project[]>(`${this.apiUrl}?title=${title}`);
    }
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
