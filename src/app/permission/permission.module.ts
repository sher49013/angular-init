import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { permissionRoutingModule } from './permission-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    permissionRoutingModule
  ],
  exports:[
    NotFoundComponent
  ]
})
export class PermissionModule { }
