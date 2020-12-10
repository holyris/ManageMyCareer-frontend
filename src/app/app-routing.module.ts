import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FileListComponent } from './file-list/file-list.component';
import { AuthGuard } from 'src/shared/helpers/auth.guard'
import { CareerComponent } from './career/career.component';
import { ReceptionComponent } from './reception/reception.component';
import { MainAppComponent } from './main-app/main-app.component';


const routes: Routes = [
  {
    path: "welcome",
    component: ReceptionComponent
  },
  {
    path: "",
    component: MainAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        matcher: foldersAndFilesRouteMatcherFunction,
        component: FileListComponent
      },
      {
        path: "career",
        component: CareerComponent,
      },
      {
        path: '',
        redirectTo: 'files',
        pathMatch: 'full'
      }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'files' }

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
