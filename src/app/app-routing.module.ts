import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertingCurrentsComponent } from './converting-currents/converting-currents.component';

const routes: Routes = [
  { path: '', component: ConvertingCurrentsComponent }
  // Другие маршруты...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
