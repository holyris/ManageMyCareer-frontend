import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FileListComponent } from './file-list/file-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/shared/helpers/auth.guard'


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent

  },
  {
    path: "register",
    component: RegisterComponent

  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "files",
    component: FileListComponent,
    canActivate: [AuthGuard]

  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
