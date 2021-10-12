import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from './_helpers/accessGuard';
import { NotFoundComponent } from './permission/not-found/not-found.component'
import { AdminDashbaordComponent } from './dashboard/admin-dashbaord/admin-dashbaord.component'



// Added routes with lazy-loading.
const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'admin/dashboard', component: AdminDashbaordComponent, canActivate: [AccessGuard]
  },
  {
     path: '**', pathMatch: 'full', component:  NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
