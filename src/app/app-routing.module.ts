import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FileListComponent } from './file-list/file-list.component';


const routes: Routes = [{
  path: "",
  component: HomeComponent,
},
{
  path: "register",
  component: RegisterComponent
},
{
  path: "files",
  component: FileListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
