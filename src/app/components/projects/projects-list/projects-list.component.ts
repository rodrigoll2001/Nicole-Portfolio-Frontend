import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../../../services/projects.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ProjectsListComponent implements OnInit {

  projects: Project[] = [];

  searchTitle: string = '';

  constructor(private projectsService: ProjectsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(searchTitle?: string): void {
    this.projectsService.getProjects(searchTitle).subscribe(data => {
      this.projects = data;
      
    });
  }

  deleteProject(id: number): void {
    this.projectsService.deleteProject(id).subscribe({
      next: () => this.loadProjects(),
      error: (err) => console.error('Erro ao deletar projeto', err)
    });
  }
}
