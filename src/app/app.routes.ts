import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ProjectDetailComponent } from './components/projects/projects-detail/projects-detail.component';
import { ProjectUpsertComponent } from './components/projects/projects-upsert/projects-upsert.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsListComponent },
  {path: 'projectDetail/:id', component: ProjectDetailComponent},
  {path: 'projectUpsert/:id', component: ProjectUpsertComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects' }
];
