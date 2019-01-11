import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
