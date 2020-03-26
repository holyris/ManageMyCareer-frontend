import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListeComponent } from './liste/liste.component';


const routes: Routes = [{
  path: "",
  component: HomeComponent,
},
{
  path: "register",
  component: RegisterComponent
},
{
  path: "liste",
  component: ListeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
