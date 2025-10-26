import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectsService, Project } from '../../../services/projects.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category, CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-project-upsert',
  templateUrl: './projects-upsert.component.html',
  styleUrls: ['./projects-upsert.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class ProjectUpsertComponent implements OnInit {

  projectForm: FormGroup;
  projectId: number | null = null;
  categories: Category[] = []; 
  selectedCategoryId: number | null = null;

  //medias: any[] = [];
  get medias(): FormArray {
    return this.projectForm.get('medias') as FormArray;
  }


  newMedia = {
  description: '',
  url: '',
  type: 'IMAGEM',
  active: 'Y',
  projectFk: this.projectId || null
};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private categoryService: CategoryService
  ) {
    this.projectForm = this.fb.group({
      title: [''],
      description: [''],
      categoryFk: [''],
      medias: this.fb.array([]),
      active: ['Y']
    });
  }

  ngOnInit(): void {
  this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  if (this.projectId) {
    this.projectsService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          categoryFk: project.categoryFk,
          active: project.active
        });

        this.medias.clear();
        if (project.medias && project.medias.length) {
          project.medias.forEach((m: any) => this.addMedia(m));
        }
      },
      error: (err) => console.error('Erro ao carregar projeto', err)
    });
  }
  this.getCategories();
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

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
      
    });
  }

  addMedia(media?: any): void {
    const mediaGroup = this.fb.group({
      description: [media?.description || ''],
      url: [media?.url || ''],
      type: [media?.type || 'IMAGEM'], // default
      active: ['Y']
    });

    this.medias.push(mediaGroup);
  }

}
