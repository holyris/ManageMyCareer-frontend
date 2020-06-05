import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FileListComponent } from './file-list/file-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/shared/helpers/auth.guard'
import { OverviewComponent } from './overview/overview.component';


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
    matcher: foldersAndFilesRouteMatcherFunction,
    component: FileListComponent
  },
  {
    path: "overview",
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

function foldersAndFilesRouteMatcherFunction(url: UrlSegment[]) {
  if (url.length === 1) {
    const path = url[0].path;

    if (path.startsWith('folders') || path.startsWith('files')) {
      return { consumed: url };
    }
  }

  else if (url.length === 2) {
    const path = url[0].path;
    const paramSegment = url[1];

    if (path.startsWith('folders') || path.startsWith('files')) {
      return { consumed: url, posParams: { folderId: paramSegment } };
    }
  }
  
  return null;
}
