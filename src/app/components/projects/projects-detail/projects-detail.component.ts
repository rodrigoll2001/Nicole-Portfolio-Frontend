import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectsService, Project } from '../../../services/projects.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';

declare var bootstrap: any

@Component({
  selector: 'app-project-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, SafeUrlPipe],
})
export class ProjectDetailComponent implements OnInit {

  projectForm: FormGroup;
  projectId: number | null = null;
  project: Project | undefined;

  selectedImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {
    this.projectForm = this.fb.group({
      title: [''],
      description: [''],
      categoryFk: [''],
      categoryName: [''],
      medias: [],
      active: ['Y']
    });
  }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectId) {
      this.projectsService.getProjectById(this.projectId).subscribe({
        next: (project) => this.project = project,
        error: (err) => console.error('Erro ao carregar projeto', err)
      });
    }
  }

  save(): void {
    const project: Project = this.projectForm.value;
    if (this.projectId) {
      this.projectsService.updateProject(this.projectId, project).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (err) => console.error('Erro ao atualizar projeto', err)
      });
    } else {
      this.projectsService.createProject(project).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (err) => console.error('Erro ao criar projeto', err)
      });
    }
  }

   openImage(url: string) {
    this.selectedImage = url;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }
}
