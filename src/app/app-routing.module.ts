import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {
    path:'play',
    component:PlayComponent
  },
  {
    path:'**',
    component:MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
