import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainBlockComponent } from './main-block/main-block.component';

const routes: Routes = [
  {
    path: '',
    component: MainBlockComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
